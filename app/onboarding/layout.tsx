import { OnboardingStepper } from '@/components/onboarding/stepper'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-card px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="text-lg font-bold text-primary">Kova</span>
          <OnboardingStepper />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10">{children}</main>
    </div>
  )
}
