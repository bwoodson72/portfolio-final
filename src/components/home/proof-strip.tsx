import { proofChips } from "@/content/portfolio";

export const ProofStrip = () => {
  return (
    <section id="proof" className="w-full py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {proofChips.map((chip) => (
            <div
              key={chip}
              className="text-[11px] md:text-xs font-bold uppercase tracking-wide rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1.5 text-[color:var(--color-text-muted-2)] hover:bg-[color:var(--color-surface-hover)] transition"
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
