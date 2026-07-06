import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { FeaturedWork } from "@/components/home/featured-work";
import { ServicePackages } from "@/components/home/service-packages";
import { HowIWork } from "@/components/home/how-i-work";
import { TrustStrip } from "@/components/home/trust-strip";
import { ProjectHighlights } from "@/components/home/project-highlights";
import { InlineFAQ } from "@/components/home/inline-faq";

import { AuditCta } from "@/components/home/audit-cta";

export const metadata: Metadata = {
    title: "Website Development Services and Local SEO for Small Businesses",
    description: "Custom website development and local SEO for small businesses in the DFW area. Fast load times, conversion-focused copy, and search rankings built in from the start.",
    openGraph: {
        title: "Small Business Website Development and Local SEO ",
        description: "Custom website development and local SEO for small businesses in the DFW area. Fast load times, conversion-focused copy, and search rankings built in from the start.",
        url: "https://brianwoodson.dev",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Small Business Website Development and Local SEO ",
        description: "Custom website development and local SEO for small businesses in the DFW area. Fast load times, conversion-focused copy, and search rankings built in from the start.",
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
                "@type": "WebSite",
                "@id": "https://brianwoodson.dev",
                "url": "https://brianwoodson.dev",
                "name": "Brian Woodson Web Development",
                "publisher": { "@id": "https://brianwoodson.dev" }
            },
            {
                "@type": "WebPage",
                "@id": "https://brianwoodson.dev/#webpage",
                "url": "https://brianwoodson.dev",
                "name": "Small Business Website Development and Local SEO",
                "description": "Custom website development and local SEO for small businesses in the DFW area. Fast load times, conversion-focused copy, and search rankings built in from the start.",
                "isPartOf": { "@id": "https://brianwoodson.dev" },
                "about": { "@id": "https://brianwoodson.dev" }
            },
            {
                "@type": "ProfessionalService",
                "@id": "https://brianwoodson.dev",
                "name": "Brian Woodson Web Development",
                "url": "https://brianwoodson.dev",
                "telephone": "+18177764893",
                "description": "Custom website development and local SEO for small businesses in the DFW area.",
                "priceRange": "$$",
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
                "sameAs": [
                    "https://www.facebook.com/profile.php?id=61570753541245",
                    "https://www.linkedin.com/company/brian-woodson-web-development",
                    "https://www.youtube.com/@BrianWoodsonWebDevelopment",
                    "https://www.google.com/maps?cid=11334466566285987166"
                ]
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

        </main>
    );
}
