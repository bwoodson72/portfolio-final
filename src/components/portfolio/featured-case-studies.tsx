import { type PortfolioItem } from "@/content/portfolio";
import { AnalyticsLink } from "@/components/portfolio/analytics-link";

const renderLink = (
  label: string,
  href?: string,
  variant: "primary" | "secondary" = "secondary"
): JSX.Element | null => {
  if (!href) {
    return null;
  }

  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition";
  const classes =
    variant === "primary"
      ? `${baseClasses} bg-slate-900 text-white hover:bg-slate-800`
      : `${baseClasses} border border-slate-200 text-slate-700 hover:border-slate-300`;

  return (
    <a className={classes} href={href} rel="noreferrer" target="_blank">
      {label}
    </a>
  );
};

export type FeaturedCaseStudiesProps = {
  items: PortfolioItem[];
};

export const FeaturedCaseStudies = ({
  items,
}: FeaturedCaseStudiesProps): JSX.Element => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Featured outcomes
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          The kind of wins you can expect
        </h2>
        <p className="max-w-2xl text-base text-slate-600">
          These are fixed-scope engagements focused on measurable outcomes, fast
          timelines, and clean handoffs.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {item.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                {item.oneLinerOutcome}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {item.links.loomUrl ? (
                <AnalyticsLink
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  eventName="loom_click"
                  href={item.links.loomUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Watch Loom
                </AnalyticsLink>
              ) : null}
              {renderLink(
                "View screenshots",
                item.links.screenshots?.[0],
                "secondary"
              )}
              <AnalyticsLink
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                eventName="hire_upwork_click"
                href={item.links.upworkPackageUrl}
                rel="noreferrer"
                target="_blank"
              >
                Hire for this outcome
              </AnalyticsLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
