import Link from "next/link";
import { featuredOutcomes } from "@/content/portfolio";

export const FeaturedOutcomes = () => {
  return (
    <section id="work" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="space-y-4">
        <p className="text-sm font-bold tracking-widest text-[color:var(--color-text-muted-2)] uppercase">
          FEATURED OUTCOMES
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text)] md:text-5xl">
          The kind of wins you can expect
        </h2>
        <p className="max-w-2xl text-lg text-[color:var(--color-text-muted-2)]">
          These are fixed-scope engagements focused on measurable outcomes, fast
          timelines, and clean handoffs.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featuredOutcomes.map((study) => (
          <div
            key={study.title}
            className="flex flex-col rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--color-border-strong)]"
          >
            <div className="mb-4 inline-block self-start rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-hover)] px-3 py-1 text-[10px] font-bold tracking-wider text-[color:var(--color-text-muted-2)] uppercase">
              {study.tag}
            </div>
            <h3 className="text-xl font-bold text-[color:var(--color-text)]">{study.title}</h3>
            <p className="mt-4 flex-grow text-sm leading-relaxed text-[color:var(--color-text-muted-2)]">
              {study.leadMetric}
            </p>
            <Link
              href={study.upworkPackageUrl}
              className="mt-8 text-sm font-bold text-[color:var(--color-text)] hover:text-[color:var(--color-accent)] underline-offset-4 hover:underline"
            >
              View package
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
