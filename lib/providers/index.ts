export type { DataProvider } from './types'
// Concrete providers are imported lazily to avoid pulling in secrets at module load time.
// Usage: import { StravaProvider } from '@/lib/providers/strava'
