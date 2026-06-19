import { NormalizedActivity } from '@/types'

/**
 * Abstraction layer for all fitness data sources.
 * Strava is the first implementation; a future AggregatorProvider
 * (Terra/Vital/Spike) will implement the same interface for
 * Garmin, Coros, Apple Health, Health Connect, Fitbit, and Oura.
 */
export interface DataProvider {
  readonly name: string

  /**
   * Returns the OAuth authorization URL to redirect the user to.
   * For providers without OAuth (e.g. manual), this should throw.
   */
  getAuthUrl(userId: string, redirectUri: string): string

  /**
   * Exchanges the OAuth callback code for tokens.
   * Returns the provider user ID so we can store it in `connections`.
   */
  handleCallback(
    code: string,
    userId: string,
    redirectUri: string
  ): Promise<{
    accessToken: string
    refreshToken?: string
    expiresAt?: Date
    providerUserId: string
  }>

  /**
   * Fetches activities from the provider since the given date
   * and normalizes them to our internal format.
   */
  fetchActivities(
    accessToken: string,
    refreshToken: string | undefined,
    since: Date,
    userId: string
  ): Promise<NormalizedActivity[]>

  /**
   * Refreshes the access token.
   * Returns the new access token and optional new refresh token + expiry.
   */
  refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string
    refreshToken?: string
    expiresAt?: Date
  }>
}
