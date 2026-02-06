import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { FeaturedOutcomes } from "@/components/home/featured-outcomes";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { HowIWork } from "@/components/home/how-i-work";
import { PackageMatcher } from "@/components/home/package-matcher";
import { FAQ } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";
import { portfolioItems } from "@/content/portfolio";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <Hero />
      <ProofStrip />
      <FeaturedOutcomes />
      <PortfolioSection items={portfolioItems} />
      <HowIWork />
      <PackageMatcher />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
