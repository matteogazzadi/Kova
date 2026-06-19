import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-xs uppercase tracking-widest">
          MVP — Phase 1
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">Kova</h1>
        <p className="max-w-md text-lg text-muted-foreground">
          AI-powered training plans built on your real data. Connect your workouts, set your goal,
          and let Gemini build a plan that fits your life.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/auth/signin">Get started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Strava · Garmin · Coros · Apple Health · Android Health Connect
      </p>
    </main>
  )
}
