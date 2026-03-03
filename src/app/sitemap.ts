import type { MetadataRoute } from 'next'
import { ALL_POST_SLUGS_QUERY, ALL_PROJECT_SLUGS_QUERY } from '@/lib/sanity/queries'

const BASE = 'https://brianwoodson.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,          lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/work`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/knowledge`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/faq`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/contact`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
  ]

  let workRoutes: MetadataRoute.Sitemap = []
  let knowledgeRoutes: MetadataRoute.Sitemap = []
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const { client } = await import('@/lib/sanity/client')
    const [projectSlugs, postSlugs] = await Promise.all([
      client.fetch<{ slug: string }[]>(ALL_PROJECT_SLUGS_QUERY),
      client.fetch<{ slug: string }[]>(ALL_POST_SLUGS_QUERY),
    ])
    workRoutes = projectSlugs.map(({ slug }) => ({
      url: `${BASE}/work/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
    knowledgeRoutes = postSlugs.map(({ slug }) => ({
      url: `${BASE}/knowledge/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  }

  return [...staticRoutes, ...workRoutes, ...knowledgeRoutes]
}
