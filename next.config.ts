import type { NextConfig } from "next";

const baseHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin-allow-popups',
    },
    {
        key: 'Cross-Origin-Resource-Policy',
        value: 'same-origin',
    },
    {
        key: 'Cross-Origin-Resource-Policy',
        value: 'same-origin',
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
    },
];

const cspHeader = {
    key: 'Content-Security-Policy',
    value: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://js.hs-scripts.com https://js.hsforms.net https://js.hscollectedforms.net https://js.hs-analytics.net https://js.hubspot.com https://snap.licdn.com https://connect.facebook.net",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https://app.cal.com https://cal.com https://cdn.sanity.io https://*.sanity.io https://www.googletagmanager.com https://www.google-analytics.com",
        "font-src 'self'",
        "connect-src 'self' https://app.cal.com https://cal.com https://cdn.sanity.io https://*.api.sanity.io https://api.sanity.io https://0s6hkcu1.api.sanity.io https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.hubspot.com https://forms.hubspot.com https://track.hubspot.com",
        "frame-src 'self' https://app.cal.com https://cal.com https://challenges.cloudflare.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
    ].join('; '),
};

const nextConfig: NextConfig = {
  /* 1. React Compiler (Performance) */
  reactCompiler: true,

  /* 2. Image Optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [50, 75, 85, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brianwoodson.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  /* 3. Experimental Features */
  experimental: {
    // Inlines critical CSS at build time, deferring non-critical chunks (Critters).
    // Safe for static/ISR pages — no runtime latency. Was previously removed for
    // dev-server latency, which does not apply to production builds.
    optimizeCss: true,

    // Reduces JS bundle size by smarter tree-shaking
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'motion',
      'react-hook-form',
      'zod'
    ],
  },

  async headers() {
    return [
      {
        // Base security headers for all routes
        source: '/(.*)',
        headers: baseHeaders,
      },
      {
        // CSP only for non-studio routes — Studio loads scripts/connections
        // from sanity-cdn.com and many dynamic Sanity origins that would
        // require an unmaintainable allowlist.
        source: '/((?!studio).*)',
        headers: [cspHeader],
      },
    ];
  },
};

export default nextConfig;
