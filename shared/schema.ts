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
  source: z.enum(["library", "gym", "toolkit", "personal"]),
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

export const userProgressSchema = z.object({
  streakDays: z.number(),
  longestStreak: z.number(),
  exercisesCompleted: z.number(),
  exercisesThisMonth: z.number(),
  skillLevel: z.string(),
  levelProgress: z.number(),
});

export type UserProgress = z.infer<typeof userProgressSchema>;
