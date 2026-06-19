// ─── Core domain types ────────────────────────────────────────────

export type Sport = 'running' | 'cycling' | 'triathlon' | 'strength' | 'other'
export type Level = 'beginner' | 'intermediate' | 'advanced'
export type Provider = 'strava' | 'garmin' | 'coros' | 'fitbit' | 'apple_health' | 'manual' | 'aggregator'
export type WorkoutType = 'easy' | 'tempo' | 'interval' | 'long' | 'recovery' | 'strength' | 'race' | 'other'
export type ChatRole = 'user' | 'assistant'

export interface UserProfile {
  id: string
  userId: string
  gender?: 'male' | 'female' | 'other' | null
  dateOfBirth?: Date | null
  weightKg?: number | null
  heightCm?: number | null
  sport: Sport
  level: Level
  goal: string
  weeklyHoursAvailable: number
  injuryNotes?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface NormalizedActivity {
  userId: string
  source: Provider
  type: WorkoutType
  startTime: Date
  durationSec: number
  distanceM?: number | null
  elevationGainM?: number | null
  avgHeartRate?: number | null
  maxHeartRate?: number | null
  avgPowerW?: number | null
  calories?: number | null
  perceivedEffort?: number | null  // RPE 1-10
  notes?: string | null
  rawJson?: Record<string, unknown> | null
  externalId?: string | null       // provider-specific ID for deduplication
}

export interface PlanWorkout {
  id: string
  planId: string
  date: Date
  type: WorkoutType
  description: string
  durationMinutes: number
  intensity: 'low' | 'moderate' | 'high' | 'max'
  completed: boolean
}
