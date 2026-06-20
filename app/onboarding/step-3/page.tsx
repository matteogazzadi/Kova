import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const sources = [
  {
    id: 'strava',
    name: 'Strava',
    description: 'Running, cycling, swimming and more',
    available: true,
    connectHref: '/api/strava/connect',
  },
  {
    id: 'garmin',
    name: 'Garmin Connect',
    description: 'Garmin devices and GPS watches',
    available: false,
  },
  {
    id: 'coros',
    name: 'Coros',
    description: 'Coros watches and multisport devices',
    available: false,
  },
  {
    id: 'apple_health',
    name: 'Apple Health',
    description: 'iPhone and Apple Watch activity data',
    available: false,
  },
]

export default function Step3Page() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Connect your training data</CardTitle>
        <CardDescription>
          Give your AI coach real context by connecting your activity history. You can do this later
          from the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3">
          {sources.map((source) => (
            <div
              key={source.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{source.name}</p>
                <p className="text-sm text-muted-foreground">{source.description}</p>
              </div>
              {source.available ? (
                <Button asChild size="sm" variant="outline">
                  <a href={source.connectHref}>Connect</a>
                </Button>
              ) : (
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  Coming soon
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:underline"
          >
            Skip — go to dashboard →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
