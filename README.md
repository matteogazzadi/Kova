# Kova — AI Fitness Coaching

Personalized training plans powered by real workout data and Google Gemini.

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **UI**: Tailwind CSS v4 + shadcn/ui
- **Auth**: Auth.js v5 (email magic link + Google OAuth)
- **Database**: PostgreSQL via Neon + Drizzle ORM
- **AI**: Google Gemini (`@google/generative-ai`) — server-side only
- **Fitness data**: Strava OAuth + DataProvider abstraction for future aggregators
- **Deploy**: Vercel

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in the values (see comments inside)
cp .env.example .env.local

# 3. Run dev server
npm run dev
```

## Env variables

See `.env.example` — every variable is documented there.

## Project structure

```
app/               Next.js App Router pages & API routes
components/ui/     shadcn/ui base components
lib/
  providers/       DataProvider interface + Strava / Aggregator implementations
  ai/              Gemini prompt templates and helpers
db/
  schema.ts        Drizzle table definitions
  migrations/      Generated SQL migrations
server/            Server-only utilities (never imported by client code)
types/             Shared TypeScript types
```

## Development phases

| Phase | Status | What |
|-------|--------|------|
| 1 | ✅ | Stack setup, folder structure, shadcn/ui |
| 2 | ⏳ | DB schema + onboarding form |
| 3 | ⏳ | Auth.js (magic link + Google) |
| 4 | ⏳ | Strava OAuth + activity import |
| 5 | ⏳ | Aggregator webhook (Garmin, Coros, Apple…) |
| 6 | ⏳ | Gemini plan generation |
| 7 | ⏳ | AI chat coach + streaming |
| 8 | ⏳ | Security hardening + deploy |
