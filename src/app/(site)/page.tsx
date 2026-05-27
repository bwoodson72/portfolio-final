import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { FeaturedWork } from "@/components/home/featured-work";
import { ServicePackages } from "@/components/home/service-packages";
import { HowIWork } from "@/components/home/how-i-work";
import { TrustStrip } from "@/components/home/trust-strip";
import { ProjectHighlights } from "@/components/home/project-highlights";
import { InlineFAQ } from "@/components/home/inline-faq";
import { FinalCTA } from "@/components/home/final-cta";
import { AuditCta } from "@/components/home/audit-cta";

export const metadata: Metadata = {
    title: "Small Business Web Design and Local SEO | Brian Woodson Web Development",
    description: "Custom website design and local SEO for small businesses in the DFW area. Fast load times, conversion-focused copy, and search rankings built in from the start.",
    openGraph: {
        title: "Small Business Web Design and Local SEO | Brian Woodson Web Development",
        description: "Custom website design and local SEO for small businesses in the DFW area. Fast load times, conversion-focused copy, and search rankings built in from the start.",
        url: "https://brianwoodson.dev",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Small Business Web Design and Local SEO | Brian Woodson Web Development",
        description: "Custom website design and local SEO for small businesses in the DFW area. Fast load times, conversion-focused copy, and search rankings built in from the start.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://brianwoodson.dev",
    },
};

export default function Home() {
    const homepageStructuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://brianwoodson.dev/#webpage",
                "url": "https://brianwoodson.dev",
                "name": "Small Business Web Design and Local SEO | Brian Woodson Web Development",
                "description": "Custom website design and local SEO for small businesses in the DFW area. Fast load times, conversion-focused copy, and search rankings built in from the start.",
                "isPartOf": {
                    "@type": "WebSite",
                    "url": "https://brianwoodson.dev",
                    "name": "Brian Woodson Web Development"
                },
                "about": {
                    "@type": "ProfessionalService",
                    "@id": "https://brianwoodson.dev/#organization",
                    "name": "Brian Woodson Web Development",
                    "url": "https://brianwoodson.dev",
                    "telephone": "+18177764893",
                    "description": "Custom website design and local SEO for small businesses in the DFW area.",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Granbury",
                        "addressRegion": "TX",
                        "addressCountry": "US"
                    },
                    "areaServed": [
                        { "@type": "City", "name": "Granbury", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hood County" } },
                        { "@type": "City", "name": "Fort Worth", "containedInPlace": { "@type": "AdministrativeArea", "name": "Tarrant County" } },
                        { "@type": "City", "name": "Weatherford", "containedInPlace": { "@type": "AdministrativeArea", "name": "Parker County" } },
                        { "@type": "City", "name": "Cleburne", "containedInPlace": { "@type": "AdministrativeArea", "name": "Johnson County" } }
                    ],
                    "serviceType": ["Web Design", "Website Development", "Local SEO", "Copywriting", "Landing Page Design"],
                    "priceRange": "$$"
                }
            }
        ]
    };

    return (
        <main className="flex w-full flex-col items-center bg-slate-950 text-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
            />
            <Hero />
            <ProofStrip />
            <TrustStrip />
            <AuditCta />
            <FeaturedWork />
            <ProjectHighlights />
            <ServicePackages />
            <InlineFAQ />
            <HowIWork />
            <FinalCTA />
        </main>
    );
}
