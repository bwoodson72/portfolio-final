import Link from 'next/link'
import { FEATURED_POSTS_QUERY } from '@/lib/sanity/queries'
import type { PostCard } from '@/lib/sanity/types'
import PostCardComponent from '@/components/knowledge/PostCardComponent'

export async function KnowledgeSection() {
  let posts: PostCard[] = []
  let resolveImageUrl: ((source: PostCard['coverImage']) => string | undefined) | undefined

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const { client, urlFor } = await import('@/lib/sanity/client')
    try {
      posts = await client.fetch<PostCard[]>(FEATURED_POSTS_QUERY)
      resolveImageUrl = (source) =>
        source ? urlFor(source).width(800).height(450).auto('format').url() : undefined
    } catch (err) {
      console.error('Failed to fetch featured posts:', err)
    }
  }

  if (posts.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-7xl px-6 border-t border-border pt-16 pb-24">
      {/* Header row */}
      <div className="mb-10 flex items-end justify-between">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted-2">
            Knowledge
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-4xl">
            Things worth knowing.
          </h2>
          <p className="text-sm text-text-muted">
            Practical notes on Next.js, React, and building fast sites.
          </p>
        </div>
        <Link
          href="/knowledge"
          className="shrink-0 text-sm font-semibold text-text-muted transition-colors hover:text-text"
        >
          View all →
        </Link>
      </div>

      {/* Post grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCardComponent
            key={post._id}
            post={post}
            imageUrl={resolveImageUrl?.(post.coverImage)}
          />
        ))}
      </div>
    </section>
  )
}
