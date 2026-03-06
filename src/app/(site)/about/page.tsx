import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/portfolio";

export const metadata: Metadata = {
    title: "About | Brian Woodson",
    description: "I build websites for small businesses that load fast, rank on Google, and actually bring in leads. Fixed price, delivered in weeks.",
    openGraph: {
        title: "About | Brian Woodson",
        description: "I build websites for small businesses that load fast, rank on Google, and actually bring in leads. Fixed price, delivered in weeks.",
        url: "/about",
        siteName: "Brian Woodson",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Portfolio Preview" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Brian Woodson",
        description: "I build websites for small businesses that load fast, rank on Google, and actually bring in leads. Fixed price, delivered in weeks.",
        images: ["/og-image.png"],
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
        title: "Build in a focused sprint",
        body: "Once we agree on scope, I build. No unnecessary check-ins, no status meetings. You get the finished product, not a front-row seat to the process.",
    },
    {
        step: "03",
        title: "Deliver with a clean handoff",
        body: "Your site goes live on Vercel, fully deployed and production-ready. I walk you through everything, hand off access, and give you a revision window to make sure it's exactly right.",
    },
];

const bestFitFor = [
    "Local businesses that want a website that actually brings in customers",
    "Service companies ready to stop paying monthly for a site that doesn't perform",
    "Business owners who have their content and branding ready to go",
    "Anyone who's tired of slow, outdated WordPress sites",
    "Companies that want a fixed price and a guaranteed delivery date",
    "Founders who want to talk to their developer directly, not through layers",
];

export default function AboutPage() {
    const { about } = siteContent;

    return (
        <main className="mx-auto w-full max-w-7xl px-6 py-24 space-y-24">

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
                            Who You&#39;re Working With
                        </h1>
                        <div className="space-y-4 text-lg text-text-muted">
                            {about.body.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                            <p>
                                Before going independent, I spent years building production web applications — the kind that have to work under real traffic, real deadlines, and real business pressure. That experience taught me what actually matters when a site launches: it has to be fast, it has to be findable, and it can&#39;t break.
                            </p>
                            <p>
                                I keep my client list small on purpose. I&apos;m not an agency — I&apos;m one developer who does focused work well. That means you talk directly to the person building your site, not an account manager. And I only take on projects where I know I can deliver something worth paying for.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                                Primary Stack
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {about.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-bold text-text transition hover:border-border-strong"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex rounded-full bg-text px-6 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                        >
                            Get in touch
                        </Link>
                    </div>

                </div>
            </section>

            {/* How I Work */}
            <section className="space-y-10 border-t border-border pt-16">
                <div className="space-y-3">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-4xl">
                        How I work
                    </h2>
                    <p className="max-w-2xl text-lg text-text-muted">
                        Fixed-scope only. Every engagement has defined deliverables, a clear timeline, and a price you agree to before work starts.
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
                        I do my best work with clients who are ready to invest in a site that works.
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

            {/* CTA */}
            <section className="rounded-3xl border border-border bg-surface p-12 text-center space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-4xl">
                    Ready to get started?
                </h2>
                <p className="mx-auto max-w-md text-lg text-text-muted">
                    Tell me about your project and I&apos;ll get back to you within one business day.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex rounded-full bg-text px-8 py-4 text-sm font-bold text-bg transition hover:opacity-90"
                >
                    Get in touch
                </Link>
            </section>

        </main>
    );
}
