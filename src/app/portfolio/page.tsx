import { FeaturedCaseStudies } from "@/components/portfolio/featured-case-studies";
import { ProofStrip } from "@/components/portfolio/proof-strip";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { HowIWork } from "@/components/portfolio/how-i-work";
import { PackageMatcher } from "@/components/portfolio/package-matcher";
import { Faq } from "@/components/portfolio/faq";
import { AnalyticsLink } from "@/components/portfolio/analytics-link";
import { portfolioItems } from "@/content/portfolio";

const UPWORK_PROFILE_URL = "TODO: https://www.upwork.com/freelancers/~YOUR_PROFILE";
const INTAKE_URL = "TODO: https://forms.yourdomain.com/intake";

const featuredItems = portfolioItems.slice(0, 3);

const PortfolioPage = (): JSX.Element => {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Fixed-scope Upwork packages for founders
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
              Ship your next product win with a senior Next.js partner
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              I help product teams and founders launch MVPs, stabilize bugs, and
              improve conversions with fixed-scope engagements designed for
              Upwork. Fast timelines, clear deliverables, and measurable
              outcomes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <AnalyticsLink
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              eventName="hire_upwork_click"
              href={UPWORK_PROFILE_URL}
              rel="noreferrer"
              target="_blank"
            >
              Hire me on Upwork
            </AnalyticsLink>
            <a
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              href="#packages"
            >
              See packages & pricing
            </a>
            <AnalyticsLink
              className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline"
              eventName="intake_click"
              href={INTAKE_URL}
              rel="noreferrer"
              target="_blank"
            >
              Submit intake (5 min)
            </AnalyticsLink>
          </div>
        </div>
      </section>

      <ProofStrip />

      <FeaturedCaseStudies items={featuredItems} />

      <PortfolioGrid items={portfolioItems} />

      <HowIWork intakeUrl={INTAKE_URL} />

      <PackageMatcher />

      <Faq />

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Ready to scope your next win?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Choose a package or submit the intake and I will reply with next
              steps within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AnalyticsLink
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              eventName="hire_upwork_click"
              href={UPWORK_PROFILE_URL}
              rel="noreferrer"
              target="_blank"
            >
              Hire me on Upwork
            </AnalyticsLink>
            <AnalyticsLink
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              eventName="intake_click"
              href={INTAKE_URL}
              rel="noreferrer"
              target="_blank"
            >
              Submit intake (5 min)
            </AnalyticsLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
