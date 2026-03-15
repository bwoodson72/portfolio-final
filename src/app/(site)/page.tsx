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
    title: "Brian Woodson Web Development // Design, Copy & Code for Small Businesses",
    description: "Your website should be your best salesperson. We design, write, and build fast sites for small businesses — fixed price, delivered in weeks.",
    openGraph: {
        title: "Brian Woodson Web Development // Design, Copy & Code for Small Businesses",
        description: "Your website should be your best salesperson. We design, write, and build fast sites for small businesses — fixed price, delivered in weeks.",
        url: "/",
        siteName: "Brian Woodson Web Development",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Web Development" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Brian Woodson Web Development // Design, Copy & Code for Small Businesses",
        description: "Your website should be your best salesperson. We design, write, and build fast sites for small businesses — fixed price, delivered in weeks.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
    return (
        <main className="flex w-full flex-col items-center bg-slate-950 text-slate-50">
            <Hero />
            <ProofStrip />
            <TrustStrip />
            <FeaturedWork />
            <ProjectHighlights />
            <AuditCta />
            <ServicePackages />
            <InlineFAQ />
            <HowIWork />
            <FinalCTA />
        </main>
    );
}
