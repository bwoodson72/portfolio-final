import type { MetadataRoute } from 'next'
import { ALL_POST_SLUGS_WITH_DATES_QUERY, ALL_PROJECT_SLUGS_WITH_DATES_QUERY, ALL_LOCATION_PAGE_SLUGS_WITH_DATES_QUERY } from '@/lib/sanity/queries'

const BASE = 'https://brianwoodson.dev'

type SanitySlugWithDates = {
  slug: string
  publishedAt: string
  _updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,          changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/work`,      changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/knowledge`, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,     changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/faq`,       changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/contact`,   changeFrequency: 'yearly',  priority: 0.6 },
  ]

  let workRoutes: MetadataRoute.Sitemap = []
  let knowledgeRoutes: MetadataRoute.Sitemap = []
  let locationRoutes: MetadataRoute.Sitemap = []
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const { client } = await import('@/lib/sanity/client')
    const [projectSlugs, postSlugs, locationSlugs] = await Promise.all([
      client.fetch<SanitySlugWithDates[]>(ALL_PROJECT_SLUGS_WITH_DATES_QUERY),
      client.fetch<SanitySlugWithDates[]>(ALL_POST_SLUGS_WITH_DATES_QUERY),
      client.fetch<SanitySlugWithDates[]>(ALL_LOCATION_PAGE_SLUGS_WITH_DATES_QUERY),
    ])
    workRoutes = projectSlugs.map(({ slug, publishedAt, _updatedAt }) => ({
      url: `${BASE}/work/${slug}`,
      lastModified: new Date(_updatedAt ?? publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    knowledgeRoutes = postSlugs.map(({ slug, publishedAt, _updatedAt }) => ({
      url: `${BASE}/knowledge/${slug}`,
      lastModified: new Date(_updatedAt ?? publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
    locationRoutes = locationSlugs.map(({ slug, publishedAt, _updatedAt }) => ({
      url: `${BASE}/locations/${slug}`,
      lastModified: new Date(_updatedAt ?? publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  }

  return [...staticRoutes, ...workRoutes, ...knowledgeRoutes, ...locationRoutes]
}
