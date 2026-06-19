import { describe, it, expect, vi } from 'vitest'
import type { DataProvider } from '@/lib/providers/types'
import type { NormalizedActivity } from '@/types'

// Verify the DataProvider contract can be correctly implemented
function makeProvider(overrides: Partial<DataProvider> = {}): DataProvider {
  return {
    name: 'mock',
    getAuthUrl: vi.fn().mockReturnValue('https://provider.example/oauth'),
    handleCallback: vi.fn().mockResolvedValue({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      expiresAt: new Date(Date.now() + 3600 * 1000),
      providerUserId: 'user-123',
    }),
    fetchActivities: vi.fn().mockResolvedValue([]),
    refreshAccessToken: vi.fn().mockResolvedValue({
      accessToken: 'new-access-token',
    }),
    ...overrides,
  }
}

describe('DataProvider interface', () => {
  it('getAuthUrl returns a URL string', () => {
    const provider = makeProvider()
    const url = provider.getAuthUrl('user-1', 'https://app.example/callback')
    expect(typeof url).toBe('string')
    expect(url.startsWith('https://')).toBe(true)
  })

  it('handleCallback resolves with token fields', async () => {
    const provider = makeProvider()
    const result = await provider.handleCallback('code-abc', 'user-1', 'https://app.example/callback')
    expect(result).toHaveProperty('accessToken')
    expect(result).toHaveProperty('providerUserId')
  })

  it('fetchActivities resolves with an array', async () => {
    const provider = makeProvider()
    const activities = await provider.fetchActivities('token', 'refresh', new Date(), 'user-1')
    expect(Array.isArray(activities)).toBe(true)
  })

  it('fetchActivities can return NormalizedActivity objects', async () => {
    const activity: NormalizedActivity = {
      userId: 'user-1',
      source: 'strava',
      type: 'easy',
      startTime: new Date('2025-01-01T08:00:00Z'),
      durationSec: 3600,
      distanceM: 10000,
      avgHeartRate: 145,
    }
    const provider = makeProvider({
      fetchActivities: vi.fn().mockResolvedValue([activity]),
    })
    const result = await provider.fetchActivities('token', 'refresh', new Date(), 'user-1')
    expect(result).toHaveLength(1)
    expect(result[0].source).toBe('strava')
    expect(result[0].durationSec).toBe(3600)
  })

  it('refreshAccessToken resolves with a new accessToken', async () => {
    const provider = makeProvider()
    const result = await provider.refreshAccessToken('old-refresh-token')
    expect(result).toHaveProperty('accessToken')
    expect(typeof result.accessToken).toBe('string')
  })
})
