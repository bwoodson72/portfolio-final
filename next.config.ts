import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Existing Config */
  reactCompiler: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Note: 'qualities' isn't a standard Next.js image key, usually just 'quality' per image or nothing globally.
    // However, if you are using a custom loader that respects this, keep it.
    // Otherwise, standard Next.js uses one global 'minimumCacheTTL' or per-image props.
  },

  /* 2. New Optimization Config */
  experimental: {
    // ELIMINATES RENDER BLOCKING: Inlines critical CSS to the HTML head
    optimizeCss: true,

    // REDUCES JS BUNDLE: Smarter tree-shaking for heavy libraries
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