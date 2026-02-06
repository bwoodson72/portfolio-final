import { siteContent } from "@/content/portfolio";

export const PortfolioSection = () => {
  const { packages } = siteContent;

  return (
    <section id="packages" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-[color:var(--color-text)] md:text-5xl">
          Fixed-scope Packages
        </h2>
        <p className="max-w-2xl text-lg text-[color:var(--color-text-muted)]">
          Productized services with clear deliverables, fast timelines, and transparent pricing.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="flex flex-col rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-sm transition hover:border-[color:var(--color-border-strong)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[color:var(--color-text)]">{pkg.name}</h3>
              <div className="text-sm font-bold text-[color:var(--color-text)]">
                From ${pkg.priceFrom.toLocaleString()}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
              {pkg.description}
            </p>

            <div className="mt-8 space-y-6 flex-grow">
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">What's included</h4>
                <ul className="space-y-2">
                  {pkg.deliverables.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-[color:var(--color-text-muted)]">
                      <span className="text-[color:var(--color-text)] font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[color:var(--color-border)]">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                  <span>Timeline</span>
                  <span className="text-[color:var(--color-text)]">{pkg.timeline}</span>
                </div>
              </div>
            </div>

            <a
              href={`mailto:${siteContent.cta.email}?subject=Inquiry for ${pkg.name} Package`}
              className="mt-8 block w-full rounded-full bg-[color:var(--color-text)] py-3 text-center text-sm font-bold text-[color:var(--color-bg)] transition hover:opacity-90"
            >
              Get started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
