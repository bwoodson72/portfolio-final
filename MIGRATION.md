# Astro Migration

Branch: `astro-migration`

**Do not merge this branch into `main` unless Brian explicitly instructs that it be merged.**

## Target stack

- Astro 7 for routing, layouts, SEO, server rendering, and server endpoints
- Svelte 5 for reactive islands
- Starwind UI using its Astro adapter for shared UI primitives
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

Do not introduce React solely to bridge UI libraries into reactive components. Svelte islands should use native markup/Tailwind where the interaction belongs to Svelte; Starwind should own reusable Astro/native primitives where appropriate.

## Migration sequence

- [x] Create `astro-migration` branch
- [x] Add Astro 7 and Svelte 5 dependencies
- [x] Add Vercel adapter
- [x] Add Tailwind Vite integration
- [x] Add Starwind Astro configuration and theme foundation
- [x] Add Astro base layout and SEO defaults
- [x] Port CookieConsent from React to Svelte
- [x] Port shared header/navigation
- [x] Port shared footer and final CTA
- [x] Port homepage static sections to Astro
- [x] Port homepage reactive components to Svelte where required
- [x] Port services index and Sanity service `[slug]` route
- [x] Replace React Portable Text usage on migrated routes
- [x] Port knowledge index and `[slug]` route
- [x] Port work index and `[slug]` route
- [x] Port about page
- [x] Port location `[slug]` route
- [x] Port FAQ page
- [x] Port privacy and terms pages
- [x] Port contact page and replace React Cal.com embed
- [x] Port PageSpeed audit API endpoint
- [x] Port audit result UI to Astro/Svelte
- [x] Port audit report email action to Astro server endpoint
- [x] Port landing-page route and lead form to Astro/Svelte
- [x] Replace Next contact server action with Astro endpoint
- [x] Port sitemap and robots handling
- [x] Port structured data on primary public routes
- [x] Add Astro 404 page
- [x] Ignore `.astro` and `dist` generated output
- [x] Decide Sanity Studio strategy: do not embed React Studio in the Svelte frontend; deploy Studio separately with Sanity
- [x] Retire Next `revalidatePath()` strategy for migrated pages: Astro is currently server-rendered and queries Sanity on requests
- [ ] Regenerate and commit `package-lock.json` after dependency install is stable
- [ ] Replace Next font handling
- [ ] Restore Cal.com booking-success Meta Pixel tracking without React
- [ ] Verify all environment variable names for Astro/Vercel
- [ ] Replace/remove React-only dependencies after their last consumer is migrated
- [ ] Remove retired Next application after parity is confirmed
- [ ] Route parity QA
- [ ] Accessibility QA
- [ ] SEO metadata/schema parity QA
- [ ] Performance QA
- [ ] Production cutover

## Sanity Studio

Sanity recommends deploying Studio separately with `sanity deploy`. The Studio is itself a React application; embedding it in Astro would require retaining React solely for the admin interface. The migration therefore keeps Sanity as the CMS/API but does not embed Studio in the Astro frontend.

## Sanity content freshness

The Astro application currently uses `output: 'server'`, and migrated Sanity routes query content server-side. The old Next webhook endpoint using `revalidatePath()` is not needed for these routes. If the site later switches to prerendered/static content, replace this with a Sanity webhook that triggers a Vercel deploy/build hook.

## Compatibility during migration

The original Next application remains in `src/app` for reference while pages are ported. The package scripts retain `dev:next`, `build:next`, and `start:next` temporarily. React dependencies should not be removed until all corresponding Next code has either been ported or intentionally retired.
