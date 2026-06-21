import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BackgroundImage } from '@/components/ui/background-image'

export default function HomePage() {
  return (
    <BackgroundImage className="flex min-h-screen flex-col">
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 px-4 text-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
            AI-Powered Training Coach
          </p>
          <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl">Kova</h1>
          <p className="mx-auto max-w-sm text-lg leading-relaxed text-white/75">
            Personalized training plans built on your real data. Connect your workouts, set your
            goal, and let AI build a plan that fits your life.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-white text-foreground hover:bg-white/90 px-8"
          >
            <Link href="/onboarding">Get started</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 px-8"
          >
            <Link href="/dashboard">View demo</Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 text-xs text-white/35">
          <span>Strava</span><span>·</span>
          <span>Garmin</span><span>·</span>
          <span>Coros</span><span>·</span>
          <span>Apple Health</span><span>·</span>
          <span>Claude</span><span>·</span>
          <span>ChatGPT</span><span>·</span>
          <span>Gemini</span>
        </div>
      </div>

      <div className="relative z-10 pb-6 text-center">
        <p className="text-[10px] text-white/20">
          Background photos via Unsplash — free to use
        </p>
      </div>
    </BackgroundImage>
  )
}
