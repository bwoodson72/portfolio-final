import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { ProjectsSection } from "@/components/projectsSection";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { HowIWork } from "@/components/home/how-i-work";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
    return (
        <main className="flex w-full flex-col items-center bg-slate-950 text-slate-50">
            <Hero />
            <ProofStrip />
            <ProjectsSection />
            <PortfolioSection />
            <HowIWork />
            <FinalCTA />
        </main>
    );
}
