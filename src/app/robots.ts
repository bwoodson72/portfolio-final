import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/audit'],
    },
    sitemap: 'https://brianwoodson.dev/sitemap.xml',
  }
}
