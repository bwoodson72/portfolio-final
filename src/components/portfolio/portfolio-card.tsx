import { type PortfolioItem } from "@/content/portfolio";
import { AnalyticsLink } from "@/components/portfolio/analytics-link";

export type PortfolioCardProps = {
  item: PortfolioItem;
};

export const PortfolioCard = ({ item }: PortfolioCardProps): JSX.Element => {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span>{item.category}</span>
        <span>{item.timeline}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{item.oneLinerOutcome}</p>
      </div>
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
      <div className="mt-6 space-y-4 text-sm text-slate-600">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Problem
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {item.problem.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Solution
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {item.solution.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
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
        {item.links.screenshots?.[0] ? (
          <a
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            href={item.links.screenshots[0]}
            rel="noreferrer"
            target="_blank"
          >
            View screenshots
          </a>
        ) : null}
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
  );
};
