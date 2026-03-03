import { groq } from 'next-sanity'

const POST_CARD_FIELDS = groq`
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  category,
  readingTime,
  featured,
  coverImage { asset, alt, hotspot }
`

export const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${POST_CARD_FIELDS}
  }
`

export const FEATURED_POSTS_QUERY = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    ${POST_CARD_FIELDS}
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_CARD_FIELDS},
    body
  }
`

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post"] {
    "slug": slug.current
  }
`
