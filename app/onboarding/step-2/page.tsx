'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import Link from 'next/link'
import { saveStep2, type Step2FormState } from '@/server/actions/onboarding/step2'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type Provider = 'anthropic' | 'openai' | 'google'

const providers: {
  id: Provider
  name: string
  company: string
  description: string
  keyHint: string
  keyUrl: string
}[] = [
  {
    id: 'anthropic',
    name: 'Claude',
    company: 'Anthropic',
    description: 'Excellent at nuanced reasoning and coaching advice',
    keyHint: 'sk-ant-…',
    keyUrl: 'https://console.anthropic.com/account/keys',
  },
  {
    id: 'openai',
    name: 'ChatGPT',
    company: 'OpenAI',
    description: 'World-class language model with broad capabilities',
    keyHint: 'sk-…',
    keyUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'google',
    name: 'Gemini',
    company: 'Google',
    description: 'Fast, multimodal — great for session screenshot analysis',
    keyHint: 'Your Google AI Studio key',
    keyUrl: 'https://aistudio.google.com/app/apikey',
  },
]

const initialState: Step2FormState = {}

export default function Step2Page() {
  const [selected, setSelected] = useState<Provider | null>(null)
  const [state, formAction, isPending] = useActionState(saveStep2, initialState)

  const provider = providers.find((p) => p.id === selected)

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Connect your AI coach</CardTitle>
        <CardDescription>
          Choose a provider and paste your API key. It is encrypted before being stored — we never
          use it except to generate your plans.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3">
          {providers.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={cn(
                'flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors',
                selected === p.id
                  ? 'border-primary bg-accent/40 ring-1 ring-primary'
                  : 'border-border hover:bg-muted/50'
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-xs text-muted-foreground">by {p.company}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.description}</p>
              </div>
              <div
                className={cn(
                  'h-4 w-4 shrink-0 rounded-full border-2 transition-colors',
                  selected === p.id ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                )}
              />
            </button>
          ))}
        </div>

        {selected && (
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="aiProvider" value={selected} />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="apiKey">API key</Label>
                {provider && (
                  <a
                    href={provider.keyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    Get your key →
                  </a>
                )}
              </div>
              <Input
                id="apiKey"
                name="apiKey"
                type="password"
                placeholder={provider?.keyHint}
                autoComplete="off"
                required
              />
              {state.errors?.apiKey && (
                <p className="text-xs text-destructive">{state.errors.apiKey[0]}</p>
              )}
              {state.message && (
                <p className="text-xs text-muted-foreground">{state.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Saving…' : 'Save & continue →'}
            </Button>
          </form>
        )}

        <div className="text-center">
          <Link href="/onboarding/step-3" className="text-sm text-muted-foreground hover:underline">
            Skip for now
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
