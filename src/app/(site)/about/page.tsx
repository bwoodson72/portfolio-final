import { Metadata } from "next";
import Image from "next/image";

import { siteContent } from "@/content/portfolio";

import {ConsultButton} from "@/components/ConsultButton";

export const metadata: Metadata = {
    title: "About | Web Designer and Local SEO Specialist | Brian Woodson Web Development",
    description: "Brian Woodson Web Development builds custom websites and manages local SEO for small businesses in the DFW area. Custom code, no WordPress, 95+ Lighthouse scores.",
    openGraph: {
        title: "About | Web Designer and Local SEO Specialist | Brian Woodson Web Development",
        description: "Brian Woodson Web Development builds custom websites and manages local SEO for small businesses in the DFW area. Custom code, no WordPress, 95+ Lighthouse scores.",
        url: "https://brianwoodson.dev/about",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Web Designer and Local SEO Specialist | Brian Woodson Web Development",
        description: "Brian Woodson Web Development builds custom websites and manages local SEO for small businesses in the DFW area. Custom code, no WordPress, 95+ Lighthouse scores.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://brianwoodson.dev/about",
    },
};

const howIWork = [
    {
        step: "01",
        title: "Define scope before anything else",
        body: "Every project starts with a clear scope document — what you're getting, what it costs, and when it's done. No ambiguity, no moving targets. You approve the plan before any work begins.",
    },
    {
        step: "02",
        title: "Design, write, and build in a focused sprint",
        body: "Once scope is locked, our team executes. Design concepts come first for your approval, then copy and development run in parallel. No unnecessary check-ins or status meetings — just focused work.",
    },
    {
        step: "03",
        title: "Deliver with a clean handoff",
        body: "Your site goes live, fully deployed and production-ready. We walk you through everything, hand off access, and give you a revision window to make sure it's exactly right.",
    },
];

const bestFitFor = [
    "Your current site is slow, outdated, or invisible in local search",
    "You want design, copy, and development handled under one roof",
    "You want a fixed price and a defined delivery date before work starts",
    "You need a site that ranks for the searches your customers actually use",
    "You want to talk directly to the person building your site, not an account manager",
    "You are a service business, trades company, or local practice in the DFW area",
];

export default function AboutPage() {
    const { about } = siteContent;

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://brianwoodson.dev/about/#webpage",
                "url": "https://brianwoodson.dev/about",
                "name": "About | Web Designer and Local SEO Specialist | Brian Woodson Web Development",
                "description": "Brian Woodson Web Development builds custom websites and manages local SEO for small businesses in the DFW area.",
                "isPartOf": {
                    "@type": "WebSite",
                    "url": "https://brianwoodson.dev",
                    "name": "Brian Woodson Web Development"
                },
                "breadcrumb": { "@id": "https://brianwoodson.dev/about/#breadcrumb" }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://brianwoodson.dev/about/#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://brianwoodson.dev"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "About",
                        "item": "https://brianwoodson.dev/about"
                    }
                ]
            },
            {
                "@type": "Person",
                "@id": "https://brianwoodson.dev/#brian-woodson",
                "name": "Brian Woodson",
                "jobTitle": "Web Designer and Developer",
                "image": {
                    "@type": "ImageObject",
                    "url": "https://brianwoodson.dev/brianwoodson.avif"
                },
                "worksFor": {
                    "@type": "ProfessionalService",
                    "@id": "https://brianwoodson.dev/#organization",
                    "name": "Brian Woodson Web Development",
                    "url": "https://brianwoodson.dev"
                },
                "url": "https://brianwoodson.dev/about",
                "sameAs": [
                    "https://www.linkedin.com/in/brianwoodson",
                    "https://www.fiverr.com/brianwoodson"
                ],
                "knowsAbout": [
                    "Web Design",
                    "Website Development",
                    "Local SEO",
                    "Copywriting",
                    "Small Business Websites",
                    "SvelteKit",
                    "Next.js",
                    "Tailwind CSS"
                ]
            }
        ]
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-6 py-24 space-y-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Intro */}
            <section>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 lg:items-start">

                    {/* Image — first in DOM so it stacks on top on mobile */}
                    <div className="w-full">
                        <Image
                            src="/brianwoodson.avif"
                            alt="Brian Woodson"
                            width={600}
                            height={700}
                            className="w-full rounded-2xl object-cover object-top"
                            priority
                        />
                    </div>

                    {/* Text */}
                    <div className="space-y-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-5xl">
                            Web Designer and Local SEO Specialist Based in Granbury, TX
                        </h1>
                        <div className="space-y-4 text-lg text-text-muted">
                            {about.body.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                            <p>
                                Brian Woodson leads every project and handles all development. Before going independent, he spent years building production web applications under real traffic and real deadlines. That experience shapes how every site gets built: fast, findable, and built to last.
                            </p>
                            <p>
                                Most agencies build on WordPress and deliver sites that take 10 seconds to load. We took a different approach — a small team, a modern build system, and a focus on performance that shows up in every Google audit. You own your site from day one, you talk directly to the people doing the work, and every project gets full attention.
                            </p>
                        </div>
                        <ConsultButton/>
                    </div>

                </div>
            </section>

            {/* How we work */}
            <section className="space-y-10 border-t border-border pt-16">
                <div className="space-y-3">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-4xl">
                        How we work
                    </h2>
                    <p className="max-w-2xl text-lg text-text-muted">
                        Fixed-scope builds with ongoing support. Every engagement has defined deliverables, a clear timeline, and a price you agree to before work starts.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {howIWork.map((item) => (
                        <div
                            key={item.step}
                            className="rounded-2xl border border-border bg-surface p-8 space-y-4"
                        >
                            <div className="text-xs font-bold uppercase tracking-widest text-text-muted">
                                {item.step}
                            </div>
                            <h3 className="text-base font-bold text-text">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-text-muted">
                                {item.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Who this is for */}
            <section className="space-y-8 border-t border-border pt-16">
                <div className="space-y-3">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-4xl">
                        Who this is for
                    </h2>
                    <p className="max-w-2xl text-lg text-text-muted">
                        We do our best work with clients who are ready to invest in a site that works.
                    </p>
                </div>
                <ul className="grid gap-3 md:grid-cols-2">
                    {bestFitFor.map((item) => (
                        <li
                            key={item}
                            className="flex gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm text-text-muted"
                        >
                            <span className="text-text select-none">→</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </section>



        </main>
    );
}
