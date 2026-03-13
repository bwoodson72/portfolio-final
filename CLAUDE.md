# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for Brian Woodson Web Development — a distributed web studio offering design, copywriting, SEO, and development for small businesses. Built with Next.js 16 App Router, React 19, TypeScript 5, and Tailwind CSS v4. Targets Lighthouse 100/100. Dark theme only.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — ESLint (flat config, ESLint 9)

No test framework is configured.

## Architecture

### Routing & Layout

Uses Next.js App Router with a single route group `(site)`:

```
src/app/layout.tsx          → Root layout (fonts, metadata)
src/app/(site)/layout.tsx   → Site layout (nav, smooth scroll, footer)
src/app/(site)/page.tsx     → Home page (all sections)
```

Navigation is scroll-based via anchor links (`#top`, `#work`, `#about`, `#packages`, `#contact`), not multi-page routing.

### Content

All site content lives in `src/content/portfolio.ts` as a typed `siteContent` object — single source of truth, no CMS. Projects, packages, and copy are defined there with TypeScript types (`Project`, `PackageTier`, `SiteContent`, `LinkSet`).

### Components

- `src/components/home/` — Page section components (hero, featured-outcomes, portfolio-section, how-i-work, final-cta, proof-strip)
- `src/components/` — Shared components (nav, footer, contactForm, customCursor, loadingScreen, smoothScroll)

Most components are Client Components (`'use client'`) due to animations and interactivity. Server Components are used for layouts and metadata.

### Server Action

`src/app/actions/sendEmail.ts` — Single server action handling contact form submission via Resend API. No API routes exist.

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Key Technical Decisions

- **Tailwind CSS v4** with Oxide engine — theme tokens defined as CSS variables in `src/app/globals.css` using `@theme` directive
- **React Compiler** enabled (`babel-plugin-react-compiler`) for automatic memoization
- **Motion** (formerly Framer Motion) for all animations
- **Lenis** for smooth scroll hijacking, wrapped in `smoothScroll.tsx`
- **Zod 4 + React Hook Form** for type-safe form validation
- **Critters** for critical CSS inlining
- **Image optimization**: avif/webp formats, responsive `sizes` props, native `text-shadow` over `drop-shadow` filters for LCP
- **optimizePackageImports** in next.config.ts for tree-shaking lucide-react, motion, react-hook-form, zod
- `optimizeCss` was removed from next.config to fix 400ms server latency

## Environment Variables

- `RESEND_API_KEY` — Required for contact form email delivery (in `.env.local`)
