import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { FeaturedOutcomes } from "@/components/home/featured-outcomes";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { HowIWork } from "@/components/home/how-i-work";
import { KnowledgeSection } from "@/components/home/KnowledgeSection";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
    title: "Brian Woodson // Next.js Developer",
    description: "I build fast, polished Next.js websites for small businesses. Fixed scope, clean code, no bloat.",
    openGraph: {
        title: "Brian Woodson // Next.js Developer",
        description: "I build fast, polished Next.js websites for small businesses. Fixed scope, clean code, no bloat.",
        url: "/",
        siteName: "Brian Woodson Portfolio",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brian Woodson Portfolio Preview" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Brian Woodson // Next.js Developer",
        description: "I build fast, polished Next.js websites for small businesses. Fixed scope, clean code, no bloat.",
        images: ["/og-image.png"],
    },
};

export default function Home() {
    return (
        <main className="flex w-full flex-col items-center bg-slate-950 text-slate-50">
            <Hero />
            {/*<ProofStrip />*/}
            <FeaturedOutcomes />
            <PortfolioSection />
            <HowIWork />
            <KnowledgeSection />
            <FinalCTA />
        </main>
    );
}
