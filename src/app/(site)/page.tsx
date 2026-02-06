import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { FeaturedOutcomes } from "@/components/home/featured-outcomes";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { HowIWork } from "@/components/home/how-i-work";
import { FinalCTA } from "@/components/home/final-cta";

type PackageKey = "fix-sprint" | "stripe" | "saas-skeleton" | "landing-page-add-on";
type PackageRecommendation = {
    key: PackageKey;
    title: string;
    duration: string;
    scope: string;
    bestFor: string[];
    deliverables: string[];
    note?: string;
};

const PACKAGE_RECS: PackageRecommendation[] = [
    {
        key: "fix-sprint",
        title: "Fix-It Sprint",
        duration: "2–3 days",
        scope: "Fixed-scope only",
        bestFor: [
            "A broken flow or blocker bug",
            "UI regressions / mobile layout issues",
            "TypeScript/build failures and runtime errors",
        ],
        deliverables: [
            "Root-cause diagnosis + fix",
            "Guardrails to prevent recurrence (targeted tests/checks)",
            "Clear handoff notes and acceptance checklist",
        ],
        note: "Best when you can point at a specific problem and success criteria.",
    },
    {
        key: "stripe",
        title: "Stripe Checkout + Billing",
        duration: "4–7 days",
        scope: "Fixed-scope only",
        bestFor: [
            "Subscriptions + customer portal flow",
            "Webhook reliability + idempotency",
            "Onboarding and “missing session / failed payment” UX",
        ],
        deliverables: [
            "Checkout + webhook pipeline that’s hard to break",
            "Billing portal configuration + clean redirects",
            "Failure-state UX and tested edge cases",
        ],
        note: "If you’ve already got products/prices in Stripe, even better.",
    },
    {
        key: "saas-skeleton",
        title: "SaaS Starter Skeleton",
        duration: "1–2 weeks",
        scope: "Fixed-scope only",
        bestFor: [
            "A clean Next.js 16 foundation",
            "Auth + roles + multi-tenant baseline",
            "A repo you can confidently extend without rewrites",
        ],
        deliverables: [
            "Opinionated project structure + patterns",
            "Core app shell + key screens",
            "Deployment-ready checklist and sane defaults",
        ],
        note: "Ideal when you want speed now and less pain later.",
    },
    {
        key: "landing-page-add-on",
        title: "Marketing Landing Page Add-On",
        duration: "1–2 days",
        scope: "Fixed-scope only",
        bestFor: [
            "A simple conversion-focused landing page",
            "Polished sections + responsive layout",
            "Clear CTA routing into your onboarding/contact",
        ],
        deliverables: [
            "One-page marketing layout (responsive)",
            "Section components wired to your content model",
            "Fast edits without breaking styling",
        ],
        note: "Pairs well with Stripe or a SaaS skeleton build.",
    },
];

const FAQS: Array<{ q: string; a: string }> = [
    {
        q: "Do you do hourly, retainers, or open-ended work?",
        a: "No — fixed-scope only. We define acceptance criteria up front, ship, and then you can book the next package if you want more.",
    },
    {
        q: "Will you work inside my existing codebase?",
        a: "Yes. I’ll adapt to your conventions and keep changes focused, readable, and testable.",
    },
    {
        q: "What do you need from me to start?",
        a: "Repo access, a short goal description, and any context you already have (screenshots, logs, user reports). For Stripe work: access to your Stripe dashboard and webhook endpoints.",
    },
    {
        q: "How do you prevent scope creep?",
        a: "Every package has defined deliverables and acceptance checks. If something new comes up, it becomes a separate package or a clearly-scoped add-on.",
    },
    {
        q: "What stack do you specialize in?",
        a: "Next.js / React / TypeScript, Node, Postgres, and common SaaS plumbing (Stripe, email, webhooks).",
    },
];

function PackageMatcher() {
    return (
        <section className="w-full">
            <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                        Choose a fixed-scope package
                    </h2>
                    <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        No hourly. No retainers. No open-ended builds. Pick the package that matches your
                        outcome and we ship to clear acceptance criteria.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {PACKAGE_RECS.map((pkg) => (
                        <div
                            key={pkg.key}
                            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-6 shadow-sm"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="text-lg font-semibold text-slate-50">{pkg.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-slate-800/80 bg-slate-950/60 px-2 py-1">
                    {pkg.duration}
                  </span>
                                    <span className="rounded-full border border-slate-800/80 bg-slate-950/60 px-2 py-1">
                    {pkg.scope}
                  </span>
                                </div>
                            </div>

                            {pkg.note ? (
                                <p className="mt-3 text-sm leading-relaxed text-slate-300">{pkg.note}</p>
                            ) : null}

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Best for
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
                                        {pkg.bestFor.map((x) => (
                                            <li key={x}>{x}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Deliverables
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
                                        {pkg.deliverables.map((x) => (
                                            <li key={x}>{x}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-5">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
                                >
                                    Start this package
                                </a>
                                <p className="mt-2 text-xs text-slate-400">
                                    You’ll get a scoped plan, acceptance criteria, and a clean handoff.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    return (
        <section className="w-full">
            <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                        FAQ
                    </h2>
                    <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        Quick answers to the questions that typically decide whether a project moves forward.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {FAQS.map((item) => (
                        <div
                            key={item.q}
                            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-6"
                        >
                            <h3 className="text-base font-semibold text-slate-50">{item.q}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <main className="flex w-full flex-col items-center bg-slate-950 text-slate-50">
            <Hero />
            <ProofStrip />
            <FeaturedOutcomes />
            <PortfolioSection />
            <HowIWork />
            <PackageMatcher />
            <FAQSection />
            <div id="contact" className="w-full">
                <FinalCTA />
            </div>
        </main>
    );
}
