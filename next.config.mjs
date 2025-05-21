/** @type {import('next').NextConfig} */

import nextPWA from 'next-pwa'

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config, { isServer }) {
    if (isServer) {
      config.resolve.alias['msw/browser'] = false
    } else {
      config.resolve.alias['msw/node'] = false
    }

    return config
  },
}

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [
    /middleware-manifest\.json$/,
    /react-loadable-manifest\.json$/,
    /build-manifest\.json$/,
    /prerender-manifest\.json$/,
    /routes-manifest\.json$/,
    /server\/middleware-runtime\.js$/,
    /\.map$/,
  ],
})

export default withPWA(nextConfig)
