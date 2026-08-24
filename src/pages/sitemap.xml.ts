import type { APIRoute } from 'astro';
import { client } from '@/lib/sanity/astro-client';
import {
  ALL_POST_SLUGS_WITH_DATES_QUERY,
  ALL_PROJECT_SLUGS_WITH_DATES_QUERY,
  ALL_LOCATION_PAGE_SLUGS_WITH_DATES_QUERY,
  ALL_SERVICE_PAGE_SLUGS_WITH_DATES_QUERY,
} from '@/lib/sanity/queries';

export const prerender = false;

const BASE = 'https://brianwoodson.dev';

type Entry = { url: string; lastModified?: string; changeFrequency?: string; priority?: number };
type SanitySlugWithDates = { slug: string; publishedAt: string | null; _updatedAt: string };
type SlugWithDate = { slug: string; _updatedAt: string };

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const entries: Entry[] = [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/knowledge`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/faq`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.6 },
  ];

  if (client) {
    try {
      const [projectSlugs, postSlugs, locationSlugs, serviceSlugs] = await Promise.all([
        client.fetch<SanitySlugWithDates[]>(ALL_PROJECT_SLUGS_WITH_DATES_QUERY),
        client.fetch<SanitySlugWithDates[]>(ALL_POST_SLUGS_WITH_DATES_QUERY),
        client.fetch<SlugWithDate[]>(ALL_LOCATION_PAGE_SLUGS_WITH_DATES_QUERY),
        client.fetch<SlugWithDate[]>(ALL_SERVICE_PAGE_SLUGS_WITH_DATES_QUERY),
      ]);

      entries.push(
        ...projectSlugs.map(({ slug, publishedAt, _updatedAt }) => ({ url: `${BASE}/work/${slug}`, lastModified: _updatedAt ?? publishedAt ?? undefined, changeFrequency: 'monthly', priority: 0.7 })),
        ...postSlugs.map(({ slug, publishedAt, _updatedAt }) => ({ url: `${BASE}/knowledge/${slug}`, lastModified: _updatedAt ?? publishedAt ?? undefined, changeFrequency: 'weekly', priority: 0.7 })),
        ...locationSlugs.map(({ slug, _updatedAt }) => ({ url: `${BASE}/locations/${slug}`, lastModified: _updatedAt, changeFrequency: 'monthly', priority: 0.8 })),
        ...serviceSlugs.map(({ slug, _updatedAt }) => ({ url: `${BASE}/services/${slug}`, lastModified: _updatedAt, changeFrequency: 'monthly', priority: 0.8 })),
      );
    } catch {
      // Return static routes if Sanity is unavailable.
    }
  }

  const body = entries.map((entry) => `  <url>\n    <loc>${xmlEscape(entry.url)}</loc>${entry.lastModified ? `\n    <lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>` : ''}${entry.changeFrequency ? `\n    <changefreq>${entry.changeFrequency}</changefreq>` : ''}${entry.priority !== undefined ? `\n    <priority>${entry.priority.toFixed(1)}</priority>` : ''}\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
