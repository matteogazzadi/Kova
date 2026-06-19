import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

// Singleton pattern — safe for serverless (Neon creates a new HTTP call per query)
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })
