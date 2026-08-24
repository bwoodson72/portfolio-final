# Astro Migration

Branch: `astro-migration`

## Target stack

- Astro 7 for routing, layouts, SEO, static rendering, and server endpoints
- Svelte 5 for reactive islands
- Starwind UI v3 using its Astro adapter for shared UI primitives
- Tailwind CSS 4
- Sanity for CMS content
- TypeScript
- Vercel adapter for runtime endpoints

## Architecture rule

Use the least-client-side option that satisfies the requirement:

1. Static/presentational UI -> `.astro`
2. Reactive browser state/events -> `.svelte`
3. Starwind primitives -> Astro components/native Starwind runtime
4. Server-only behavior -> `.ts`

Starwind currently provides official Astro and React adapters, not a Svelte adapter. Do not introduce React solely to bridge Starwind into reactive components. Svelte islands should use native markup/Tailwind where the interaction belongs to Svelte; Starwind should own reusable Astro/native primitives where appropriate.

## Migration sequence

- [x] Create `astro-migration` branch
- [x] Add Astro 7 and Svelte 5 dependencies
- [x] Add Vercel adapter
- [x] Add Tailwind Vite integration
- [x] Add Starwind Astro configuration and theme foundation
- [x] Add Astro base layout and SEO defaults
- [x] Port CookieConsent from React to Svelte
- [x] Add noindex migration preview route
- [ ] Regenerate `package-lock.json` after dependency install
- [ ] Port shared header/navigation
- [ ] Port shared footer
- [ ] Port homepage static sections to Astro
- [ ] Replace interactive homepage React components with Svelte where required
- [ ] Port services index
- [ ] Port Sanity service `[slug]` route
- [ ] Port knowledge index and `[slug]` route
- [ ] Port work, about, locations, FAQ, legal pages
- [ ] Port contact form to Svelte + Astro server endpoint
- [ ] Port audit UI to Svelte + Astro server endpoint
- [ ] Replace Next server actions
- [ ] Replace Next revalidation with Sanity publish/build strategy
- [ ] Port sitemap and robots handling
- [ ] Port structured data route-by-route
- [ ] Replace Next font handling
- [ ] Replace/remove React-only dependencies after their last consumer is migrated
- [ ] Route parity QA
- [ ] Accessibility QA
- [ ] SEO metadata/schema parity QA
- [ ] Performance QA
- [ ] Production cutover

## Compatibility during migration

The original Next application remains in `src/app` for reference while pages are ported. The package scripts retain `dev:next`, `build:next`, and `start:next` temporarily. React dependencies should not be removed until all corresponding Next code has either been ported or intentionally retired.
