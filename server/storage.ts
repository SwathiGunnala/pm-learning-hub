import { randomUUID } from "crypto";
import type { 
  CaseStudy, 
  Exercise, 
  Framework, 
  JournalEntry, 
  InsertJournalEntry,
  UserProgress,
  Pillar,
  DailyChallenge,
  Lesson
} from "@shared/schema";
import { caseStudies as seedCaseStudies } from "./data/case-studies";
import { exercises as seedExercises } from "./data/exercises";
import { frameworks as seedFrameworks } from "./data/frameworks";
import { curriculum, dailyChallenges as seedChallenges } from "./data/curriculum";

export interface IStorage {
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(id: string): Promise<CaseStudy | undefined>;
  
  getExercises(): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  
  getFrameworks(): Promise<Framework[]>;
  getFramework(id: string): Promise<Framework | undefined>;
  
  getJournalEntries(): Promise<JournalEntry[]>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  updateJournalEntry(id: string, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined>;
  deleteJournalEntry(id: string): Promise<boolean>;
  
  getCurriculum(): Promise<Pillar[]>;
  getLesson(lessonId: string): Promise<Lesson | undefined>;
  
  getDailyChallenges(): Promise<DailyChallenge[]>;
  getTodaysChallenge(): Promise<DailyChallenge>;
  
  getUserProgress(): Promise<UserProgress>;
  completeLesson(lessonId: string, xpEarned: number): Promise<UserProgress>;
  completeChallenge(xpEarned: number): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private caseStudies: Map<string, CaseStudy>;
  private exercises: Map<string, Exercise>;
  private frameworks: Map<string, Framework>;
  private journalEntries: Map<string, JournalEntry>;
  private pillars: Pillar[];
  private challenges: DailyChallenge[];
  private userProgress: UserProgress;

  constructor() {
    this.caseStudies = new Map();
    this.exercises = new Map();
    this.frameworks = new Map();
    this.journalEntries = new Map();
    this.pillars = curriculum;
    this.challenges = seedChallenges;
    
    this.userProgress = {
      streakDays: 1,
      longestStreak: 1,
      totalXp: 0,
      level: 1,
      levelProgress: 0,
      lessonsCompleted: [],
      unitsCompleted: [],
      challengesCompleted: 0,
      lastActivityDate: new Date().toISOString().split('T')[0],
    };
    
    this.seedData();
  }

  private seedData() {
    seedCaseStudies.forEach(cs => this.caseStudies.set(cs.id, cs));
    seedExercises.forEach(ex => this.exercises.set(ex.id, ex));
    seedFrameworks.forEach(fw => this.frameworks.set(fw.id, fw));
    
    const sampleEntries: JournalEntry[] = [
      {
        id: randomUUID(),
        title: "Key insight from Slack case study",
        content: "The most interesting takeaway was how they pivoted from a gaming company. The team recognized that their internal tool had more value than the game itself.",
        excerpt: "The most interesting takeaway was how they pivoted from a gaming company...",
        date: new Date().toISOString(),
        source: "library",
        tags: ["pivots", "SaaS", "product-market-fit"],
      },
    ];
    
    sampleEntries.forEach(entry => this.journalEntries.set(entry.id, entry));
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values());
  }

  async getCaseStudy(id: string): Promise<CaseStudy | undefined> {
    return this.caseStudies.get(id);
  }

  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getFrameworks(): Promise<Framework[]> {
    return Array.from(this.frameworks.values());
  }

  async getFramework(id: string): Promise<Framework | undefined> {
    return this.frameworks.get(id);
  }

  async getJournalEntries(): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const id = randomUUID();
    const newEntry: JournalEntry = {
      ...entry,
      id,
      date: new Date().toISOString(),
      excerpt: entry.content.slice(0, 150) + (entry.content.length > 150 ? "..." : ""),
    };
    this.journalEntries.set(id, newEntry);
    return newEntry;
  }

  async updateJournalEntry(id: string, updates: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined> {
    const existing = this.journalEntries.get(id);
    if (!existing) return undefined;
    
    const updated: JournalEntry = {
      ...existing,
      ...updates,
      excerpt: updates.content 
        ? updates.content.slice(0, 150) + (updates.content.length > 150 ? "..." : "")
        : existing.excerpt,
    };
    this.journalEntries.set(id, updated);
    return updated;
  }

  async deleteJournalEntry(id: string): Promise<boolean> {
    return this.journalEntries.delete(id);
  }

  async getCurriculum(): Promise<Pillar[]> {
    return this.pillars;
  }

  async getLesson(lessonId: string): Promise<Lesson | undefined> {
    for (const pillar of this.pillars) {
      for (const unit of pillar.units) {
        const lesson = unit.lessons.find(l => l.id === lessonId);
        if (lesson) return lesson;
      }
    }
    return undefined;
  }

  async getDailyChallenges(): Promise<DailyChallenge[]> {
    return this.challenges;
  }

  async getTodaysChallenge(): Promise<DailyChallenge> {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % this.challenges.length;
    return this.challenges[index];
  }

  async getUserProgress(): Promise<UserProgress> {
    return this.userProgress;
  }

  private updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = this.userProgress.lastActivityDate;
    
    if (lastDate === today) return;
    
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (lastDate === yesterday) {
      this.userProgress.streakDays++;
      this.userProgress.longestStreak = Math.max(this.userProgress.longestStreak, this.userProgress.streakDays);
    } else if (lastDate !== today) {
      this.userProgress.streakDays = 1;
    }
    
    this.userProgress.lastActivityDate = today;
  }

  private calculateLevel(totalXp: number): { level: number; progress: number } {
    const levels = [
      { level: 1, xpRequired: 0 },
      { level: 2, xpRequired: 100 },
      { level: 3, xpRequired: 300 },
      { level: 4, xpRequired: 600 },
      { level: 5, xpRequired: 1000 },
      { level: 6, xpRequired: 1500 },
      { level: 7, xpRequired: 2200 },
      { level: 8, xpRequired: 3000 },
      { level: 9, xpRequired: 4000 },
      { level: 10, xpRequired: 5000 },
    ];
    
    let currentLevel = 1;
    let nextLevelXp = 100;
    let currentLevelXp = 0;
    
    for (let i = levels.length - 1; i >= 0; i--) {
      if (totalXp >= levels[i].xpRequired) {
        currentLevel = levels[i].level;
        currentLevelXp = levels[i].xpRequired;
        nextLevelXp = levels[i + 1]?.xpRequired || levels[i].xpRequired + 1000;
        break;
      }
    }
    
    const progress = Math.min(100, Math.round(((totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100));
    
    return { level: currentLevel, progress };
  }

  async completeLesson(lessonId: string, xpEarned: number): Promise<UserProgress> {
    if (!this.userProgress.lessonsCompleted.includes(lessonId)) {
      this.userProgress.lessonsCompleted.push(lessonId);
      this.userProgress.totalXp += xpEarned;
      
      const { level, progress } = this.calculateLevel(this.userProgress.totalXp);
      this.userProgress.level = level;
      this.userProgress.levelProgress = progress;
    }
    
    this.updateStreak();
    return this.userProgress;
  }

  async completeChallenge(xpEarned: number): Promise<UserProgress> {
    this.userProgress.challengesCompleted++;
    this.userProgress.totalXp += xpEarned;
    
    const { level, progress } = this.calculateLevel(this.userProgress.totalXp);
    this.userProgress.level = level;
    this.userProgress.levelProgress = progress;
    
    this.updateStreak();
    return this.userProgress;
  }
}

export const storage = new MemStorage();
