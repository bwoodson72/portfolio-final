# Brian Woodson Web Development

Production portfolio and service website built with Astro, Svelte, Starwind, Tailwind CSS, Sanity, and TypeScript.

## Stack

- Astro 7 for routing, layouts, SEO, server rendering, and API endpoints
- Svelte 5 for reactive islands
- Starwind UI for reusable Astro UI primitives
- Tailwind CSS 4
- Sanity for CMS content and Studio
- Resend for transactional email
- Vercel adapter for deployment/runtime endpoints

## Architecture

Use Astro for static/presentational UI, Svelte only where browser state or events are required, and plain TypeScript for server-only logic. React and Next.js are not part of the frontend runtime.

## Local development

```bash
npm install
npm run dev
```

Run type/build validation with:

```bash
npm run check
npm run build
```

Sanity Studio remains a separate admin application and can be run/deployed with:

```bash
npm run sanity:dev
npm run sanity:deploy
```

See `ENVIRONMENT.md` for required environment variables.

## Migration branch

The Astro port was developed on `astro-migration`. Do not merge that branch into `main` unless explicitly instructed.
