import Link from 'next/link'
import Image from 'next/image'
import type { PostCard } from '@/lib/sanity/types'

const CATEGORY_LABELS: Record<string, string> = {
  nextjs: 'Next.js',
  react: 'React',
  performance: 'Performance',
  design: 'Design',
  business: 'Business',
  tooling: 'Tooling',
}

interface Props {
  post: PostCard
  variant?: 'default' | 'featured'
  imageUrl?: string
}

export default function PostCardComponent({ post, variant = 'default', imageUrl }: Props) {
  const { title, slug, excerpt, publishedAt, category, readingTime } = post
  const isFeatured = variant === 'featured'

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Link
      href={`/knowledge/${slug.current}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-200 hover:border-border-strong hover:-translate-y-1"
    >
      {/* Cover image */}
      <div className="relative aspect-video w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-surface-hover to-bg" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Badge + reading time */}
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
            {CATEGORY_LABELS[category] ?? category}
          </span>
          <span className="text-[10px] text-text-muted-2">{readingTime} min read</span>
        </div>

        {/* Title */}
        <h2
          className={`font-extrabold leading-snug text-text ${
            isFeatured ? 'text-2xl' : 'text-lg'
          }`}
        >
          {title}
        </h2>

        {/* Excerpt */}
        <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-text-muted-2">{formattedDate}</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-text-muted transition-transform duration-200 group-hover:translate-x-1">
            Read
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
