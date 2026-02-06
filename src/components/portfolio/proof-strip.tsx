import { proofBadges } from "@/content/portfolio";

export const ProofStrip = (): JSX.Element => {
  return (
    <section className="border-y border-slate-200 bg-white/80 py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-6">
        {proofBadges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
};
