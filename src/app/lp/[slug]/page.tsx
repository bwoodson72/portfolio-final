import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LANDING_PAGE_BY_SLUG_QUERY, ALL_LANDING_PAGE_SLUGS_QUERY } from '@/lib/sanity/queries'
import type { LandingPage } from '@/lib/sanity/types'
import { LandingPageForm } from '@/components/lp/LandingPageForm'

type Props = {
    params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
    try {
        const { client } = await import('@/lib/sanity/client')
        const slugs = await client.fetch<{ slug: string }[]>(ALL_LANDING_PAGE_SLUGS_QUERY)
        return slugs.map(({ slug }) => ({ slug }))
    } catch {
        return []
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata(_props: Props): Promise<Metadata> {
    return {
        robots: { index: false, follow: false },
        title: 'Brian Woodson Web Development',
    }
}

export default async function LandingPageRoute({ params }: Props) {
    const { slug } = await params

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) notFound()

    const { client } = await import('@/lib/sanity/client')
    let page: LandingPage | null = null
    try {
        page = await client.fetch<LandingPage | null>(LANDING_PAGE_BY_SLUG_QUERY, { slug })
    } catch {
        notFound()
    }

    if (!page) notFound()

    return (
        <div className="min-h-screen bg-bg text-text">

            {/* Hero */}
            <section className="mx-auto max-w-3xl px-6 py-20 text-center space-y-6">
                <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl leading-tight">
                    {page.headline}
                </h1>
                {page.subheadline && (
                    <p className="text-xl text-text-muted max-w-2xl mx-auto">
                        {page.subheadline}
                    </p>
                )}
                <a
                    href="#lead-form"
                    className="inline-flex rounded-full bg-text px-8 py-4 text-sm font-bold text-bg transition hover:opacity-90"
                >
                    {page.ctaCopy ?? 'Get a free site review'}
                </a>
            </section>

            {/* Problem / Stakes */}
            {(page.problemHeading || page.problemBody) && (
                <section className="bg-surface border-y border-border">
                    <div className="mx-auto max-w-3xl px-6 py-16 space-y-4">
                        {page.problemHeading && (
                            <h2 className="text-2xl font-extrabold tracking-tight">
                                {page.problemHeading}
                            </h2>
                        )}
                        {page.problemBody && (
                            <p className="text-text-muted leading-relaxed whitespace-pre-line">
                                {page.problemBody}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Proof / Credibility */}
            {(page.proofHeading || page.proofBody) && (
                <section className="mx-auto max-w-3xl px-6 py-16 space-y-4">
                    {page.proofHeading && (
                        <h2 className="text-2xl font-extrabold tracking-tight">
                            {page.proofHeading}
                        </h2>
                    )}
                    {page.proofBody && (
                        <p className="text-text-muted leading-relaxed whitespace-pre-line">
                            {page.proofBody}
                        </p>
                    )}
                </section>
            )}

            {/* Offer */}
            {(page.offerHeading || page.offerBody) && (
                <section className="bg-surface border-y border-border">
                    <div className="mx-auto max-w-3xl px-6 py-16 space-y-4">
                        {page.offerHeading && (
                            <h2 className="text-2xl font-extrabold tracking-tight">
                                {page.offerHeading}
                            </h2>
                        )}
                        {page.offerBody && (
                            <p className="text-text-muted leading-relaxed whitespace-pre-line">
                                {page.offerBody}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Lead Form */}
            <section id="lead-form" className="mx-auto max-w-2xl px-6 py-16">
                <LandingPageForm
                    heading={page.formHeading}
                    ctaCopy={page.ctaCopy}
                    campaignTag={page.campaignTag}
                />
            </section>

            {/* FAQ */}
            {page.faqs && page.faqs.length > 0 && (
                <section className="bg-surface border-y border-border">
                    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
                        <h2 className="text-2xl font-extrabold tracking-tight">Common questions</h2>
                        <ul className="space-y-3">
                            {page.faqs.map((faq, idx) => (
                                <li key={idx}>
                                    <details className="group rounded-2xl border border-border bg-bg open:border-border-strong">
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
                    </div>
                </section>
            )}

            {/* Final CTA */}
            {(page.finalCtaHeading || page.finalCtaCopy) && (
                <section className="mx-auto max-w-3xl px-6 py-20 text-center space-y-6">
                    {page.finalCtaHeading && (
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            {page.finalCtaHeading}
                        </h2>
                    )}
                    <a
                        href="#lead-form"
                        className="inline-flex rounded-full bg-text px-8 py-4 text-sm font-bold text-bg transition hover:opacity-90"
                    >
                        {page.finalCtaCopy ?? 'Request a free review'}
                    </a>
                </section>
            )}

            {/* Minimal footer — no nav links, no sitemap exposure */}
            <footer className="border-t border-border py-8 text-center">
                <p className="text-xs text-text-muted">
                    &copy; {new Date().getFullYear()} Brian Woodson Web Development
                </p>
            </footer>
        </div>
    )
}
