# Astro environment variables

The Astro migration preserves the existing production variable names wherever possible.

## Required for Sanity content

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — existing Sanity project ID. Astro also accepts `PUBLIC_SANITY_PROJECT_ID` or `SANITY_PROJECT_ID`.
- `NEXT_PUBLIC_SANITY_DATASET` — existing dataset name. Astro also accepts `PUBLIC_SANITY_DATASET` or `SANITY_DATASET`. Defaults to `production`.

## Analytics and tracking

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics measurement ID. Astro also accepts `PUBLIC_GA_MEASUREMENT_ID`.
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel ID. Astro also accepts `PUBLIC_META_PIXEL_ID` or `META_PIXEL_ID`.

## Lead forms

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile browser/site key. Astro also accepts `PUBLIC_TURNSTILE_SITE_KEY`.
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile server-side verification secret.
- `RESEND_API_KEY` — Resend API key used by lead and audit-report email endpoints.

## Website audit

- `PAGESPEED_API_KEY` — optional Google PageSpeed Insights API key. The endpoint can call PSI without it, but production should provide one for reliable quota.

## Notes

Variables prefixed `NEXT_PUBLIC_` are retained for compatibility with the current deployment while the migration is in progress. New browser-visible Astro variables should normally use the `PUBLIC_` prefix. Server secrets must never use `PUBLIC_`.
