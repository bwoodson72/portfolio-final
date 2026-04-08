import Link from "next/link";

const cards = [
  {
    eyebrow: "Single-page",
    heading: "Conversion-focused landing page",
    bestFor: "Ad campaigns, product launches, single-service pages",
    includes: [
      "High-performance single page",
      "Conversion-focused copy",
      "Lead capture form",
      "GA4 + conversion tracking",
      "On-page SEO",
      "Mobile-first responsive build",
      "Deployed and live",
    ],
    highlighted: false,
  },
  {
    eyebrow: "Multi-page",
    heading: "Full business website",
    bestFor: "Local service businesses, consultants, companies replacing an outdated site",
    includes: [
      "Complete multi-page site",
      "Conversion-focused copywriting",
      "Dedicated service pages",
      "Google Business Profile setup",
      "Review widget integration",
      "GA4 + conversion tracking",
      "On-page SEO",
      "Deployed and live",
    ],
    highlighted: true,
  },
  {
    eyebrow: "Custom",
    heading: "Growth-focused build",
    bestFor: "Competitive markets, multi-location businesses, businesses investing in ongoing SEO",
    includes: [
      "Everything in the full website build",
      "Service-area pages",
      "Ongoing keyword research",
      "Monthly SEO content",
      "Quarterly performance review",
    ],
    highlighted: false,
  },
];

export const ServicePackages = () => {
  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          How projects are scoped
        </h2>
        <p className="max-w-2xl text-lg text-text-muted">
          Every business has a different starting point. Projects are scoped around the business goal — not forced into a generic package.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.heading}
            className={`flex flex-col rounded-3xl border bg-surface p-8 shadow-sm ${card.highlighted ? "border-border-strong" : "border-border"}`}
          >
            <div className="mb-4">
              {card.highlighted && (
                <div className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                  Most common
                </div>
              )}
              <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
                {card.eyebrow}
              </div>
              <h3 className="text-xl font-bold text-text">{card.heading}</h3>
            </div>

            <p className="text-sm text-text-muted">
              <span className="font-bold text-text">Best for:</span> {card.bestFor}
            </p>

            <div className="mt-6 grow space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Typically includes</h4>
              <ul className="space-y-2">
                {card.includes.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-text-muted">
                    <span className="text-text font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-text-muted">
        Every project is fixed-price and scoped before work begins. Not sure which fits?{" "}
        <Link href="/#audit" className="text-text underline underline-offset-2 hover:opacity-80">
          Start with a free site review.
        </Link>
      </p>

      <p className="mt-4 text-center text-sm text-text-muted">
        We take on 2–3 projects at a time to keep quality high.
      </p>
    </section>
  );
};
