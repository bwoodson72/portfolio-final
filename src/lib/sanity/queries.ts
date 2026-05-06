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
    body[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          ...,
          reference-> {
            "slug": slug.current,
            title
          }
        }
      }
    },
    _updatedAt
  }
`

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post"] {
    "slug": slug.current
  }
`

const PROJECT_CARD_FIELDS = groq`
  _id,
  title,
  slug,
  tagline,
  role,
  stack,
  featured,
  sortOrder,
  highlightQuote,
  coverImage { asset, alt, hotspot }
`

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(coalesce(sortOrder, 999) asc, publishedAt desc) {
    ${PROJECT_CARD_FIELDS}
  }
`

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(coalesce(sortOrder, 999) asc, publishedAt desc)[0...3] {
    ${PROJECT_CARD_FIELDS}
  }
`

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_CARD_FIELDS},
    timeline,
    problem,
    solution,
    deliverables,
    outcome,
    screenshots[] { asset, alt, hotspot },
    liveUrl,
    loomUrl,
    publishedAt,
    _updatedAt
  }
`

export const ALL_PROJECT_SLUGS_QUERY = groq`
  *[_type == "project"] {
    "slug": slug.current
  }
`

export const ALL_POST_SLUGS_WITH_DATES_QUERY = groq`
  *[_type == "post"] {
    "slug": slug.current,
    publishedAt,
    "_updatedAt": _updatedAt
  }
`

export const ALL_PROJECT_SLUGS_WITH_DATES_QUERY = groq`
  *[_type == "project"] {
    "slug": slug.current,
    publishedAt,
    "_updatedAt": _updatedAt
  }
`

export const ALL_LANDING_PAGE_SLUGS_QUERY = groq`
  *[_type == "landingPage"] {
    "slug": slug.current
  }
`

export const LANDING_PAGE_BY_SLUG_QUERY = groq`
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    campaignTag,
    headline,
    subheadline,
    problemHeading,
    problemBody,
    proofHeading,
    proofBody,
    offerHeading,
    offerBody,
    formHeading,
    ctaCopy,
    faqs[] { question, answer },
    finalCtaHeading,
    finalCtaCopy,
    gadsConversionId,
    gadsConversionLabel
  }
`

export const ALL_LOCATION_PAGE_SLUGS_QUERY = groq`
  *[_type == "locationPage"] {
    "slug": slug.current
  }
`

export const ALL_LOCATION_PAGE_SLUGS_WITH_DATES_QUERY = groq`
  *[_type == "locationPage"] {
    "slug": slug.current,
    publishedAt,
    "_updatedAt": _updatedAt
  }
`

export const ALL_LOCATION_CARDS_QUERY = groq`
  *[_type == "locationPage"] | order(city asc) {
    "slug": slug.current,
    city
  }
`

export const LOCATION_PAGE_BY_SLUG_QUERY = groq`
  *[_type == "locationPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    city,
    state,
    nearbyAreas,
    metaDescription,
    headline,
    subheadline,
    bodyIntro,
    marketContext,
    localBusinessTypes,
    servicesNote,
    faqs[] { question, answer },
    areaServed,
    _updatedAt
  }
`
