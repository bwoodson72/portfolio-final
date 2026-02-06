import { packageOptions } from "@/content/portfolio";
import { AnalyticsLink } from "@/components/portfolio/analytics-link";

export const PackageMatcher = (): JSX.Element => {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 py-16"
      id="packages"
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Packages & pricing
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          Pick the package that matches your need
        </h2>
        <p className="max-w-2xl text-base text-slate-600">
          Fixed-scope engagements designed for Upwork clients. Clear deliverables,
          fast timelines, and outcome-focused execution.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {packageOptions.map((option) => (
          <div
            key={option.id}
            className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {option.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{option.bestFor}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {option.priceGuidance}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Timeline: {option.timeline}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {option.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <AnalyticsLink
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                eventName="package_click"
                href={option.upworkPackageUrl}
                rel="noreferrer"
                target="_blank"
              >
                View package on Upwork
              </AnalyticsLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
