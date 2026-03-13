import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import type { PostCard } from '@/lib/sanity/types'
import PostCardComponent from '@/components/knowledge/PostCardComponent'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Knowledge | Brian Woodson',
  description:
    'Guides on website performance, SEO, and what small businesses need to know before investing in a new site.',
  openGraph: {
    title: 'Knowledge | Brian Woodson',
    description:
      'Guides on website performance, SEO, and what small businesses need to know before investing in a new site.',
    url: '/knowledge',
    siteName: 'Brian Woodson Web Development',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brian Woodson Portfolio Preview' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge | Brian Woodson',
    description:
      'Guides on website performance, SEO, and what small businesses need to know before investing in a new site.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/knowledge',
  },
}

const CATEGORIES = [
  { label: 'Your Website', value: 'your-website' },
  { label: 'Performance', value: 'performance' },
  { label: 'Getting Found', value: 'getting-found' },
  { label: 'Cost & Value', value: 'cost' },
  { label: 'Behind the Build', value: 'process' },
]

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function KnowledgePage({ searchParams }: Props) {
  const { category } = await searchParams

  // Guard: only instantiate the Sanity client when the project ID is available.
  // During `npm run build` without env vars the client module throws at load time,
  // so we defer the import until we know the var is present.
  let posts: PostCard[] = []
  let resolveImageUrl: ((source: PostCard['coverImage']) => string | undefined) | undefined

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const { client, urlFor } = await import('@/lib/sanity/client')
    try {
      posts = await client.fetch<PostCard[]>(ALL_POSTS_QUERY)
      resolveImageUrl = (source) =>
        source ? urlFor(source).width(800).height(450).auto('format').url() : undefined
    } catch (err) {
      console.error('Failed to fetch posts:', err)
    }
  }

  const filtered = category ? posts.filter((p) => p.category === category) : posts

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-24">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Knowledge
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-6xl">
          Before you hire anyone
        </h1>
        <p className="max-w-2xl text-lg text-text-muted">
          Straight talk about your website — what it should cost, why it&#39;s slow, and what to do about it.
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          href="/knowledge"
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
            !category
              ? 'border-border-strong bg-surface-hover text-text'
              : 'border-border text-text-muted hover:border-border-strong hover:text-text'
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={`/knowledge?category=${cat.value}`}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              category === cat.value
                ? 'border-border-strong bg-surface-hover text-text'
                : 'border-border text-text-muted hover:border-border-strong hover:text-text'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Post grid / empty state */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCardComponent
              key={post._id}
              post={post}
              imageUrl={resolveImageUrl?.(post.coverImage)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
          <p className="text-lg font-semibold text-text">No posts yet</p>
          <p className="text-sm text-text-muted">
            Nothing here for this category — check back soon.
          </p>
        </div>
      )}
    </main>
  )
}
