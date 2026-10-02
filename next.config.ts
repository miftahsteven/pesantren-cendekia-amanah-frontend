import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ]
  },
  async rewrites() {
    const defaultBackendUrl = process.env.NODE_ENV === 'production'
      ? (process.env.NEXT_PUBLIC_SITE_URL || 'https://cendekiaamanah.sch.id')
      : 'http://127.0.0.1:3004';
    const backendUrl = (process.env.INTERNAL_BACKEND_URL || defaultBackendUrl).replace(/\/$/, '');
    return [
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`
      },
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
