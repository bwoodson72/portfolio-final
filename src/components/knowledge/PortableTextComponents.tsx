import type { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'

// Build a Sanity CDN URL directly from an asset _ref, avoiding a module-level
// import of @/lib/sanity/client (which calls createClient() at module load time
// and throws when env vars aren't present during build).
// Ref format: "image-{id}-{widthxheight}-{format}"
function assetUrl(ref: string): string {
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/)
  if (!match) return ''
  const [, id, dimensions, format] = match
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-8 text-(--color-text-muted)">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 mb-5 border-b border-(--color-border) pb-3 text-2xl font-extrabold text-(--color-text)">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 text-xl font-bold text-(--color-text)">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-3 text-base font-bold text-(--color-text)">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-(--color-border-strong) pl-6 italic text-lg text-(--color-text-muted)">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-(--color-text)">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md border border-(--color-border) bg-(--color-surface-hover) px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="underline underline-offset-4 transition-colors hover:text-white"
      >
        {children}
      </a>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-(--color-text-muted) marker:text-(--color-text-muted-2)">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-(--color-text-muted) marker:text-(--color-text-muted-2)">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="text-base leading-7">{children}</li>,
    number: ({ children }) => <li className="text-base leading-7">{children}</li>,
  },

  types: {
    bodyImage: ({ value }) => {
      const ref = value?.asset?._ref
      if (!ref) return null
      const src = assetUrl(ref)
      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-xl border border-(--color-border)">
            {/* unoptimized: Sanity CDN domain isn't in next.config remotePatterns */}
            <Image
              src={src}
              alt={value?.alt ?? ''}
              width={1200}
              height={675}
              className="w-full"
              unoptimized
            />
          </div>
          {value?.caption && (
            <figcaption className="mt-3 text-center text-xs italic text-(--color-text-muted-2)">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    codeBlock: ({ value }) => {
      const { language, code, filename } = value ?? {}
      return (
        <div className="my-8 overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)">
          <div className="flex items-center justify-between border-b border-(--color-border) px-4 py-2.5">
            <span className="text-xs text-(--color-text-muted-2)">{filename ?? 'Code'}</span>
            {language && (
              <span className="rounded border border-(--color-border) px-2 py-0.5 font-mono text-[10px] text-(--color-text-muted-2)">
                {language}
              </span>
            )}
          </div>
          <pre className="overflow-x-auto p-5">
            <code className="font-mono text-sm leading-7 text-(--color-text-muted)">{code}</code>
          </pre>
        </div>
      )
    },

    callout: ({ value }) => {
      const { type, text } = value ?? {}
      const variants = {
        tip: {
          icon: '💡',
          label: 'Tip',
          border: 'border-emerald-800/50',
          bg: 'bg-emerald-950/40',
          labelColor: 'text-emerald-400',
        },
        warning: {
          icon: '⚠️',
          label: 'Warning',
          border: 'border-amber-800/50',
          bg: 'bg-amber-950/40',
          labelColor: 'text-amber-400',
        },
        info: {
          icon: 'ℹ️',
          label: 'Info',
          border: 'border-sky-800/50',
          bg: 'bg-sky-950/40',
          labelColor: 'text-sky-400',
        },
      }
      const config = variants[type as keyof typeof variants] ?? variants.info
      return (
        <div className={`my-8 rounded-xl border p-5 ${config.border} ${config.bg}`}>
          <div className={`mb-2 flex items-center gap-2 text-sm font-bold ${config.labelColor}`}>
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </div>
          <p className="text-sm leading-7 text-(--color-text-muted)">{text}</p>
        </div>
      )
    },
  },
}
