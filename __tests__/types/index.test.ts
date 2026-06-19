import { describe, it, expect } from 'vitest'
import type { NormalizedActivity, PlanWorkout, Sport, Level, WorkoutType } from '@/types'

// These tests act as living documentation of the type contracts.
// They ensure the shapes don't silently change between phases.

describe('NormalizedActivity shape', () => {
  it('accepts a minimal valid activity', () => {
    const activity: NormalizedActivity = {
      userId: 'user-1',
      source: 'strava',
      type: 'easy',
      startTime: new Date(),
      durationSec: 1800,
    }
    expect(activity.userId).toBe('user-1')
    expect(activity.source).toBe('strava')
    expect(activity.durationSec).toBe(1800)
  })

  it('accepts a fully populated activity', () => {
    const activity: NormalizedActivity = {
      userId: 'user-1',
      source: 'garmin',
      type: 'interval',
      startTime: new Date('2025-06-01T06:30:00Z'),
      durationSec: 4500,
      distanceM: 15000,
      elevationGainM: 250,
      avgHeartRate: 162,
      maxHeartRate: 185,
      avgPowerW: 280,
      calories: 620,
      perceivedEffort: 8,
      notes: 'Hard session, felt strong',
      rawJson: { sport_type: 'Run' },
      externalId: 'garmin-act-001',
    }
    expect(activity.perceivedEffort).toBe(8)
    expect(activity.externalId).toBe('garmin-act-001')
  })
})

describe('PlanWorkout shape', () => {
  it('accepts a valid plan workout', () => {
    const workout: PlanWorkout = {
      id: 'wk-1',
      planId: 'plan-1',
      date: new Date('2025-07-01'),
      type: 'tempo',
      description: '4x10min at threshold pace with 3min recovery',
      durationMinutes: 75,
      intensity: 'high',
      completed: false,
    }
    expect(workout.intensity).toBe('high')
    expect(workout.completed).toBe(false)
  })
})

describe('Sport and Level union types', () => {
  it('Sport covers all expected values', () => {
    const sports: Sport[] = ['running', 'cycling', 'triathlon', 'strength', 'other']
    expect(sports).toHaveLength(5)
  })

  it('Level covers all expected values', () => {
    const levels: Level[] = ['beginner', 'intermediate', 'advanced']
    expect(levels).toHaveLength(3)
  })

  it('WorkoutType covers all expected values', () => {
    const types: WorkoutType[] = ['easy', 'tempo', 'interval', 'long', 'recovery', 'strength', 'race', 'other']
    expect(types).toHaveLength(8)
  })
})
