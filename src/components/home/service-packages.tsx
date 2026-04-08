import Link from "next/link";

const services = [
  {
    title: "Website Rebuilds",
    summary: "Replace an outdated, slow, or underperforming site with a modern build that loads fast, ranks on Google, and converts visitors into leads.",
    benefits: [
      "Stronger first impression on mobile",
      "Cleaner path to contact and conversion",
      "Better performance in search results",
      "Built to last without constant maintenance",
    ],
    bestFor: "Businesses whose current site is outdated, slow, or not generating leads",
  },
  {
    title: "Landing Pages",
    summary: "A focused single-page build for ad campaigns, service-area targeting, or any situation where a dedicated conversion page outperforms a general website.",
    benefits: [
      "Higher conversion rate from paid traffic",
      "Less distraction, clearer call to action",
      "Fast to build and deploy",
      "Purpose-built for one goal",
    ],
    bestFor: "Ad campaigns, product launches, and service-area pages",
  },
  {
    title: "Performance Optimization",
    summary: "If your site is slow, visitors leave before they ever see your content. We diagnose and fix the issues costing you speed, rankings, and conversions.",
    benefits: [
      "Lower bounce rate on mobile",
      "Better Google search rankings",
      "Faster perceived load for visitors",
      "Stronger trust signal for new visitors",
    ],
    bestFor: "Businesses with a site that's functional but slow or technically weak",
  },
  {
    title: "Technical SEO Foundations",
    summary: "Metadata, structured data, sitemaps, canonical setup, and crawl health. The technical infrastructure that makes everything else you do in search more effective.",
    benefits: [
      "Google can find and index your pages",
      "Clean structure for long-term rankings",
      "Reduced duplicate or orphaned content",
      "Better search appearance with structured data",
    ],
    bestFor: "Businesses that have content but aren't showing up in search",
  },
  {
    title: "Copywriting and Messaging",
    summary: "We write the copy for every site we build. Clear, conversion-focused writing that tells visitors what you do, why it matters, and what to do next.",
    benefits: [
      "Clearer value proposition for cold visitors",
      "Stronger CTAs and higher conversion rates",
      "Consistent tone across every page",
      "No placeholder text or generic filler",
    ],
    bestFor: "Every project — copy is included, not an afterthought",
  },
  {
    title: "Ongoing Support",
    summary: "Post-launch support covering hosting, security, uptime monitoring, content updates, and monthly performance reporting. Your site stays current without you managing it.",
    benefits: [
      "No server or hosting to manage",
      "Content updates without needing a developer",
      "Monthly performance visibility",
      "Security and dependency updates handled",
    ],
    bestFor: "Any business that wants the site maintained after launch",
  },
];

export const ServicePackages = () => {
  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-6 py-24 border-t border-border">
      <div className="space-y-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Services
        </h2>
        <p className="max-w-2xl text-lg text-text-muted">
          We help small businesses get found on Google and turn website visitors into leads. Work is scoped around what your business actually needs — not forced into a generic package.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-col rounded-3xl border border-border bg-surface p-8 space-y-4"
          >
            <h3 className="text-lg font-bold text-text">{service.title}</h3>
            <p className="text-sm leading-relaxed text-text-muted">{service.summary}</p>
            <ul className="space-y-2 mt-2">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2 text-xs text-text-muted">
                  <span className="text-text font-bold shrink-0">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted-2 pt-2 border-t border-border mt-auto">
              Best for: {service.bestFor}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
        <Link
          href="/services"
          className="rounded-full bg-text px-8 py-3 text-sm font-bold text-bg transition hover:opacity-90"
        >
          Explore services
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-border px-8 py-3 text-sm font-bold text-text transition hover:border-border-strong"
        >
          Start a conversation
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-text-muted">
        We take on 2–3 projects at a time to keep quality high.
      </p>
    </section>
  );
};
