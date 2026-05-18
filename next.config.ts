import type { NextConfig } from 'next';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { i18n } = require('./next-i18next.config.js');

const nextConfig: NextConfig = {
  i18n,
  compress: true,
  reactStrictMode: false,
  distDir: '.next',
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.base-code.local',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '**'
      }
    ]
  },
  poweredByHeader: false,
  turbopack: {},
  transpilePackages: []
};

export default nextConfig;
