'use server'

import { db } from '@/db'
import { profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { encrypt } from '@/lib/crypto'

const step2Schema = z.object({
  aiProvider: z.enum(['anthropic', 'openai', 'google']),
  apiKey: z.string().min(10, 'API key is too short'),
})

export type Step2FormState = {
  errors?: Record<string, string[]>
  message?: string
}

export async function saveStep2(
  _prevState: Step2FormState,
  formData: FormData
): Promise<Step2FormState> {
  const DEV_USER_ID = process.env.DEV_USER_ID
  if (!DEV_USER_ID) {
    return { message: 'Auth not configured — set DEV_USER_ID in .env.local to test.' }
  }

  const raw = Object.fromEntries(formData.entries())
  const parsed = step2Schema.safeParse(raw)

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { aiProvider, apiKey } = parsed.data

  if (aiProvider === 'anthropic' && !apiKey.startsWith('sk-ant-')) {
    return { errors: { apiKey: ['Anthropic API keys start with sk-ant-'] } }
  }
  if (aiProvider === 'openai' && !apiKey.startsWith('sk-')) {
    return { errors: { apiKey: ['OpenAI API keys start with sk-'] } }
  }

  // Encrypt the key; fall back to a dev prefix if TOKEN_ENCRYPTION_KEY is unset
  const aiApiKeyEncrypted = process.env.TOKEN_ENCRYPTION_KEY
    ? encrypt(apiKey)
    : `dev:${apiKey}`

  const existingProfile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, DEV_USER_ID),
  })

  if (existingProfile) {
    await db
      .update(profiles)
      .set({ aiProvider, aiApiKeyEncrypted, updatedAt: new Date() })
      .where(eq(profiles.userId, DEV_USER_ID))
  } else {
    await db.insert(profiles).values({
      userId: DEV_USER_ID,
      aiProvider,
      aiApiKeyEncrypted,
    })
  }

  redirect('/onboarding/step-3')
}
