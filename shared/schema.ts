import { z } from "zod";

export const caseStudySchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  industry: z.string(),
  outcome: z.enum(["win", "fail"]),
  preview: z.string(),
  content: z.string(),
  lessons: z.array(z.string()),
  readTime: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type InsertCaseStudy = Omit<CaseStudy, "id">;

export const exerciseSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  context: z.string(),
  scenario: z.array(z.string()),
  question: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  hints: z.array(z.string()).optional(),
});

export type Exercise = z.infer<typeof exerciseSchema>;
export type InsertExercise = Omit<Exercise, "id">;

export const frameworkSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  whenToUse: z.array(z.string()),
  steps: z.array(z.string()),
  example: z.string(),
  commonMistakes: z.array(z.string()),
});

export type Framework = z.infer<typeof frameworkSchema>;
export type InsertFramework = Omit<Framework, "id">;

export const journalEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  date: z.string(),
  source: z.enum(["library", "gym", "toolkit", "personal", "lesson", "challenge"]),
  tags: z.array(z.string()),
  linkedItemId: z.string().optional(),
});

export type JournalEntry = z.infer<typeof journalEntrySchema>;
export type InsertJournalEntry = Omit<JournalEntry, "id">;

export const exerciseResponseSchema = z.object({
  exerciseId: z.string(),
  response: z.string(),
});

export type ExerciseResponse = z.infer<typeof exerciseResponseSchema>;

export const aiFeedbackSchema = z.object({
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  tip: z.string(),
});

export type AIFeedback = z.infer<typeof aiFeedbackSchema>;

// Learning Path Schema
export const lessonContentSchema = z.object({
  type: z.enum(["text", "tip", "example", "quiz", "reflection"]),
  content: z.string(),
  options: z.array(z.string()).optional(),
  correctIndex: z.number().optional(),
  explanation: z.string().optional(),
});

export type LessonContent = z.infer<typeof lessonContentSchema>;

export const lessonSchema = z.object({
  id: z.string(),
  unitId: z.string(),
  title: z.string(),
  description: z.string(),
  xpReward: z.number(),
  durationMinutes: z.number(),
  content: z.array(lessonContentSchema),
  order: z.number(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const unitSchema = z.object({
  id: z.string(),
  pillarId: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  order: z.number(),
  requiredXp: z.number(),
  lessons: z.array(lessonSchema),
});

export type Unit = z.infer<typeof unitSchema>;

export const pillarSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  order: z.number(),
  units: z.array(unitSchema),
});

export type Pillar = z.infer<typeof pillarSchema>;

export const dailyChallengeSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  scenario: z.string(),
  question: z.string(),
  stakeholder: z.string().optional(),
  xpReward: z.number(),
});

export type DailyChallenge = z.infer<typeof dailyChallengeSchema>;

export const userProgressSchema = z.object({
  streakDays: z.number(),
  longestStreak: z.number(),
  totalXp: z.number(),
  level: z.number(),
  levelProgress: z.number(),
  lessonsCompleted: z.array(z.string()),
  unitsCompleted: z.array(z.string()),
  challengesCompleted: z.number(),
  lastActivityDate: z.string(),
});

export type UserProgress = z.infer<typeof userProgressSchema>;

export const levelConfigSchema = z.object({
  level: z.number(),
  title: z.string(),
  xpRequired: z.number(),
});

export type LevelConfig = z.infer<typeof levelConfigSchema>;

export const levels: LevelConfig[] = [
  { level: 1, title: "PM Curious", xpRequired: 0 },
  { level: 2, title: "PM Apprentice", xpRequired: 100 },
  { level: 3, title: "PM Explorer", xpRequired: 300 },
  { level: 4, title: "PM Builder", xpRequired: 600 },
  { level: 5, title: "PM Strategist", xpRequired: 1000 },
  { level: 6, title: "PM Leader", xpRequired: 1500 },
  { level: 7, title: "PM Master", xpRequired: 2200 },
  { level: 8, title: "PM Visionary", xpRequired: 3000 },
  { level: 9, title: "PM Legend", xpRequired: 4000 },
  { level: 10, title: "PM Guru", xpRequired: 5000 },
];
