import { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/content/portfolio";

export const metadata: Metadata = {
    title: "FAQ | Brian Woodson",
    description: "Common questions about working with Brian Woodson on your small business website",
    openGraph: {
        title: "FAQ | Brian Woodson",
        description: "Common questions about working with Brian Woodson on your small business website",
        url: "/faq",
        siteName: "Brian Woodson",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Portfolio Preview" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "FAQ | Brian Woodson",
        description: "Common questions about working with Brian Woodson on your small business website",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/faq",
    },
};

export default function FAQPage() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-24 space-y-16">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-6xl">
                    FAQ
                </h1>
                <p className="text-lg text-text-muted">
                    Common questions before we work together
                </p>
            </div>

            <ul className="space-y-3">
                {faqs.map((item) => (
                    <li key={item.question}>
                        <details className="group rounded-2xl border border-border bg-surface open:border-border-strong">
                            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-text marker:content-none list-none select-none">
                                {item.question}
                                {/* Chevron — rotates when open */}
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
                                    <path d="m6 9 6 6 6-6"/>
                                </svg>
                            </summary>
                            <div className="border-t border-border px-6 py-5">
                                <p className="text-sm leading-relaxed text-text-muted">
                                    {item.answer}
                                </p>
                            </div>
                        </details>
                    </li>
                ))}
            </ul>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: faqs.map((item) => ({
                            '@type': 'Question',
                            name: item.question,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: item.answer,
                            },
                        })),
                    }),
                }}
            />

            <div className="rounded-3xl border border-border bg-surface p-10 text-center space-y-4">
                <p className="font-bold text-text">
                    Still have questions?
                </p>
                <Link
                    href="/contact"
                    className="inline-flex rounded-full bg-text px-6 py-3 text-sm font-bold text-bg transition hover:opacity-90"
                >
                    Get in touch
                </Link>
            </div>
        </main>
    );
}
