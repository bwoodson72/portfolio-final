import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/portfolio";

export const metadata: Metadata = {
    title: "About | Brian Woodson Web Development",
    description: "A distributed studio that designs, writes, and builds websites for small businesses. Led by Brian Woodson. Fixed price, delivered in weeks.",
    openGraph: {
        title: "About | Brian Woodson Web Development",
        description: "A distributed studio that designs, writes, and builds websites for small businesses. Led by Brian Woodson. Fixed price, delivered in weeks.",
        url: "/about",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Brian Woodson Web Development",
        description: "A distributed studio that designs, writes, and builds websites for small businesses. Led by Brian Woodson. Fixed price, delivered in weeks.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/about",
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
    "You're paying for a website that's not generating leads",
    "Your current site is slow, outdated, or invisible on Google",
    "You want design, copy, and development handled under one roof",
    "You want a fixed price and a guaranteed delivery date",
    "You'd rather talk to the person building your site than an account manager",
    "You need a site that actually shows up on Google",
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
                            Who We Are
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
                        <Link
                            href="/contact"
                            className="inline-flex rounded-full bg-text px-6 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                        >
                            Get in touch
                        </Link>
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
