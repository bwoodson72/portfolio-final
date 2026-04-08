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
  _updatedAt?: string
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
  highlightQuote?: string
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
  outcome?: string[]
  screenshots: {
    asset: { _ref: string }
    alt: string
    hotspot?: { x: number; y: number }
  }[]
  liveUrl?: string
  loomUrl?: string
  publishedAt: string
  _updatedAt?: string
}

export interface LandingPage {
  _id: string
  title: string
  slug: { current: string }
  campaignTag: string
  headline: string
  subheadline?: string
  problemHeading?: string
  problemBody?: string
  proofHeading?: string
  proofBody?: string
  offerHeading?: string
  offerBody?: string
  formHeading?: string
  ctaCopy?: string
  faqs?: { question: string; answer: string }[]
  finalCtaHeading?: string
  finalCtaCopy?: string
  gadsConversionId?: string
  gadsConversionLabel?: string
}

export interface LocationPage {
  _id: string
  title: string
  slug: { current: string }
  city: string
  state: string
  nearbyAreas?: string[]
  metaDescription: string
  headline: string
  subheadline?: string
  bodyIntro: string
  marketContext: string
  localBusinessTypes: string[]
  servicesNote?: string
  faqs: { question: string; answer: string }[]
  areaServed: string[]
  publishedAt?: string
  _updatedAt?: string
}
