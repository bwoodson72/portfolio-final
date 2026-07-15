'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  category?: string
}

export default function PaginationControls({
  currentPage,
  totalPages,
  category,
}: PaginationControlsProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (page > 1) params.append('page', String(page))
    const query = params.toString()
    return query ? `/knowledge?${query}` : '/knowledge'
  }

  const prevUrl = currentPage > 1 ? buildUrl(currentPage - 1) : null
  const nextUrl = currentPage < totalPages ? buildUrl(currentPage + 1) : null

  return (
    <div className="flex items-center justify-center gap-2">
      {prevUrl ? (
        <Link
          href={prevUrl}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-colors hover:border-border-strong hover:bg-surface-hover"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold opacity-40">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </span>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={buildUrl(page)}
            className={`h-8 w-8 rounded border flex items-center justify-center text-sm font-semibold transition-colors ${
              currentPage === page
                ? 'border-border-strong bg-surface-hover text-text'
                : 'border-border text-text-muted hover:border-border-strong hover:text-text'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {nextUrl ? (
        <Link
          href={nextUrl}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-colors hover:border-border-strong hover:bg-surface-hover"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold opacity-40">
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </div>
  )
}
