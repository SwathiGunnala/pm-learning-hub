import { randomUUID } from "crypto";
import type { 
  CaseStudy, 
  Exercise, 
  Framework, 
  JournalEntry, 
  InsertJournalEntry,
  UserProgress 
} from "@shared/schema";
import { caseStudies as seedCaseStudies } from "./data/case-studies";
import { exercises as seedExercises } from "./data/exercises";
import { frameworks as seedFrameworks } from "./data/frameworks";

export interface IStorage {
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(id: string): Promise<CaseStudy | undefined>;
  getCaseStudiesByIndustry(industry: string): Promise<CaseStudy[]>;
  getCaseStudiesByOutcome(outcome: "win" | "fail"): Promise<CaseStudy[]>;
  
  getExercises(): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  getExercisesByCategory(category: string): Promise<Exercise[]>;
  
  getFrameworks(): Promise<Framework[]>;
  getFramework(id: string): Promise<Framework | undefined>;
  
  getJournalEntries(): Promise<JournalEntry[]>;
  getJournalEntry(id: string): Promise<JournalEntry | undefined>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  updateJournalEntry(id: string, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined>;
  deleteJournalEntry(id: string): Promise<boolean>;
  
  getUserProgress(): Promise<UserProgress>;
  incrementExercisesCompleted(): Promise<void>;
}

export class MemStorage implements IStorage {
  private caseStudies: Map<string, CaseStudy>;
  private exercises: Map<string, Exercise>;
  private frameworks: Map<string, Framework>;
  private journalEntries: Map<string, JournalEntry>;
  private userProgress: UserProgress;

  constructor() {
    this.caseStudies = new Map();
    this.exercises = new Map();
    this.frameworks = new Map();
    this.journalEntries = new Map();
    
    this.userProgress = {
      streakDays: 7,
      longestStreak: 14,
      exercisesCompleted: 42,
      exercisesThisMonth: 12,
      skillLevel: "Rising PM",
      levelProgress: 68,
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
        content: "The most interesting takeaway was how they pivoted from a gaming company. The team recognized that their internal tool had more value than the game itself. This taught me to always pay attention to what users are actually engaging with, not what we intended them to use.",
        excerpt: "The most interesting takeaway was how they pivoted from a gaming company...",
        date: new Date().toISOString(),
        source: "library",
        tags: ["pivots", "SaaS", "product-market-fit"],
      },
      {
        id: randomUUID(),
        title: "Prioritization exercise reflection",
        content: "I learned that I tend to overweight CEO preferences in my prioritization. Need to balance stakeholder input with user data. The AI feedback helped me see that I should be more confident in advocating for user needs.",
        excerpt: "I learned that I tend to overweight CEO preferences in my prioritization...",
        date: new Date(Date.now() - 86400000).toISOString(),
        source: "gym",
        tags: ["prioritization", "stakeholder-management"],
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

  async getCaseStudiesByIndustry(industry: string): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values()).filter(cs => cs.industry === industry);
  }

  async getCaseStudiesByOutcome(outcome: "win" | "fail"): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values()).filter(cs => cs.outcome === outcome);
  }

  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(ex => ex.category === category);
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

  async getJournalEntry(id: string): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
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

  async getUserProgress(): Promise<UserProgress> {
    return this.userProgress;
  }

  async incrementExercisesCompleted(): Promise<void> {
    this.userProgress.exercisesCompleted++;
    this.userProgress.exercisesThisMonth++;
    this.userProgress.levelProgress = Math.min(100, this.userProgress.levelProgress + 5);
  }
}

export const storage = new MemStorage();
