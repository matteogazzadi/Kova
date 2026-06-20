'use client'

import { useActionState } from 'react'
import { saveProfile, type ProfileFormState } from '@/server/actions/profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const initialState: ProfileFormState = {}

export default function OnboardingPage() {
  const [state, formAction, isPending] = useActionState(saveProfile, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Set up your profile</CardTitle>
          <CardDescription>
            Help Kova understand your training so Gemini can build the right plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.message && (
            <p className="mb-4 rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">
              {state.message}
            </p>
          )}
          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" placeholder="Alex" />
              {state.errors?.name && <p className="text-xs text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weightKg">Weight (kg)</Label>
                <Input id="weightKg" name="weightKg" type="number" step="0.1" placeholder="70" />
                {state.errors?.weightKg && <p className="text-xs text-destructive">{state.errors.weightKg[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="heightCm">Height (cm)</Label>
                <Input id="heightCm" name="heightCm" type="number" placeholder="175" />
                {state.errors?.heightCm && <p className="text-xs text-destructive">{state.errors.heightCm[0]}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of birth</Label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sport">Primary sport</Label>
                <select id="sport" name="sport" defaultValue="running" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="running">Running</option>
                  <option value="cycling">Cycling</option>
                  <option value="triathlon">Triathlon</option>
                  <option value="strength">Strength</option>
                  <option value="other">Other</option>
                </select>
                {state.errors?.sport && <p className="text-xs text-destructive">{state.errors.sport[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Experience level</Label>
                <select id="level" name="level" defaultValue="beginner" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal">Your goal</Label>
              <Textarea id="goal" name="goal" placeholder="e.g. Run a sub-4h marathon in October 2025" rows={3} />
              {state.errors?.goal && <p className="text-xs text-destructive">{state.errors.goal[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weeklyHoursAvailable">Weekly training hours available</Label>
              <Input id="weeklyHoursAvailable" name="weeklyHoursAvailable" type="number" min="1" max="40" step="0.5" placeholder="8" />
              {state.errors?.weeklyHoursAvailable && <p className="text-xs text-destructive">{state.errors.weeklyHoursAvailable[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="injuryNotes">Injury notes (optional)</Label>
              <Textarea id="injuryNotes" name="injuryNotes" placeholder="e.g. Left knee tendinopathy — avoid high-impact downhill" rows={2} />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Saving…' : 'Save profile & go to dashboard'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
