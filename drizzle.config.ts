import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'

// drizzle-kit runs outside Next.js, so we load .env.local manually
config({ path: '.env.local' })

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
