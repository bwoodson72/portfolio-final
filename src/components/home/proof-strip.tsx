import { siteContent } from "@/content/portfolio";

export const ProofStrip = () => {
  const { stats } = siteContent;
  if (!stats) return null;

  return (
    <section id="proof" className="w-full py-12 border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center space-y-1"
            >
              <div className="text-2xl font-bold text-[color:var(--color-text)] md:text-3xl">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
