import Link from 'next/link'
import {
  Activity,
  Calendar,
  Clock,
  Heart,
  Map,
  TrendingUp,
  Zap,
  ChevronRight,
  Flame,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ─── Mock data ────────────────────────────────────────────────────

const recentActivities = [
  {
    emoji: '🏃',
    label: 'Easy Run',
    date: 'Tue Jun 18',
    km: 12.4,
    duration: '58 min',
    hr: 142,
    effort: 3,
    effortColor: 'text-emerald-600',
  },
  {
    emoji: '🏃',
    label: 'Tempo Intervals',
    date: 'Mon Jun 17',
    km: 8.2,
    duration: '47 min',
    hr: 168,
    effort: 4,
    effortColor: 'text-amber-600',
  },
  {
    emoji: '🏃',
    label: 'Long Run',
    date: 'Sun Jun 15',
    km: 22.1,
    duration: '2h 08',
    hr: 138,
    effort: 3,
    effortColor: 'text-emerald-600',
  },
  {
    emoji: '🏃',
    label: 'Recovery Jog',
    date: 'Sat Jun 14',
    km: 6.0,
    duration: '35 min',
    hr: 128,
    effort: 1,
    effortColor: 'text-blue-600',
  },
  {
    emoji: '🚴',
    label: 'Cycling',
    date: 'Fri Jun 13',
    km: 45.0,
    duration: '1h 32',
    hr: 145,
    effort: 3,
    effortColor: 'text-emerald-600',
  },
]

const upcomingWorkouts = [
  {
    date: 'Sat Jun 21',
    label: 'Easy Run',
    detail: '10 km · 50 min',
    intensity: 'Low',
    cls: 'bg-blue-100 text-blue-700',
  },
  {
    date: 'Sun Jun 22',
    label: 'Long Run',
    detail: '24 km · 2h 15',
    intensity: 'Moderate',
    cls: 'bg-amber-100 text-amber-700',
  },
  {
    date: 'Tue Jun 24',
    label: 'Tempo Intervals',
    detail: '8 km · 50 min',
    intensity: 'High',
    cls: 'bg-red-100 text-red-700',
  },
]

const weeklyBars = [
  { day: 'Mon', km: 8.2 },
  { day: 'Tue', km: 12.4 },
  { day: 'Wed', km: 0 },
  { day: 'Thu', km: 6.0 },
  { day: 'Fri', km: 20.7 },
  { day: 'Sat', km: 0 },
  { day: 'Sun', km: 0 },
]

const maxKm = Math.max(...weeklyBars.map((d) => d.km))

// ─── Sub-components ───────────────────────────────────────────────

function EffortDots({ effort }: { effort: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            i <= effort ? 'bg-primary' : 'bg-muted-foreground/20'
          )}
        />
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b bg-card px-6 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold text-primary">Kova</span>
            <nav className="hidden gap-6 text-sm sm:flex">
              <span className="font-medium text-foreground">Dashboard</span>
              <span className="cursor-not-allowed text-muted-foreground/40" title="Coming soon">
                Coach
              </span>
              <span className="cursor-not-allowed text-muted-foreground/40" title="Coming soon">
                Activities
              </span>
              <span className="cursor-not-allowed text-muted-foreground/40" title="Coming soon">
                Settings
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Demo
            </Badge>
            <Button size="sm" asChild>
              <Link href="/onboarding">Complete setup →</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        {/* Greeting */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Alex 👋</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Week of Jun 16–22 · 4 of 5 planned sessions done
            </p>
          </div>
          <Badge className="hidden bg-emerald-600 text-white sm:inline-flex">On track</Badge>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              Icon: Map,
              label: 'This week',
              value: '47.3 km',
              sub: '↑ 8% vs last week',
              positive: true,
            },
            {
              Icon: Clock,
              label: 'Time trained',
              value: '5h 23min',
              sub: 'Target: 6h',
              positive: null,
            },
            {
              Icon: Activity,
              label: 'Sessions',
              value: '4 / 5',
              sub: 'One left this week',
              positive: null,
            },
            {
              Icon: Heart,
              label: 'Avg heart rate',
              value: '148 bpm',
              sub: 'Zone 2–3',
              positive: null,
            },
          ].map(({ Icon, label, value, sub, positive }) => (
            <Card key={label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-2xl font-bold">{value}</p>
                    <p
                      className={cn(
                        'mt-0.5 text-xs',
                        positive ? 'text-emerald-600' : 'text-muted-foreground'
                      )}
                    >
                      {sub}
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent p-2">
                    <Icon className="h-4 w-4 text-accent-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left col */}
          <div className="space-y-6 lg:col-span-2">
            {/* Recent activities */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Recent Activities</CardTitle>
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground" disabled>
                  View all <ChevronRight className="h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent className="divide-y p-0">
                {recentActivities.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-3">
                    <span className="text-xl">{a.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{a.label}</p>
                        <EffortDots effort={a.effort} />
                      </div>
                      <p className="text-xs text-muted-foreground">{a.date}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold">{a.km} km</p>
                      <p className="text-xs text-muted-foreground">
                        {a.duration} · {a.hr} bpm
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly volume bar chart */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Weekly Volume</CardTitle>
                    <CardDescription>Jun 16 – 22, 2026</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-sm font-semibold">47.3 km</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex h-28 items-end gap-2">
                  {weeklyBars.map((d) => {
                    const pct = d.km > 0 ? Math.max((d.km / maxKm) * 80, 6) : 4
                    return (
                      <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {d.km > 0 ? d.km : ''}
                        </span>
                        <div
                          className={cn(
                            'w-full rounded-t-sm',
                            d.km > 0 ? 'bg-primary' : 'bg-muted'
                          )}
                          style={{ height: `${pct}px` }}
                        />
                        <span className="text-[10px] text-muted-foreground">{d.day}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right col */}
          <div className="space-y-6">
            {/* Upcoming workouts */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">Upcoming Workouts</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingWorkouts.map((w, i) => (
                  <div key={i}>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {w.date}
                    </p>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{w.label}</p>
                        <p className="text-xs text-muted-foreground">{w.detail}</p>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
                          w.cls
                        )}
                      >
                        {w.intensity}
                      </span>
                    </div>
                    {i < upcomingWorkouts.length - 1 && <div className="mt-3 border-b" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Coach */}
            <Card className="border-primary/30 bg-accent/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base text-primary">AI Coach</CardTitle>
                </div>
                <CardDescription>
                  Connect Claude, ChatGPT, or Gemini to get a personalised plan and chat about your training.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/onboarding/step-2">Connect AI coach →</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Training load */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">Training Load</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Acute (7d)', value: 72, color: 'bg-emerald-500' },
                  { label: 'Chronic (28d)', value: 58, color: 'bg-primary' },
                  { label: 'Form (TSB)', value: 14, color: 'bg-amber-500', sub: 'Fresh' },
                ].map(({ label, value, color, sub }) => (
                  <div key={label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">
                        {value} {sub && <span className="text-muted-foreground">· {sub}</span>}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className={cn('h-1.5 rounded-full', color)}
                        style={{ width: `${Math.min(value, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strava */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">Connect Strava</CardTitle>
                </div>
                <CardDescription>Import your real training history.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Coming soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
