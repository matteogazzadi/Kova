import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { BackgroundImage } from '@/components/ui/background-image'

export default function SignInPage() {
  return (
    <BackgroundImage className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/55" />

      <Card className="relative z-10 w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-1 text-2xl font-bold text-primary">Kova</div>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your training dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between" disabled>
              <span>Continue with Google</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                Phase 3
              </span>
            </Button>
            <Button variant="outline" className="w-full justify-between" disabled>
              <span>Continue with Apple</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                Phase 3
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (magic link)</Label>
            <Input id="email" type="email" placeholder="you@example.com" disabled />
            <Button className="w-full" disabled>
              Send magic link
              <span className="ml-auto rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px]">
                Phase 3
              </span>
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/onboarding">Try the demo →</Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              No account needed — explore Kova now
            </p>
          </div>
        </CardContent>
      </Card>
    </BackgroundImage>
  )
}
