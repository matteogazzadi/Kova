// Sign-in page — wired to Auth.js in Phase 3
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Kova</CardTitle>
          <CardDescription>Sign in to access your training dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google OAuth — wired in Phase 3 */}
          <Button variant="outline" className="w-full" disabled>
            Continue with Google
          </Button>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          {/* Magic link — wired in Phase 3 */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <Button className="w-full" disabled>
            Send magic link
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Auth will be enabled in Phase 3
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
