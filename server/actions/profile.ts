'use server'

import { db } from '@/db'
import { users, profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dateOfBirth: z.string().optional(),
  weightKg: z.coerce.number().positive().optional(),
  heightCm: z.coerce.number().positive().optional(),
  sport: z.enum(['running', 'cycling', 'triathlon', 'strength', 'other']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  goal: z.string().min(1).max(500),
  weeklyHoursAvailable: z.coerce.number().min(1).max(40),
  injuryNotes: z.string().max(500).optional(),
})

export type ProfileFormState = {
  errors?: Record<string, string[]>
  message?: string
}

export async function saveProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const DEV_USER_ID = process.env.DEV_USER_ID

  if (!DEV_USER_ID) {
    return { message: 'Auth not configured yet — set DEV_USER_ID in .env.local to test.' }
  }

  const raw = Object.fromEntries(formData.entries())
  const parsed = profileSchema.safeParse(raw)

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { name, gender, dateOfBirth, weightKg, heightCm, sport, level, goal, weeklyHoursAvailable, injuryNotes } = parsed.data

  await db
    .insert(users)
    .values({ id: DEV_USER_ID, email: 'dev@kova.local', name: name ?? null })
    .onConflictDoUpdate({ target: users.id, set: { name: name ?? null } })

  const existingProfile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, DEV_USER_ID),
  })

  const profileData = {
    userId: DEV_USER_ID,
    gender: gender ?? null,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    weightKg: weightKg ?? null,
    heightCm: heightCm ?? null,
    sport,
    level,
    goal,
    weeklyHoursAvailable,
    injuryNotes: injuryNotes ?? null,
    updatedAt: new Date(),
  }

  if (existingProfile) {
    await db.update(profiles).set(profileData).where(eq(profiles.userId, DEV_USER_ID))
  } else {
    await db.insert(profiles).values(profileData)
  }

  redirect('/dashboard')
}
