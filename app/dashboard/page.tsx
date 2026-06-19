// Protected route — auth middleware will be added in Phase 3
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, athlete.</p>
        </div>
        <Badge variant="secondary">No plan active</Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Connect Strava</CardTitle>
            <CardDescription>Import your real training data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/api/strava/auth">Connect →</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Plan</CardTitle>
            <CardDescription>AI-generated plan based on your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/api/plan/generate">Generate plan</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Coach</CardTitle>
            <CardDescription>Chat with Gemini about your training</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="secondary" asChild>
              <Link href="/coach">Open coach →</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Connect Strava or add activities manually to see them here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-8 text-center">No activities yet.</p>
        </CardContent>
      </Card>
    </div>
  )
}
