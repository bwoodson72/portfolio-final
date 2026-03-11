import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ALL_POST_SLUGS_QUERY, POST_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'
import PostBody from '@/components/knowledge/PostBody'
import ShareButtons from '@/components/ShareButtons'

export const revalidate = 3600

const CATEGORY_LABELS: Record<string, string> = {
  'your-website': 'Your Website',
  performance: 'Performance',
  'getting-found': 'Getting Found',
  cost: 'Cost & Value',
  process: 'Behind the Build',
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const slugs = await client.fetch<{ slug: string }[]>(ALL_POST_SLUGS_QUERY)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return {}
  try {
    const { client, urlFor } = await import('@/lib/sanity/client')
    const post = await client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug })
    if (!post) return {}

    const ogImage = post.coverImage
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : '/og-image.png'
    const title = `${post.title} | Brian Woodson`

    return {
      title,
      description: post.excerpt,
      alternates: {
        canonical: `/knowledge/${slug}`,
      },
      openGraph: {
        type: 'article',
        title,
        description: post.excerpt,
        url: `/knowledge/${slug}`,
        publishedTime: post.publishedAt,
        images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: post.excerpt,
        images: [ogImage],
      },
    }
  } catch {
    return {}
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound()

  const { client, urlFor } = await import('@/lib/sanity/client')
  let post: Post | null = null
  try {
    post = await client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug })
  } catch {
    notFound()
  }

  if (!post) notFound()

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(675).auto('format').url()
    : undefined

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      {/* Back link */}
      <Link
        href="/knowledge"
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
      >
        ← Knowledge
      </Link>

      {/* Article header */}
      <header className="mb-14 space-y-6">
        {/* Category badge + reading time */}
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
          <span className="text-[10px] text-text-muted-2">
            {post.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-text md:text-5xl">
          {post.title}
        </h1>

        {/* Lead / excerpt */}
        <p className="text-xl text-text-muted">{post.excerpt}</p>

        {/* Date — separated by a top border */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <time className="text-sm text-text-muted-2" dateTime={post.publishedAt}>
              {formattedDate}
            </time>
            <ShareButtons title={post.title} slug={slug} type="knowledge" />
          </div>
        </div>
      </header>

      {/* Cover image */}
      {coverImageUrl && (
        <div className="relative mb-14 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={coverImageUrl}
            alt={post.coverImage?.alt ?? post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Body */}
      <article>
        <PostBody value={post.body} />
      </article>

      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: { '@type': 'Person', name: 'Brian Woodson', url: 'https://brianwoodson.dev' },
            publisher: { '@type': 'Person', name: 'Brian Woodson', url: 'https://brianwoodson.dev' },
            mainEntityOfPage: `https://brianwoodson.dev/knowledge/${slug}`,
            ...(coverImageUrl ? { image: coverImageUrl } : {}),
          }),
        }}
      />

      {/* Footer CTA */}
      <div className="mt-20 space-y-6 rounded-2xl border border-border bg-surface p-12 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
          This could be your site
        </h2>
        <p className="mx-auto max-w-md text-text-muted">
          If this sparked an idea for your project, I&apos;d love to hear about it.
        </p>
        <Link
          href="/contact"
          className="inline-flex rounded-full bg-text px-8 py-4 text-sm font-bold text-bg transition hover:opacity-90"
        >
          Get in touch
        </Link>
      </div>
    </main>
  )
}
