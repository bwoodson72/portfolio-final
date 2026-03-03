import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ALL_POST_SLUGS_QUERY, POST_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'
import PostBody from '@/components/knowledge/PostBody'

export const revalidate = 3600

const CATEGORY_LABELS: Record<string, string> = {
  nextjs: 'Next.js',
  react: 'React',
  performance: 'Performance',
  design: 'Design',
  business: 'Business',
  tooling: 'Tooling',
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
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text)"
      >
        ← Knowledge
      </Link>

      {/* Article header */}
      <header className="mb-14 space-y-6">
        {/* Category badge + reading time */}
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-(--color-border) px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-(--color-text-muted)">
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
          <span className="text-[10px] text-(--color-text-muted-2)">
            {post.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-(--color-text) md:text-5xl">
          {post.title}
        </h1>

        {/* Lead / excerpt */}
        <p className="text-xl text-(--color-text-muted)">{post.excerpt}</p>

        {/* Date — separated by a top border */}
        <div className="border-t border-(--color-border) pt-4">
          <time className="text-sm text-(--color-text-muted-2)" dateTime={post.publishedAt}>
            {formattedDate}
          </time>
        </div>
      </header>

      {/* Cover image */}
      {coverImageUrl && (
        <div className="relative mb-14 aspect-video w-full overflow-hidden rounded-2xl border border-(--color-border)">
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

      {/* Footer CTA */}
      <div className="mt-20 space-y-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-12 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-(--color-text) md:text-3xl">
          Let&apos;s build something together.
        </h2>
        <p className="mx-auto max-w-md text-(--color-text-muted)">
          If this sparked an idea for your project, I&apos;d love to hear about it.
        </p>
        <Link
          href="/contact"
          className="inline-flex rounded-full bg-(--color-text) px-8 py-4 text-sm font-bold text-(--color-bg) transition hover:opacity-90"
        >
          Get in touch
        </Link>
      </div>
    </main>
  )
}
