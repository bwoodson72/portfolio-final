import type { PortableTextBlock } from '@portabletext/types'

export interface PostCard {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  category: string
  readingTime: number
  featured: boolean
  coverImage?: {
    asset: { _ref: string }
    alt: string
    hotspot?: { x: number; y: number }
  }
}

export interface Post extends PostCard {
  body: PortableTextBlock[]
}
