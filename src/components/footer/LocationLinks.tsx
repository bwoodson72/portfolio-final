import Link from 'next/link'
import { ALL_LOCATION_CARDS_QUERY } from '@/lib/sanity/queries'
import type { LocationCard } from '@/lib/sanity/types'

export async function LocationLinks() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null

  let locations: LocationCard[] = []
  try {
    const { client } = await import('@/lib/sanity/client')
    locations = await client.fetch<LocationCard[]>(ALL_LOCATION_CARDS_QUERY)
  } catch {
    return null
  }

  if (locations.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-text">Locations</h3>
      <ul className="space-y-2 text-sm text-text-muted">
        {locations.map(({ slug, city }) => (
          <li key={slug}>
            <Link
              href={`/locations/${slug}`}
              className="hover:text-text transition-colors"
            >
              {city}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
