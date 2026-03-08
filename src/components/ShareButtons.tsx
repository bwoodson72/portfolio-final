'use client'

import { useState } from 'react'

type ShareButtonsProps = {
  title: string
  slug: string
  type: 'knowledge' | 'work'
}

export default function ShareButtons({ title, slug, type }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const url = `https://brianwoodson.dev/${type}/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-widest text-text-muted-2">Share</span>

      <div className="flex items-center gap-2">
        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted transition hover:border-border-strong hover:text-text"
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-400">
                <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Copy Link
            </>
          )}
        </button>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted transition hover:border-border-strong hover:text-text"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3.5 2A1.5 1.5 0 1 0 3.5 5 1.5 1.5 0 0 0 3.5 2zM2.5 6h2v8h-2V6zm4 0h1.9v1.1h.03C8.77 6.6 9.6 6 10.75 6 12.9 6 13.5 7.4 13.5 9.24V14h-2v-4.4c0-.75-.01-1.71-1.04-1.71-1.05 0-1.21.82-1.21 1.66V14h-2V6z" />
          </svg>
          LinkedIn
        </a>

        {/* X (Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted transition hover:border-border-strong hover:text-text"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.6 2h2.1L9.9 7.3 15.5 14h-3.9l-3.4-4.5L4.3 14H2.2l5.1-5.7L2 2h4l3.1 4.1L12.6 2zm-.7 10.8h1.2L4.2 3.2H2.9l9 9.6z" />
          </svg>
          X
        </a>
      </div>
    </div>
  )
}
