import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// In serverless environments each invocation creates a new connection.
// postgres-js handles this gracefully for both Supabase and Neon direct URLs.
const client = postgres(process.env.DATABASE_URL!, { prepare: false })
export const db = drizzle(client, { schema })
