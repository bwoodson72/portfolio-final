import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  LOCATION_PAGE_BY_SLUG_QUERY,
  ALL_LOCATION_PAGE_SLUGS_QUERY,
} from '@/lib/sanity/queries'
import type { LocationPage } from '@/lib/sanity/types'
import {ConsultButton} from "@/components/ConsultButton";

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const slugs = await client.fetch<{ slug: string }[]>(ALL_LOCATION_PAGE_SLUGS_QUERY)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return {}
  try {
    const { client } = await import('@/lib/sanity/client')
    const page = await client.fetch<LocationPage | null>(LOCATION_PAGE_BY_SLUG_QUERY, { slug })
    if (!page) return {}
    return {
      title: `${page.headline} | Brian Woodson Web Development`,
      description: page.metaDescription,
      alternates: {
        canonical: `/locations/${slug}`,
      },
      openGraph: {
        title: `${page.headline} | Brian Woodson Web Development`,
        description: page.metaDescription,
        url: `/locations/${slug}`,
        siteName: 'Brian Woodson Web Development',
        locale: 'en_US',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brian Woodson Web Development' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${page.headline} | Brian Woodson Web Development`,
        description: page.metaDescription,
        images: ['/og-image.png'],
      },
    }
  } catch {
    return {}
  }
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound()

  const { client } = await import('@/lib/sanity/client')
  let page: LocationPage | null = null
  try {
    page = await client.fetch<LocationPage | null>(LOCATION_PAGE_BY_SLUG_QUERY, { slug })
  } catch {
    notFound()
  }

  if (!page) notFound()

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://brianwoodson.dev',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `Web Design ${page.city}`,
            item: `https://brianwoodson.dev/locations/${slug}`,
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        name: 'Brian Woodson Web Development',
        url: 'https://brianwoodson.dev',
        telephone: '+18177764893',
        address: {
          '@type': 'PostalAddress',
          addressLocality: page.city,
          addressRegion: 'TX',
          addressCountry: 'US',
        },
        areaServed: page.areaServed.map((area) => ({
          '@type': 'City',
          name: area,
        })),
        knowsAbout: ['Web Design', 'Web Development', 'SEO', 'Copywriting', 'Small Business Websites'],
      },
      ...(page.faqs?.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: page.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <main className="flex w-full flex-col items-center">

      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-6xl">
            {page.headline}
          </h1>
          {page.subheadline && (
            <p className="text-xl leading-relaxed text-text-muted">
              {page.subheadline}
            </p>
          )}
          <div className="flex flex-col gap-4 sm:flex-row">
           <ConsultButton/>

          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">
            {page.bodyIntro}
          </p>
        </div>
      </section>

      {/* Market context */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
              The {page.city} business landscape
            </h2>
            <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">
              {page.marketContext}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Businesses we work with in {page.city}
            </h3>
            <ul className="space-y-2">
              {page.localBusinessTypes.map((type) => (
                <li key={type} className="flex gap-2 text-sm text-text-muted">
                  <span className="font-bold text-text shrink-0">→</span>
                  {type}
                </li>
              ))}
            </ul>
            {page.nearbyAreas && page.nearbyAreas.length > 0 && (
              <div className="pt-6 border-t border-border space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  Also serving
                </h3>
                <p className="text-sm text-text-muted">
                  {page.nearbyAreas.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services note */}
      {page.servicesNote && (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
              What we build for {page.city} businesses
            </h2>
            <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">
              {page.servicesNote}
            </p>
            <Link
              href="/services"
              className="inline-block text-sm font-bold text-text hover:underline underline-offset-4"
            >
              View all services →
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-6 py-24 border-t border-border">
          <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl mb-10">
            Common questions from {page.city} businesses
          </h2>
          <ul className="space-y-3">
            {page.faqs.map((faq) => (
              <li key={faq.question}>
                <details className="group rounded-2xl border border-border bg-surface open:border-border-strong">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-text marker:content-none list-none select-none">
                    {faq.question}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-text-muted transition-transform group-open:rotate-180"
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="border-t border-border px-6 py-5">
                    <p className="text-sm leading-relaxed text-text-muted whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}

      

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

    </main>
  )
}
