import {
  howIWorkSteps,
  whatINeedChecklist,
} from "@/content/portfolio";
import { AnalyticsLink } from "@/components/portfolio/analytics-link";

export type HowIWorkProps = {
  intakeUrl: string;
};

export const HowIWork = ({ intakeUrl }: HowIWorkProps): JSX.Element => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          How I work
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          A tight process built for speed and clarity
        </h2>
        <p className="max-w-2xl text-base text-slate-600">
          You get a fixed-scope plan, weekly async updates, and clear handoffs.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {howIWorkSteps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {index + 1}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          What I need from you
        </h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
          {whatINeedChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-6">
          <AnalyticsLink
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            eventName="intake_click"
            href={intakeUrl}
            rel="noreferrer"
            target="_blank"
          >
            Submit intake (5 min)
          </AnalyticsLink>
        </div>
      </div>
    </section>
  );
};
