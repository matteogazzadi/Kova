import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  integer,
  real,
  boolean,
  jsonb,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ─── Enums ──────────────────────────────────────────────────
export const sportEnum = pgEnum('sport', [
  'running',
  'cycling',
  'triathlon',
  'strength',
  'other',
])

export const levelEnum = pgEnum('level', ['beginner', 'intermediate', 'advanced'])

export const providerEnum = pgEnum('provider', [
  'strava',
  'garmin',
  'coros',
  'fitbit',
  'apple_health',
  'manual',
  'aggregator',
])

export const workoutTypeEnum = pgEnum('workout_type', [
  'easy',
  'tempo',
  'interval',
  'long',
  'recovery',
  'strength',
  'race',
  'other',
])

export const intensityEnum = pgEnum('intensity', ['low', 'moderate', 'high', 'max'])

export const chatRoleEnum = pgEnum('chat_role', ['user', 'assistant'])

export const genderEnum = pgEnum('gender', ['male', 'female', 'other'])

export const connectionStatusEnum = pgEnum('connection_status', [
  'active',
  'expired',
  'revoked',
])

// ─── Users ────────────────────────────────────────────────────
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Profiles ────────────────────────────────────────────────
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  gender: genderEnum('gender'),
  dateOfBirth: timestamp('date_of_birth', { withTimezone: true }),
  weightKg: real('weight_kg'),
  heightCm: real('height_cm'),
  sport: sportEnum('sport').notNull().default('running'),
  level: levelEnum('level').notNull().default('beginner'),
  goal: text('goal').notNull().default(''),
  weeklyHoursAvailable: real('weekly_hours_available').notNull().default(5),
  injuryNotes: text('injury_notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Provider Connections ────────────────────────────────────────────
export const connections = pgTable('connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  provider: providerEnum('provider').notNull(),
  // Stored encrypted (Phase 8); plaintext only in dev
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token'),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  providerUserId: text('provider_user_id'),
  status: connectionStatusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Activities ──────────────────────────────────────────────────
export const activities = pgTable('activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  source: providerEnum('source').notNull(),
  // externalId + source forms a natural deduplication key
  externalId: text('external_id'),
  type: workoutTypeEnum('type').notNull().default('other'),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  durationSec: integer('duration_sec').notNull(),
  distanceM: real('distance_m'),
  elevationGainM: real('elevation_gain_m'),
  avgHeartRate: integer('avg_heart_rate'),
  maxHeartRate: integer('max_heart_rate'),
  avgPowerW: integer('avg_power_w'),
  calories: integer('calories'),
  perceivedEffort: integer('perceived_effort'), // RPE 1–10
  notes: text('notes'),
  rawJson: jsonb('raw_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Plans ─────────────────────────────────────────────────────
export const plans = pgTable('plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  goal: text('goal').notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
  isActive: boolean('is_active').notNull().default(false),
  generatedByLlm: boolean('generated_by_llm').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Plan Workouts ────────────────────────────────────────────────
export const planWorkouts = pgTable('plan_workouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  planId: uuid('plan_id')
    .notNull()
    .references(() => plans.id, { onDelete: 'cascade' }),
  date: timestamp('date', { withTimezone: true }).notNull(),
  type: workoutTypeEnum('type').notNull(),
  description: text('description').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  intensity: intensityEnum('intensity').notNull(),
  completed: boolean('completed').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Chat Messages ────────────────────────────────────────────────
export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  planId: uuid('plan_id').references(() => plans.id, { onDelete: 'set null' }),
  role: chatRoleEnum('role').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Relations ────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  connections: many(connections),
  activities: many(activities),
  plans: many(plans),
  chatMessages: many(chatMessages),
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}))

export const connectionsRelations = relations(connections, ({ one }) => ({
  user: one(users, { fields: [connections.userId], references: [users.id] }),
}))

export const activitiesRelations = relations(activities, ({ one }) => ({
  user: one(users, { fields: [activities.userId], references: [users.id] }),
}))

export const plansRelations = relations(plans, ({ one, many }) => ({
  user: one(users, { fields: [plans.userId], references: [users.id] }),
  workouts: many(planWorkouts),
  chatMessages: many(chatMessages),
}))

export const planWorkoutsRelations = relations(planWorkouts, ({ one }) => ({
  plan: one(plans, { fields: [planWorkouts.planId], references: [plans.id] }),
}))

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  user: one(users, { fields: [chatMessages.userId], references: [users.id] }),
  plan: one(plans, { fields: [chatMessages.planId], references: [plans.id] }),
}))
