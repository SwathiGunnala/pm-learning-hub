import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure pool with retry-friendly settings for Neon PostgreSQL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Connection pool settings
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  // Allow retries on transient errors
  allowExitOnIdle: false,
});

// Handle pool errors gracefully (prevents crashes on transient DNS errors)
pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err.message);
  // Don't crash on transient errors like EAI_AGAIN
  if (err.message.includes('EAI_AGAIN') || err.message.includes('ENOTFOUND')) {
    console.log('Transient DNS error detected, connection will retry automatically');
  }
});

export const db = drizzle(pool, { schema });

// Helper function to execute queries with retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a transient error worth retrying
      const isTransient = 
        error.message?.includes('EAI_AGAIN') ||
        error.message?.includes('ENOTFOUND') ||
        error.message?.includes('ECONNRESET') ||
        error.message?.includes('ETIMEDOUT') ||
        error.code === 'ECONNREFUSED';
      
      if (isTransient && attempt < maxRetries) {
        console.log(`Database operation failed (attempt ${attempt}/${maxRetries}): ${error.message}`);
        console.log(`Retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
      } else {
        throw error;
      }
    }
  }
  
  throw lastError;
}
