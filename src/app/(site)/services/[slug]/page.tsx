import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICE_PAGE_BY_SLUG_QUERY, ALL_SERVICE_PAGE_SLUGS_QUERY } from '@/lib/sanity/queries'
import type { ServicePage } from '@/lib/sanity/types'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const slugs = await client.fetch<{ slug: string }[]>(ALL_SERVICE_PAGE_SLUGS_QUERY)
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
    const page = await client.fetch<ServicePage | null>(SERVICE_PAGE_BY_SLUG_QUERY, { slug })
    if (!page) return {}
    const title = page.metaTitle ?? `${page.title} | Brian Woodson Web Development`
    const description = page.metaDescription ?? page.shortDescription
    return {
      title,
      description,
      alternates: {
        canonical: `https://brianwoodson.dev/services/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://brianwoodson.dev/services/${slug}`,
        siteName: 'Brian Woodson Web Development',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brian Woodson Web Development' }],
      },
      robots: { index: true, follow: true },
    }
  } catch {
    return {}
  }
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound()

  const { client } = await import('@/lib/sanity/client')
  let page: ServicePage | null = null
  try {
    page = await client.fetch<ServicePage | null>(SERVICE_PAGE_BY_SLUG_QUERY, { slug })
  } catch {
    notFound()
  }

  if (!page) notFound()

  const canonicalUrl = `https://brianwoodson.dev/services/${slug}`

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
            name: 'Services',
            item: 'https://brianwoodson.dev/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: page.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Service',
        name: page.title,
        description: page.metaDescription ?? page.shortDescription,
        provider: {
          '@type': 'Organization',
          name: 'Brian Woodson Web Development',
          url: 'https://brianwoodson.dev',
        },
        areaServed: 'United States',
        serviceType: page.eyebrow ?? page.title,
        url: canonicalUrl,
      },
      {
        '@type': 'WebPage',
        name: page.metaTitle ?? page.title,
        description: page.metaDescription,
        url: canonicalUrl,
        isPartOf: { '@type': 'WebSite', url: 'https://brianwoodson.dev' },
      },
      ...(page.faqs && page.faqs.length > 0
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
          {page.eyebrow && (
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              {page.eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-6xl">
            {page.heroHeadline}
          </h1>
          {page.heroSubheadline && (
            <p className="text-xl leading-relaxed text-text-muted">
              {page.heroSubheadline}
            </p>
          )}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
            >
              Start a conversation
            </Link>
            <Link
              href="/#audit"
              className="rounded-full border border-border px-8 py-3 text-sm font-bold text-text transition hover:border-border-strong"
            >
              Get a free site review
            </Link>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
            Who this is for
          </h2>
          <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">
            {page.whoThisIsFor}
          </p>
        </div>
      </section>

      {/* Problems solved */}
      {page.problemsSolved && page.problemsSolved.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
              Problems this solves
            </h2>
            <ul className="space-y-2">
              {page.problemsSolved.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-text-muted">
                  <span className="font-bold text-text shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* What's included + Business benefits */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
              What&apos;s included
            </h2>
            <ul className="space-y-2">
              {page.includedItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-text-muted">
                  <span className="font-bold text-text shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
              Why it matters
            </h2>
            <ul className="space-y-2">
              {page.businessBenefits.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-text-muted">
                  <span className="font-bold text-text shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Not for */}
      {page.notFor && (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
              This service is not for
            </h2>
            <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">
              {page.notFor}
            </p>
          </div>
        </section>
      )}

      {/* FAQs */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-6 py-24 border-t border-border">
          <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl mb-10">
            Common questions
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

      {/* Related services */}
      {page.relatedServices && page.relatedServices.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
          <div className="space-y-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
              Related services
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {page.relatedServices.map((service) => (
                <div key={service._id} className="flex flex-col gap-4 rounded-lg border border-border p-8">
                  <h3 className="text-xl font-bold text-text">{service.title}</h3>
                  <p className="text-text-muted leading-relaxed">{service.shortDescription}</p>
                  <Link
                    href={`/services/${service.slug.current}`}
                    className="mt-auto text-sm font-semibold text-text underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    View service
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
        <div className="rounded-3xl border border-border bg-surface p-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-4xl">
            Ready to talk?
          </h2>
          <p className="mx-auto max-w-xl text-lg text-text-muted">
            Tell us about your business and what isn&apos;t working. We&apos;ll reply within one business day.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
            >
              Start a conversation
            </Link>
            <Link
              href="/#audit"
              className="rounded-full border border-border px-8 py-3 text-sm font-bold text-text transition hover:border-border-strong"
            >
              Get a free site review
            </Link>
          </div>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

    </main>
  )
}
