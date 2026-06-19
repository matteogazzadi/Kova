// Onboarding profile form — wired to DB in Phase 2
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function OnboardingPage() {
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
          <form className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="70" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" placeholder="175" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sport">Primary sport</Label>
              <Input id="sport" placeholder="Running, Cycling, Triathlon…" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Your goal</Label>
              <Textarea
                id="goal"
                placeholder="e.g. Run a sub-4h marathon in October"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Weekly hours available</Label>
              <Input id="hours" type="number" placeholder="8" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="injuries">Injury notes (optional)</Label>
              <Textarea
                id="injuries"
                placeholder="e.g. Left knee tendinopathy — avoid high-impact downhill"
                rows={2}
              />
            </div>

            <Button type="submit" className="w-full">
              Save profile & go to dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
