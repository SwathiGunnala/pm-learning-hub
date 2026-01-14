import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Warn but don't crash if DATABASE_URL is missing - allows app to start for public routes
if (!process.env.DATABASE_URL) {
  console.warn(
    "[DB WARN] DATABASE_URL is not set. Database features will be unavailable.",
  );
}

// Logging helper with timestamps
function dbLog(level: 'info' | 'warn' | 'error', message: string, details?: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  const prefix = `[DB ${level.toUpperCase()}] ${timestamp}`;
  if (details) {
    console.log(`${prefix} ${message}`, JSON.stringify(details));
  } else {
    console.log(`${prefix} ${message}`);
  }
}

// Configure pool with retry-friendly settings for Neon PostgreSQL
// Only create pool if DATABASE_URL is available
export const pool = process.env.DATABASE_URL 
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      // Connection pool settings
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      // Allow retries on transient errors
      allowExitOnIdle: false,
    })
  : null;

// Track connection stats
let connectionStats = {
  totalConnections: 0,
  failedConnections: 0,
  lastError: null as string | null,
  lastErrorTime: null as string | null,
};

// Handle pool connection events (only if pool exists)
if (pool) {
  pool.on('connect', () => {
    connectionStats.totalConnections++;
    dbLog('info', 'New database connection established', { 
      totalConnections: connectionStats.totalConnections,
      poolSize: pool.totalCount,
      idleCount: pool.idleCount,
      waitingCount: pool.waitingCount
    });
  });

  // Handle pool errors gracefully (prevents crashes on transient DNS errors)
  pool.on('error', (err) => {
    connectionStats.failedConnections++;
    connectionStats.lastError = err.message;
    connectionStats.lastErrorTime = new Date().toISOString();
    
    const errorType = identifyErrorType(err.message);
    
    dbLog('error', `Database pool error: ${errorType}`, {
      message: err.message,
      code: (err as any).code,
      failedConnections: connectionStats.failedConnections,
      poolSize: pool.totalCount,
      idleCount: pool.idleCount
    });
    
    // Don't crash on transient errors
    if (errorType === 'DNS_TRANSIENT' || errorType === 'NETWORK_TRANSIENT') {
      dbLog('info', 'Transient error detected, connection will retry automatically');
    }
  });
}

// Identify error type for better logging
function identifyErrorType(message: string): string {
  if (message.includes('EAI_AGAIN')) return 'DNS_TRANSIENT';
  if (message.includes('ENOTFOUND')) return 'DNS_NOT_FOUND';
  if (message.includes('ECONNRESET')) return 'CONNECTION_RESET';
  if (message.includes('ETIMEDOUT')) return 'TIMEOUT';
  if (message.includes('ECONNREFUSED')) return 'CONNECTION_REFUSED';
  if (message.includes('authentication')) return 'AUTH_ERROR';
  return 'UNKNOWN';
}

// Check if error is transient (worth retrying)
function isTransientError(error: any): boolean {
  const errorType = identifyErrorType(error.message || '');
  return ['DNS_TRANSIENT', 'DNS_NOT_FOUND', 'CONNECTION_RESET', 'TIMEOUT', 'CONNECTION_REFUSED'].includes(errorType);
}

// Create drizzle instance only if pool exists
export const db = pool ? drizzle(pool, { schema }) : null as any;

// Helper function to execute queries with retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string = 'database operation',
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const startTime = Date.now();
      const result = await operation();
      const duration = Date.now() - startTime;
      
      if (attempt > 1) {
        dbLog('info', `${operationName} succeeded after ${attempt} attempts`, { duration });
      }
      
      return result;
    } catch (error: any) {
      lastError = error;
      const errorType = identifyErrorType(error.message || '');
      
      dbLog('warn', `${operationName} failed (attempt ${attempt}/${maxRetries})`, {
        errorType,
        message: error.message,
        code: error.code
      });
      
      if (isTransientError(error) && attempt < maxRetries) {
        const waitTime = delayMs * attempt;
        dbLog('info', `Retrying ${operationName} in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        dbLog('error', `${operationName} failed permanently after ${attempt} attempts`, {
          errorType,
          message: error.message
        });
        throw error;
      }
    }
  }
  
  throw lastError;
}

// Export connection stats for monitoring
export function getConnectionStats() {
  return {
    ...connectionStats,
    currentPoolSize: pool?.totalCount ?? 0,
    idleConnections: pool?.idleCount ?? 0,
    waitingRequests: pool?.waitingCount ?? 0,
    databaseAvailable: !!pool
  };
}
