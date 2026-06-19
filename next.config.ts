import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // Server Actions are stable in Next.js 14+; this ensures correct behavior
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
