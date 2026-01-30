import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAuthenticatedUser, listUserRepos, createRepository } from "./github";
import { analyzeExerciseResponse, analyzeChallengeResponse, chatWithAssistant } from "./openai";
import { exerciseResponseSchema, journalEntrySchema, insertSupportTicketSchema } from "@shared/schema";
import { execSync } from "child_process";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { db, getConnectionStats } from "./db";
import { subscriptions, userActivities, supportTickets, userProgress2, userFeedback, notifications, insertUserFeedbackSchema, users } from "@shared/schema";
import { eq, desc, sql, count, gte, and } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);

  // Health check endpoint with database connection stats
  app.get("/api/health", async (_req, res) => {
    try {
      const stats = getConnectionStats();
      res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: {
          ...stats,
          status: stats.failedConnections > 0 && stats.lastErrorTime 
            ? "degraded" 
            : "connected"
        }
      });
    } catch (error: any) {
      res.status(503).json({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  });

  app.get("/api/subscription", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
      if (!subscription) {
        const [newSub] = await db.insert(subscriptions).values({ userId, plan: "free" }).returning();
        return res.json(newSub);
      }
      res.json(subscription);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/user-progress-db", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      let [progress] = await db.select().from(userProgress2).where(eq(userProgress2.userId, userId));
      if (!progress) {
        [progress] = await db.insert(userProgress2).values({ 
          userId, 
          streakDays: 0,
          longestStreak: 0,
          totalXp: 0,
          level: 1,
          levelProgress: 0,
          lessonsCompleted: [],
          unitsCompleted: [],
          challengesCompleted: 0,
          lastActivityDate: null,
        }).returning();
      }
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const userSettingsSchema = z.object({
    emailNotifications: z.boolean().optional(),
    streakReminders: z.boolean().optional(),
  });

  const onboardingSchema = z.object({
    experienceLevel: z.enum(["beginner", "intermediate", "expert"]),
  });

  app.post("/api/onboarding/complete", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { experienceLevel } = onboardingSchema.parse(req.body);
      
      let [existing] = await db.select().from(userProgress2).where(eq(userProgress2.userId, userId));
      
      if (!existing) {
        [existing] = await db.insert(userProgress2).values({
          userId,
          streakDays: 0,
          longestStreak: 0,
          totalXp: 0,
          level: 1,
          levelProgress: 0,
          lessonsCompleted: [],
          unitsCompleted: [],
          challengesCompleted: 0,
          experienceLevel,
          onboardingCompleted: true,
        }).returning();
      } else {
        [existing] = await db.update(userProgress2)
          .set({ 
            experienceLevel, 
            onboardingCompleted: true,
            updatedAt: new Date() 
          })
          .where(eq(userProgress2.userId, userId))
          .returning();
      }
      
      res.json(existing);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid onboarding data" });
      }
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/user-settings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const parsed = userSettingsSchema.parse(req.body);
      const [updated] = await db.update(userProgress2)
        .set({ ...parsed, updatedAt: new Date() })
        .where(eq(userProgress2.userId, userId))
        .returning();
      res.json(updated);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid settings data" });
      }
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/activity", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { activityType, entityType, entityId, metadata } = req.body;
      const [activity] = await db.insert(userActivities).values({
        userId, activityType, entityType, entityId, metadata
      }).returning();
      res.json(activity);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/activities", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const activities = await db.select().from(userActivities)
        .where(eq(userActivities.userId, userId))
        .orderBy(desc(userActivities.createdAt));
      res.json(activities);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tickets", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tickets = await db.select().from(supportTickets)
        .where(eq(supportTickets.userId, userId))
        .orderBy(desc(supportTickets.createdAt));
      res.json(tickets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tickets", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertSupportTicketSchema.parse({ ...req.body, userId });
      const [ticket] = await db.insert(supportTickets).values(data).returning();
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/feedback", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const feedbackList = await db.select().from(userFeedback)
        .where(eq(userFeedback.userId, userId))
        .orderBy(desc(userFeedback.createdAt));
      res.json(feedbackList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/feedback", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertUserFeedbackSchema.parse({ ...req.body, userId });
      const [feedback] = await db.insert(userFeedback).values(data).returning();
      res.json(feedback);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/notifications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notificationList = await db.select().from(notifications)
        .where(eq(notifications.userId, userId))
        .orderBy(desc(notifications.createdAt));
      res.json(notificationList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/notifications/:id/read", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      const [notification] = await db.select().from(notifications)
        .where(eq(notifications.id, id));
      if (!notification || notification.userId !== userId) {
        return res.status(404).json({ error: "Notification not found" });
      }
      const [updated] = await db.update(notifications)
        .set({ readAt: new Date() })
        .where(eq(notifications.id, id))
        .returning();
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/notifications/mark-all-read", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await db.update(notifications)
        .set({ readAt: new Date() })
        .where(eq(notifications.userId, userId));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(",").filter(Boolean) || [];
  const isAdmin = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (ADMIN_USER_IDS.length === 0) {
      console.error("ADMIN_USER_IDS not configured");
      return res.status(503).json({ error: "Admin access not configured" });
    }
    const userId = req.user?.claims?.sub;
    if (!userId || !ADMIN_USER_IDS.includes(userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };

  const adminFeedbackUpdateSchema = z.object({
    status: z.enum(["new", "reviewing", "actioned", "archived"]).optional(),
    adminResponse: z.string().min(1).optional(),
  });

  app.get("/api/admin/feedback", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const feedbackList = await db.select().from(userFeedback)
        .orderBy(desc(userFeedback.createdAt));
      res.json(feedbackList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/admin/feedback/:id", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const parsed = adminFeedbackUpdateSchema.parse(req.body);
      
      if (!parsed.status && !parsed.adminResponse) {
        return res.status(400).json({ error: "No update data provided" });
      }
      
      const updateData: any = { updatedAt: new Date() };
      if (parsed.status) updateData.status = parsed.status;
      if (parsed.adminResponse) {
        updateData.adminResponse = parsed.adminResponse;
        updateData.respondedAt = new Date();
      }
      
      const [updated] = await db.update(userFeedback)
        .set(updateData)
        .where(eq(userFeedback.id, id))
        .returning();
      
      if (!updated) {
        return res.status(404).json({ error: "Feedback not found" });
      }

      if (parsed.adminResponse) {
        await db.insert(notifications).values({
          userId: updated.userId,
          type: "feedback_response",
          title: "Response to your feedback",
          message: `We've responded to your feedback: "${updated.title}"`,
          linkUrl: "/feedback",
        });
      }
      
      res.json(updated);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid update data" });
      }
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get("/api/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress();
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/curriculum", async (req, res) => {
    try {
      const curriculum = await storage.getCurriculum();
      res.json(curriculum);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await storage.getLesson(req.params.id);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/lessons/:id/complete", async (req, res) => {
    try {
      const lesson = await storage.getLesson(req.params.id);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      const progress = await storage.completeLesson(req.params.id, lesson.xpReward);
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/daily-challenge", async (req, res) => {
    try {
      const challenge = await storage.getTodaysChallenge();
      res.json(challenge);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/daily-challenge/submit", async (req, res) => {
    try {
      const challenge = await storage.getTodaysChallenge();
      const { response } = req.body;
      
      if (!response || typeof response !== "string") {
        return res.status(400).json({ error: "Response is required" });
      }

      const feedback = await analyzeChallengeResponse(
        challenge.scenario,
        challenge.question,
        response
      );

      const progress = await storage.completeChallenge(challenge.xpReward);

      res.json({ feedback, progress });
    } catch (error: any) {
      console.error("Challenge analysis error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/case-studies", async (req, res) => {
    try {
      const { industry, outcome } = req.query;
      let studies = await storage.getCaseStudies();
      
      if (industry && typeof industry === "string") {
        studies = studies.filter(s => s.industry === industry);
      }
      if (outcome && (outcome === "win" || outcome === "fail")) {
        studies = studies.filter(s => s.outcome === outcome);
      }
      
      res.json(studies);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/case-studies/:id", async (req, res) => {
    try {
      const study = await storage.getCaseStudy(req.params.id);
      if (!study) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.json(study);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/exercises", async (req, res) => {
    try {
      const { category } = req.query;
      let exercises = await storage.getExercises();
      
      if (category && typeof category === "string") {
        exercises = exercises.filter(e => e.category === category);
      }
      
      res.json(exercises);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/exercises/:id", async (req, res) => {
    try {
      const exercise = await storage.getExercise(req.params.id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/exercises/:id/analyze", async (req, res) => {
    try {
      const exercise = await storage.getExercise(req.params.id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      const { response } = req.body;
      if (!response || typeof response !== "string") {
        return res.status(400).json({ error: "Response is required" });
      }

      const context = `${exercise.context}\n\nScenario:\n${exercise.scenario.map((s, i) => `${i + 1}. ${s}`).join("\n")}`;
      
      const feedback = await analyzeExerciseResponse(
        context,
        exercise.question,
        response
      );

      res.json(feedback);
    } catch (error: any) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/chat", isAuthenticated, async (req: any, res) => {
    try {
      const { message, context } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await chatWithAssistant(message, context || []);
      res.json({ response });
    } catch (error: any) {
      console.error("AI chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/frameworks", async (req, res) => {
    try {
      const frameworks = await storage.getFrameworks();
      res.json(frameworks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/frameworks/:id", async (req, res) => {
    try {
      const framework = await storage.getFramework(req.params.id);
      if (!framework) {
        return res.status(404).json({ error: "Framework not found" });
      }
      res.json(framework);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/journal", async (req, res) => {
    try {
      const entries = await storage.getJournalEntries();
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/journal", async (req, res) => {
    try {
      const { title, content, source, tags } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }

      const entry = await storage.createJournalEntry({
        title,
        content,
        excerpt: content.slice(0, 150) + (content.length > 150 ? "..." : ""),
        date: new Date().toISOString(),
        source: source || "personal",
        tags: tags || [],
      });
      
      res.status(201).json(entry);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/journal/:id", async (req, res) => {
    try {
      const { title, content, tags } = req.body;
      
      const entry = await storage.updateJournalEntry(req.params.id, {
        title,
        content,
        tags,
      });
      
      if (!entry) {
        return res.status(404).json({ error: "Journal entry not found" });
      }
      
      res.json(entry);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/journal/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteJournalEntry(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Journal entry not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/github/user", async (req, res) => {
    try {
      const user = await getAuthenticatedUser();
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/github/repos", async (req, res) => {
    try {
      const repos = await listUserRepos();
      res.json(repos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/github/push", async (req, res) => {
    try {
      const { repoName, description, isPrivate, isNewRepo } = req.body;
      
      if (!repoName) {
        return res.status(400).json({ error: "Repository name is required" });
      }

      const user = await getAuthenticatedUser();
      let repoUrl: string;

      if (isNewRepo) {
        const repo = await createRepository(repoName, description || "PM Learning Hub - Product Learning Platform", isPrivate);
        repoUrl = repo.html_url;
      } else {
        repoUrl = `https://github.com/${user.login}/${repoName}`;
      }

      try {
        execSync('git config user.email "replit@example.com"', { stdio: 'pipe' });
        execSync('git config user.name "Replit Agent"', { stdio: 'pipe' });
      } catch (e) {}

      const fs = await import("fs");
      if (!fs.existsSync('.git')) {
        execSync('git init', { stdio: 'pipe' });
      }

      execSync('git add -A', { stdio: 'pipe' });
      
      try {
        execSync('git commit -m "Update: PM Learning Hub"', { stdio: 'pipe' });
      } catch (e) {}

      const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
      const xReplitToken = process.env.REPL_IDENTITY 
        ? 'repl ' + process.env.REPL_IDENTITY 
        : process.env.WEB_REPL_RENEWAL 
        ? 'depl ' + process.env.WEB_REPL_RENEWAL 
        : null;

      const connectionSettings = await fetch(
        'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
        {
          headers: {
            'Accept': 'application/json',
            'X_REPLIT_TOKEN': xReplitToken || ''
          }
        }
      ).then(r => r.json()).then(data => data.items?.[0]);

      const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

      if (!accessToken) {
        return res.status(500).json({ error: "Could not get GitHub access token" });
      }

      const authUrl = `https://${user.login}:${accessToken}@github.com/${user.login}/${repoName}.git`;
      
      try {
        execSync('git remote remove origin', { stdio: 'pipe' });
      } catch (e) {}
      
      execSync(`git remote add origin "${authUrl}"`, { stdio: 'pipe' });
      execSync('git branch -M main', { stdio: 'pipe' });
      execSync('git push -u origin main --force', { stdio: 'pipe' });

      res.json({ 
        success: true, 
        repoUrl,
        message: `Code pushed to ${repoUrl}`
      });
    } catch (error: any) {
      console.error("GitHub push error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics/overview", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const now = new Date();
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const [totalUsers] = await db.select({ count: count() }).from(users);
      const [activeUsersDay] = await db.select({ count: sql<number>`COUNT(DISTINCT user_id)` })
        .from(userActivities)
        .where(gte(userActivities.createdAt, dayAgo));
      const [activeUsersWeek] = await db.select({ count: sql<number>`COUNT(DISTINCT user_id)` })
        .from(userActivities)
        .where(gte(userActivities.createdAt, weekAgo));
      const [totalSessions] = await db.select({ count: count() })
        .from(userActivities)
        .where(eq(userActivities.activityType, "session_start"));
      const [pageViews] = await db.select({ count: count() })
        .from(userActivities)
        .where(eq(userActivities.activityType, "page_view"));

      res.json({
        totalUsers: totalUsers?.count || 0,
        activeUsersToday: activeUsersDay?.count || 0,
        activeUsersThisWeek: activeUsersWeek?.count || 0,
        totalSessions: totalSessions?.count || 0,
        totalPageViews: pageViews?.count || 0
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/page-views", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const pageViews = await db.select({
        page: userActivities.entityId,
        views: count()
      })
        .from(userActivities)
        .where(eq(userActivities.activityType, "page_view"))
        .groupBy(userActivities.entityId)
        .orderBy(desc(count()));

      res.json(pageViews);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/user-journeys", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      
      const journeys = await db.select({
        userId: userActivities.userId,
        activityType: userActivities.activityType,
        entityType: userActivities.entityType,
        entityId: userActivities.entityId,
        metadata: userActivities.metadata,
        createdAt: userActivities.createdAt
      })
        .from(userActivities)
        .orderBy(desc(userActivities.createdAt))
        .limit(limit);

      const groupedByUser = journeys.reduce((acc: Record<string, typeof journeys>, activity: typeof journeys[number]) => {
        if (!acc[activity.userId]) {
          acc[activity.userId] = [];
        }
        acc[activity.userId].push(activity);
        return acc;
      }, {});

      res.json({
        recentActivities: journeys,
        journeysByUser: groupedByUser
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/activity-breakdown", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const breakdown = await db.select({
        activityType: userActivities.activityType,
        count: count()
      })
        .from(userActivities)
        .groupBy(userActivities.activityType)
        .orderBy(desc(count()));

      res.json(breakdown);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/content-engagement", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const entityEngagement = await db.select({
        entityType: userActivities.entityType,
        entityId: userActivities.entityId,
        views: count()
      })
        .from(userActivities)
        .where(and(
          eq(userActivities.activityType, "view"),
          sql`${userActivities.entityType} IS NOT NULL`
        ))
        .groupBy(userActivities.entityType, userActivities.entityId)
        .orderBy(desc(count()))
        .limit(20);

      res.json(entityEngagement);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/funnel", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const [logins] = await db.select({ count: count() })
        .from(userActivities)
        .where(eq(userActivities.activityType, "login"));
      
      const [dashboardViews] = await db.select({ count: count() })
        .from(userActivities)
        .where(and(
          eq(userActivities.activityType, "page_view"),
          eq(userActivities.entityId, "/")
        ));

      const [gymViews] = await db.select({ count: count() })
        .from(userActivities)
        .where(and(
          eq(userActivities.activityType, "page_view"),
          eq(userActivities.entityId, "/gym")
        ));

      const [exerciseSubmissions] = await db.select({ count: count() })
        .from(userActivities)
        .where(eq(userActivities.activityType, "submit"));

      const [completions] = await db.select({ count: count() })
        .from(userActivities)
        .where(eq(userActivities.activityType, "complete"));

      res.json({
        funnel: [
          { step: "Login", count: logins?.count || 0 },
          { step: "View Dashboard", count: dashboardViews?.count || 0 },
          { step: "Visit Gym", count: gymViews?.count || 0 },
          { step: "Submit Exercise", count: exerciseSubmissions?.count || 0 },
          { step: "Complete Content", count: completions?.count || 0 }
        ]
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/time-on-page", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const timeData = await db.select({
        page: userActivities.entityId,
        avgTime: sql<number>`AVG((${userActivities.metadata}->>'seconds')::numeric)`,
        totalViews: count()
      })
        .from(userActivities)
        .where(eq(userActivities.activityType, "time_on_page"))
        .groupBy(userActivities.entityId)
        .orderBy(desc(sql`AVG((${userActivities.metadata}->>'seconds')::numeric)`));

      res.json(timeData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
