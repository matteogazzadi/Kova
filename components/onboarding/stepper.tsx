'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const steps = [
  { label: 'Account', path: '/onboarding/step-1' },
  { label: 'AI Coach', path: '/onboarding/step-2' },
  { label: 'Training Data', path: '/onboarding/step-3' },
]

export function OnboardingStepper() {
  const pathname = usePathname()
  const currentStep = steps.findIndex((s) => pathname.startsWith(s.path))

  return (
    <div className="flex items-center">
      {steps.map((step, i) => {
        const isDone = i < currentStep
        const isActive = i === currentStep
        return (
          <div key={step.path} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors',
                  isDone && 'border-primary bg-primary text-primary-foreground',
                  isActive && 'border-primary text-primary',
                  !isDone && !isActive && 'border-muted-foreground/30 text-muted-foreground/40'
                )}
              >
                {isDone ? '✓' : i + 1}
              </div>
              <span
                className={cn(
                  'mt-1 text-xs',
                  isActive ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'mb-4 mx-2 h-px w-10',
                  i < currentStep ? 'bg-primary' : 'bg-muted-foreground/20'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
