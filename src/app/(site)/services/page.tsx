import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Services | Brian Woodson Web Development",
    description: "Website rebuilds, landing pages, performance optimization, technical SEO foundations, and conversion-focused web services for small businesses.",
    openGraph: {
        title: "Services | Brian Woodson Web Development",
        description: "Website rebuilds, landing pages, performance optimization, technical SEO foundations, and conversion-focused web services for small businesses.",
        url: "/services",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Services | Brian Woodson Web Development",
        description: "Website rebuilds, landing pages, performance optimization, technical SEO foundations, and conversion-focused web services for small businesses.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/services",
    },
};

export default function ServicesPage() {
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

            {/* SECTION 2 — Positioning intro */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="max-w-3xl space-y-6">
                    <h2 className="text-2xl font-extrabold tracking-tight text-text md:text-3xl">
                        Not packages. Scoped around what you actually need.
                    </h2>
                    <p className="text-lg leading-relaxed text-text-muted">
                        Most web agencies force businesses into preset bundles. You pay for features you don&apos;t need and skip ones you do. We work differently — scope is defined after understanding your business, your goals, and your current situation.
                    </p>
                    <p className="text-lg leading-relaxed text-text-muted">
                        Every project includes copywriting, SEO foundations, performance optimization, and ongoing support. The scope — number of pages, depth of SEO work, design complexity — is determined by what your business actually requires.
                    </p>
                </div>
            </section>

            {/* SECTION 3 — Service detail sections */}

            {/* Service 1: Website Rebuilds */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Full Builds</p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-text">Website Rebuilds</h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            Your current site was built for a different era — or built quickly with the wrong tools. A rebuild starts from scratch with a modern stack: fast, findable, and designed around how your customers actually think.
                        </p>
                        <p className="text-sm text-text-muted">
                            <span className="font-bold text-text">Who this is for:</span> Businesses whose current site is outdated, slow, difficult to update, or failing to convert visitors into calls and inquiries.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                        >
                            Talk about a rebuild
                        </Link>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">What&apos;s included</h3>
                            <ul className="space-y-2">
                                {[
                                    "Modern responsive layout",
                                    "Conversion-focused copywriting",
                                    "Dedicated service pages",
                                    "Google Business Profile setup",
                                    "Contact and lead capture forms",
                                    "GA4 and conversion tracking",
                                    "On-page SEO and metadata",
                                    "Clean deployment and handoff",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">Business benefits</h3>
                            <ul className="space-y-2">
                                {[
                                    "Stronger first impression on mobile",
                                    "Better position in local search results",
                                    "Clearer path from page to call",
                                    "No more embarrassment handing someone your URL",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 2: Landing Pages */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Focused Pages</p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-text">Landing Pages</h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            A single conversion-focused page built for a specific goal: an ad campaign, a service area, a product launch. Less distraction, clearer message, higher conversion rate.
                        </p>
                        <p className="text-sm text-text-muted">
                            <span className="font-bold text-text">Who this is for:</span> Businesses running paid ads, expanding into new service areas, or testing a new offer without rebuilding the whole site.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                        >
                            Talk about a landing page
                        </Link>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">What&apos;s included</h3>
                            <ul className="space-y-2">
                                {[
                                    "Single high-performance page",
                                    "Conversion-focused copy",
                                    "Lead capture or contact form",
                                    "GA4 and conversion tracking",
                                    "On-page SEO",
                                    "Mobile-first responsive build",
                                    "Deployed and live",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">Business benefits</h3>
                            <ul className="space-y-2">
                                {[
                                    "Higher conversion rate from paid traffic",
                                    "Purpose-built for one audience and one action",
                                    "Faster to build and test than a full site",
                                    "Trackable from day one",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 3: Performance Optimization */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Speed Work</p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-text">Performance Optimization</h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            More than half of mobile visitors leave a site that takes longer than three seconds to load. If your site is slow, you are losing leads before your content is even visible.
                        </p>
                        <p className="text-sm text-text-muted">
                            <span className="font-bold text-text">Who this is for:</span> Businesses with an existing site that loads slowly, has low Google Lighthouse scores, or has been told their site needs to be faster.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                        >
                            Talk about performance work
                        </Link>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">What&apos;s included</h3>
                            <ul className="space-y-2">
                                {[
                                    "Lighthouse audit and diagnosis",
                                    "Image and asset optimization",
                                    "Render path improvements",
                                    "Code cleanup and dead weight removal",
                                    "Retesting and score verification",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">Business benefits</h3>
                            <ul className="space-y-2">
                                {[
                                    "Lower bounce rate on mobile",
                                    "Stronger Google search ranking signals",
                                    "Faster perceived experience for every visitor",
                                    "Better conversion rate from existing traffic",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 4: Technical SEO Foundations */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Search Foundations</p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-text">Technical SEO Foundations</h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            If Google can&apos;t properly read and index your site, your content doesn&apos;t matter. Technical SEO fixes the structural issues that prevent search engines from treating your site as a trustworthy result.
                        </p>
                        <p className="text-sm text-text-muted">
                            <span className="font-bold text-text">Who this is for:</span> Businesses that have content but aren&apos;t showing up in search, or sites that have been online for years but never had proper SEO infrastructure set up.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                        >
                            Talk about technical SEO
                        </Link>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">What&apos;s included</h3>
                            <ul className="space-y-2">
                                {[
                                    "Metadata and title structure",
                                    "Canonical tags and duplicate content cleanup",
                                    "XML sitemap and robots.txt",
                                    "Structured data and schema markup",
                                    "Crawl health review",
                                    "Google Search Console setup",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">Business benefits</h3>
                            <ul className="space-y-2">
                                {[
                                    "Search engines can properly find and index your pages",
                                    "Cleaner site structure for long-term ranking growth",
                                    "Stronger appearance in search results with structured data",
                                    "Foundation that makes all future content more effective",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 5: Copywriting and Messaging */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Content</p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-text">Copywriting and Messaging</h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            Most small business websites say what they do, but not why it matters to the visitor. Good copy makes the case clearly — who you help, what problem you solve, and why the visitor should call you instead of the next option on the list.
                        </p>
                        <p className="text-sm text-text-muted">
                            <span className="font-bold text-text">Who this is for:</span> Any business with a site that talks about services but doesn&apos;t convince visitors to take action. Also included in every full build or landing page project.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                        >
                            Talk about copywriting
                        </Link>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">What&apos;s included</h3>
                            <ul className="space-y-2">
                                {[
                                    "Homepage copy",
                                    "Service page copy",
                                    "Headline and subheadline writing",
                                    "CTA copy",
                                    "Positioning review and messaging cleanup",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">Business benefits</h3>
                            <ul className="space-y-2">
                                {[
                                    "Clearer value proposition for cold visitors",
                                    "Stronger conversion rate on every page",
                                    "Consistent tone that builds trust",
                                    "No more generic filler that says nothing",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 6: Ongoing Support */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-muted">After Launch</p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-text">Ongoing Support</h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            A website is not a one-time project. After launch, your site needs hosting, security updates, content edits, and occasional performance checks. Ongoing support means you never have to worry about it.
                        </p>
                        <p className="text-sm text-text-muted">
                            <span className="font-bold text-text">Who this is for:</span> Businesses that want their site maintained and updated without managing servers, developers, or security patches themselves.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                        >
                            Talk about ongoing support
                        </Link>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">What&apos;s included</h3>
                            <ul className="space-y-2">
                                {[
                                    "Hosting and uptime monitoring",
                                    "Security and dependency updates",
                                    "Content updates (text, images, pages)",
                                    "Monthly performance report",
                                    "Support window for questions and small changes",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">Business benefits</h3>
                            <ul className="space-y-2">
                                {[
                                    "One less thing to manage",
                                    "Site stays current and secure",
                                    "Content stays accurate without requiring a developer",
                                    "Performance issues caught early",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-text-muted">
                                        <span className="font-bold text-text shrink-0">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
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

            {/* SECTION 6 — Final CTA */}
            <section className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
                <div className="rounded-3xl border border-border bg-surface p-12 text-center space-y-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-4xl">
                        Ready to talk about your site?
                    </h2>
                    <p className="mx-auto max-w-xl text-lg text-text-muted">
                        Tell us what your business does and what&apos;s not working. We&apos;ll reply within one business day with a scope recommendation and a straightforward quote.
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

        </main>
    );
}
