import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.linkdiario.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
