import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

const { Pool } = pg;

// Parse the connection string to determine if it's local
const dbUrl = process.env.DATABASE_URL || '';
const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');

const pool = new Pool({
  connectionString: dbUrl,
  // Force SSL for remote connections, disable for local
  ssl: isLocal ? false : { rejectUnauthorized: false }
});

export const db = drizzle(pool, { schema });
export { schema };
