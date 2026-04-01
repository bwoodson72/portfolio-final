import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/audit', '/lp'],
    },
    sitemap: 'https://brianwoodson.dev/sitemap.xml',
  }
}
