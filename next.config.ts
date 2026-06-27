import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
