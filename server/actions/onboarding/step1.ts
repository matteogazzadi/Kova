'use server'

import { db } from '@/db'
import { users, profiles } from '@/db/schema'
import { and, eq, ne } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const step1Schema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[a-z0-9_-]+$/, 'Only lowercase letters, numbers, _ and - allowed'),
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
})

export type Step1FormState = {
  errors?: Record<string, string[]>
  message?: string
}

export async function saveStep1(
  _prevState: Step1FormState,
  formData: FormData
): Promise<Step1FormState> {
  const DEV_USER_ID = process.env.DEV_USER_ID
  if (!DEV_USER_ID) {
    return { message: 'Auth not configured — set DEV_USER_ID in .env.local to test.' }
  }

  const raw = Object.fromEntries(formData.entries())
  // Drop blank optional fields so they don't fail enum validation
  const cleaned = Object.fromEntries(
    Object.entries(raw).filter(([, v]) => v !== '')
  )
  const parsed = step1Schema.safeParse(cleaned)

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { username, email, firstName, lastName, dateOfBirth, gender } = parsed.data

  // Check username uniqueness (exclude the current user's own row)
  const takenBy = await db.query.users.findFirst({
    where: and(eq(users.username, username), ne(users.id, DEV_USER_ID)),
  })
  if (takenBy) {
    return { errors: { username: ['This username is already taken'] } }
  }

  await db
    .insert(users)
    .values({ id: DEV_USER_ID, email, name: firstName ?? null, username })
    .onConflictDoUpdate({
      target: users.id,
      set: { email, name: firstName ?? null, username },
    })

  const existingProfile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, DEV_USER_ID),
  })

  const profileData = {
    userId: DEV_USER_ID,
    firstName: firstName ?? null,
    lastName: lastName ?? null,
    gender: gender ?? null,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    updatedAt: new Date(),
  }

  if (existingProfile) {
    await db.update(profiles).set(profileData).where(eq(profiles.userId, DEV_USER_ID))
  } else {
    await db.insert(profiles).values(profileData)
  }

  redirect('/onboarding/step-2')
}
