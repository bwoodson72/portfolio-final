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

export interface ProjectCard {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  role?: string
  stack: string[]
  featured: boolean
  sortOrder?: number
  coverImage?: {
    asset: { _ref: string }
    alt: string
    hotspot?: { x: number; y: number }
  }
}

export interface Project extends ProjectCard {
  timeline?: string
  problem: string[]
  solution: string[]
  deliverables: string[]
  screenshots: {
    asset: { _ref: string }
    alt: string
    hotspot?: { x: number; y: number }
  }[]
  liveUrl?: string
  loomUrl?: string
  publishedAt: string
}
