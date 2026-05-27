import type { NextConfig } from "next";

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
};

export default nextConfig;