# Astro Migration

Branch: `astro-migration`

**Do not merge this branch into `main` unless Brian explicitly instructs that it be merged.**

## Target stack

- Astro 7 for routing, layouts, SEO, server rendering, and server endpoints
- Svelte 5 for reactive islands
- Starwind UI using its Astro adapter for shared UI primitives
- Tailwind CSS 4
- Sanity for CMS content and Studio
- TypeScript
- Vercel adapter for runtime endpoints

## Architecture rule

Use the least-client-side option that satisfies the requirement:

1. Static/presentational UI -> `.astro`
2. Reactive browser state/events -> `.svelte`
3. Starwind primitives -> Astro components/native Starwind runtime
4. Server-only behavior -> `.ts`

React and Next.js are retired from the migrated frontend.

## Migration status

The application port is complete on this branch. The following have been migrated:

- shared layouts, navigation, footer, SEO defaults, analytics and consent
- homepage and primary marketing pages
- Sanity-driven services, knowledge, locations, work, and landing pages
- Portable Text rendering
- contact, audit, audit-report, and lead-capture server endpoints
- Svelte reactive islands for navigation, audit flows, forms, sharing, and cookie consent
- sitemap, robots, 404 handling, structured data, Open Graph metadata, and self-hosted fonts
- Cal.com booking integration without React
- Vercel Speed Insights and Meta Pixel tracking
- separate Sanity Studio strategy

## Cleanup completed

- removed the retired Next application and Next-specific route/action files
- removed superseded React components
- removed React/Next-only runtime and development dependencies
- removed the migration preview route
- removed stale generated `dist` output
- removed the stale Next-era `package-lock.json`; run `npm install` once in a networked checkout to generate the lockfile for the final dependency set

## Validation

Repository-side migration work is complete. A networked local checkout should run:

```bash
npm install
npm run check
npm run build
```

Then perform browser QA for route parity, accessibility, metadata/schema, forms, analytics, booking, and performance before production cutover.

This branch must remain unmerged until explicitly requested.
