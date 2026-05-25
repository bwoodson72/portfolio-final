import { Metadata } from "next";
import Link from "next/link";
import { privacyContent } from "@/content/privacy";

export const metadata: Metadata = {
    title: "Privacy Policy | Brian Woodson Web Development",
    description: "How Brian Woodson Web Development collects, uses, and protects your information.",
    openGraph: {
        title: "Privacy Policy | Brian Woodson Web Development",
        description: "How Brian Woodson Web Development collects, uses, and protects your information.",
        url: "/privacy",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "/privacy",
    },
};

export default function PrivacyPage() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-24 space-y-16">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-text md:text-6xl">
                    Privacy Policy
                </h1>
                <p className="text-sm text-text-muted">
                    Last updated: {privacyContent.lastUpdated}
                </p>
                <p className="text-lg text-text-muted leading-relaxed">
                    {privacyContent.intro}
                </p>
            </div>

            <div className="space-y-12">
                {privacyContent.sections.map((section) => (
                    <section key={section.id} id={section.id} className="space-y-4">
                        <h2 className="text-xl font-bold text-text">
                            {section.heading}
                        </h2>

                        {section.paragraphs?.map((paragraph, i) => (
                            <p key={i} className="text-sm leading-relaxed text-text-muted">
                                {paragraph}
                            </p>
                        ))}

                        {section.items && (
                            <ul className="space-y-3 mt-2">
                                {section.items.map((item) => (
                                    <li
                                        key={item.label}
                                        className="rounded-2xl border border-border bg-surface px-6 py-4"
                                    >
                                        <span className="block text-sm font-bold text-text mb-1">
                                            {item.label}
                                        </span>
                                        <span className="text-sm leading-relaxed text-text-muted">
                                            {item.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>

            <div className="rounded-3xl border border-border bg-surface p-10 text-center space-y-4">
                <p className="font-bold text-text">
                    Questions about this policy?
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
