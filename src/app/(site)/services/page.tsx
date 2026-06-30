import type { Metadata } from "next";
import Link from "next/link";
import { ALL_LOCATION_CARDS_QUERY, ALL_SERVICE_CARDS_QUERY } from '@/lib/sanity/queries'
import type { LocationCard, ServiceCard } from '@/lib/sanity/types';
import {ConsultButton} from "@/components/ConsultButton";


export const revalidate = 60

export const metadata: Metadata = {
    title: "Services | Brian Woodson Web Development",
    description: "Business websites, landing pages, technical SEO foundations, copywriting, and ongoing support for small businesses. Custom-scoped around your goals.",
    openGraph: {
        title: "Services | Brian Woodson Web Development",
        description: "Business websites, landing pages, technical SEO foundations, copywriting, and ongoing support for small businesses. Custom-scoped around your goals.",
        url: "/services",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Services | Brian Woodson Web Development",
        description: "Business websites, landing pages, technical SEO foundations, copywriting, and ongoing support for small businesses. Custom-scoped around your goals.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/services",
    },
};

export default async function ServicesPage() {
    let locations: LocationCard[] = []
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        try {
            const { client } = await import('@/lib/sanity/client')
            locations = await client.fetch<LocationCard[]>(ALL_LOCATION_CARDS_QUERY)
        } catch {
            locations = []
        }
    }

    let serviceCards: ServiceCard[] = []
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        try {
            const { client } = await import('@/lib/sanity/client')
            serviceCards = await client.fetch<ServiceCard[]>(ALL_SERVICE_CARDS_QUERY)
        } catch {
            serviceCards = []
        }
    }

    return (
        <main className="flex w-full flex-col items-center">

            {/* SECTION 1 — Hero */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24">
                <div className="max-w-3xl space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-6xl">
                        Website Services for Small Businesses That Want More Calls and Leads
                    </h1>
                    <p className="text-lg leading-relaxed text-text-muted">
                        Every engagement starts with understanding your business — what you do, who you serve, and what&apos;s not working. Services are scoped around your goals, not bundled into generic packages.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <ConsultButton/>

                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {serviceCards.map((service) => (
                        <div key={service._id} className="flex flex-col gap-4 rounded-lg border border-border p-8">
                            <h2 className="text-xl font-bold text-text">{service.title}</h2>
                            <p className="text-text-muted leading-relaxed">{service.shortDescription}</p>
                            <Link
                                aria-label={`Learn more about ${service.title}`}
                                href={`/services/${service.slug.current}`}
                                className="mt-auto text-sm font-semibold text-text underline underline-offset-4 hover:opacity-70 transition-opacity"
                            >
                                Learn more about {service.title} -&gt;
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4 — Process */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="space-y-4 mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
                        How an engagement works
                    </h2>
                    <p className="max-w-2xl text-lg text-text-muted">
                        Every project follows the same four-step process regardless of scope.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            step: "01",
                            title: "Review and scope",
                            body: "We look at your current site, ask questions about your business goals, and define exactly what needs to be built. You get a clear scope document before any work starts.",
                        },
                        {
                            step: "02",
                            title: "Design and write",
                            body: "Concepts and copy come first for your review. Nothing gets built until you approve the direction. This prevents expensive changes later.",
                        },
                        {
                            step: "03",
                            title: "Build and test",
                            body: "Development runs on a preview URL so you can review before anything goes live. We test across devices and browsers before launch.",
                        },
                        {
                            step: "04",
                            title: "Launch and support",
                            body: "Clean deployment with a handoff walkthrough. Your revision window starts at launch — and ongoing support keeps the site current after that.",
                        },
                    ].map(({ step, title, body }) => (
                        <div key={step} className="rounded-3xl border border-border bg-surface p-8 space-y-3">
                            <div className="text-xs font-bold uppercase tracking-widest text-text-muted">Step {step}</div>
                            <h3 className="text-lg font-bold text-text">{title}</h3>
                            <p className="text-sm leading-relaxed text-text-muted">{body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 5 — FAQ */}
            <section className="mx-auto w-full max-w-3xl px-6 py-24 border-t border-border">
                <h2 className="text-3xl font-extrabold tracking-tight text-text mb-10">
                    Common questions about working together
                </h2>
                <div className="space-y-2">
                    {[
                        {
                            q: "Do you work with businesses that don't have a website yet?",
                            a: "Yes. Business website projects include both brand new sites and replacements for outdated ones. If you're starting from scratch, that's a normal starting point.",
                        },
                        {
                            q: "Can you speed up my existing WordPress, Wix, or Squarespace site?",
                            a: "In most cases, no. That kind of work usually turns into patching around the limits of themes, plugins, or page builders. Performance is handled here as part of a new website or full replacement project, not as a tune-up service for legacy platforms.",
                        },
                        {
                            q: "What kinds of businesses do you work with?",
                            a: "Primarily small and local businesses — service companies, consultants, tradespeople, retail, and anyone who generates leads through their website. The work is a fit if you want a site that actively brings in customers, not just a digital business card.",
                        },
                        {
                            q: "Do you rebuild existing sites or only build new ones?",
                            a: "Both. If your existing site has a strong foundation, we can improve it. If it's beyond repair or built on a system that limits performance (most WordPress builds fall here), a clean rebuild typically produces better results faster.",
                        },
                        {
                            q: "Can you work from a design I already have?",
                            a: "Yes. If you have a Figma file, a reference site you like, or a style guide, we can build from that. If you don't have a design direction, we can develop one as part of the project.",
                        },
                        {
                            q: "Do you write the copy, or do I?",
                            a: "We write it. Copywriting is included in every project — we research your business, your services, and your customers, then write copy you review and approve before anything is built.",
                        },
                        {
                            q: "How does pricing work?",
                            a: "Every project is fixed-price and scoped before work begins. After a short review of your business and goals, you get a clear recommendation and a quoted price for the full scope. No hourly billing, no surprise invoices.",
                        },
                    ].map(({ q, a }) => (
                        <details
                            key={q}
                            className="group rounded-2xl border border-border bg-surface px-6 py-5"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-text">
                                {q}
                                <span className="shrink-0 text-text-muted transition group-open:rotate-45">+</span>
                            </summary>
                            <p className="mt-4 text-sm leading-relaxed text-text-muted">{a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* SECTION 6 — Service Areas */}
            {locations.length > 0 && (
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="space-y-4 mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-4xl">
                        Service Areas
                    </h2>
                    <p className="max-w-2xl text-lg text-text-muted">
                        We work with small businesses across the Fort Worth area and surrounding communities. Every project is handled remotely — no in-person meetings required.
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {locations.map(({ city, slug }) => (
                        <Link
                            key={slug}
                            href={`/locations/${slug}`}
                            className="flex flex-col rounded-2xl border border-border bg-surface p-6 space-y-2 transition hover:border-border-strong hover:-translate-y-1"
                        >
                            <h3 className="text-sm font-bold text-text">{city}</h3>
                            <span className="text-xs font-bold text-text mt-auto pt-2">
                                View {city} page →
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
            )}



        </main>
    );
}
