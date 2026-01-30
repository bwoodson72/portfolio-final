import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. React Compiler (Performance) */
  reactCompiler: true,

  /* 2. Image Optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  /* 3. Experimental Features */
  experimental: {
    // NOTE: 'optimizeCss' removed to fix 400ms server latency.

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