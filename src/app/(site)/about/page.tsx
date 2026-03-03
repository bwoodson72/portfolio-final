import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/portfolio";

export const metadata: Metadata = {
    title: "About | Brian Woodson",
    description: "Senior frontend developer specializing in Next.js. Fixed-scope projects, fast delivery, no bloat.",
    openGraph: {
        title: "About | Brian Woodson",
        description: "Senior frontend developer specializing in Next.js. Fixed-scope projects, fast delivery, no bloat.",
        url: "/about",
        siteName: "Brian Woodson Portfolio",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Portfolio Preview" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Brian Woodson",
        description: "Senior frontend developer specializing in Next.js. Fixed-scope projects, fast delivery, no bloat.",
        images: ["/og-image.png"],
    },
};

const howIWork = [
    {
        step: "01",
        title: "Define scope before anything else",
        body: "Every project starts with a clear scope document — what's included, what's not, and what 'done' looks like. No ambiguity before work starts.",
    },
    {
        step: "02",
        title: "Build in a focused sprint",
        body: "Once scope is agreed, I build. No check-ins every day, no status theatre. You get the result, not the process.",
    },
    {
        step: "03",
        title: "Deliver with a clean handoff",
        body: "Production deployment, documentation for anything non-obvious, and a revision window to make sure everything lands correctly.",
    },
];

const notAGoodFit = [
    "WordPress, Webflow, or no-code platforms",
    "Open-ended hourly or retainer arrangements",
    "E-commerce builds (Shopify, WooCommerce)",
    "SaaS products or ongoing feature development",
    "Projects without defined scope or clear acceptance criteria",
    "Rush work without adequate lead time",
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
                        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-text) md:text-5xl">
                            About
                        </h1>
                        <div className="space-y-4 text-lg text-(--color-text-muted)">
                            {about.body.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                            <p>
                                Before going independent, I spent years working across the stack on production React and Next.js applications — dashboards, marketing sites, internal tools. That experience taught me what actually matters at launch: performance, clean code, and zero surprises.
                            </p>
                            <p>
                                I keep my client list intentional. I&apos;m not trying to scale an agency — I&apos;m one developer who does focused work well. That means you get direct communication, fast iteration, and someone who actually cares whether your site converts.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted)">
                                Primary Stack
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {about.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-bold text-(--color-text) transition hover:border-(--color-border-strong)"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex rounded-full bg-(--color-text) px-6 py-3 text-sm font-bold text-(--color-bg) transition hover:opacity-90"
                        >
                            Get in touch
                        </Link>
                    </div>

                </div>
            </section>

            {/* How I Work */}
            <section className="space-y-10 border-t border-(--color-border) pt-16">
                <div className="space-y-3">
                    <h2 className="text-2xl font-extrabold tracking-tight text-(--color-text) md:text-4xl">
                        How I work
                    </h2>
                    <p className="max-w-2xl text-lg text-(--color-text-muted)">
                        Fixed-scope only. Every engagement has defined deliverables, a clear timeline, and a price you agree to before work starts.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {howIWork.map((item) => (
                        <div
                            key={item.step}
                            className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-8 space-y-4"
                        >
                            <div className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted)">
                                {item.step}
                            </div>
                            <h3 className="text-base font-bold text-(--color-text)">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-(--color-text-muted)">
                                {item.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What I don't do */}
            <section className="space-y-8 border-t border-(--color-border) pt-16">
                <div className="space-y-3">
                    <h2 className="text-2xl font-extrabold tracking-tight text-(--color-text) md:text-4xl">
                        What I don&apos;t do
                    </h2>
                    <p className="max-w-2xl text-lg text-(--color-text-muted)">
                        Being upfront about bad-fit work saves everyone time.
                    </p>
                </div>
                <ul className="grid gap-3 md:grid-cols-2">
                    {notAGoodFit.map((item) => (
                        <li
                            key={item}
                            className="flex gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) px-5 py-4 text-sm text-(--color-text-muted)"
                        >
                            <span className="text-(--color-text-muted) select-none">✕</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            {/* CTA */}
            <section className="rounded-3xl border border-(--color-border) bg-(--color-surface) p-12 text-center space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-(--color-text) md:text-4xl">
                    Sound like a fit?
                </h2>
                <p className="mx-auto max-w-md text-lg text-(--color-text-muted)">
                    Tell me about your project and I&apos;ll get back to you within one business day.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex rounded-full bg-(--color-text) px-8 py-4 text-sm font-bold text-(--color-bg) transition hover:opacity-90"
                >
                    Get in touch
                </Link>
            </section>

        </main>
    );
}
