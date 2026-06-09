export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
    {
        question: "Do you write the copy?",
        answer: "Yes. Copywriting is included in every project. We research your business, your services, and your customers, then write copy you review and approve before anything gets built."
    },
    {
        question: "What does a website build actually include?",
        answer: "Every build includes custom design, development, conversion-focused copywriting, on-page SEO foundations, schema markup, GA4 tracking, and a full handoff at launch. Scope varies by project but there are no hidden extras for the core deliverables."
    },
    {
        question: "Will my site rank on Google?",
        answer: "Every site ships with the technical SEO foundations that make ranking possible: metadata, schema markup, canonical setup, sitemap, and location-specific signals. Rankings depend on your market and competition. We build the infrastructure that gives you the best possible shot and are honest about what to expect for your specific situation."
    },
    {
        question: "Why not WordPress?",
        answer: "WordPress sites built with page builders load slowly on mobile, require constant maintenance, and rarely score above 70 on Google's performance audit. Every site we build scores 95 or better across all four Lighthouse categories. That gap is a ranking factor, not a cosmetic difference."
    },
    {
        question: "How does pricing work?",
        answer: "Every project is fixed-price and scoped before work begins. After a short conversation about your business and goals, you get a clear scope document and a quoted price for the full engagement. No hourly billing, no surprise invoices."
    },
    {
        question: "How do revisions work?",
        answer: "Each project includes defined revision rounds based on scope: one for landing pages, two for full website builds. A revision means changes to existing pages, not adding new pages or features after scope is locked. Anything beyond the original scope is quoted separately."
    },
    {
        question: "Who does the work?",
        answer: "Brian Woodson leads every project and handles all development. Design, copywriting, and SEO are handled by vetted specialists. You have one point of contact from kickoff to launch."
    },
    {
        question: "Do you offer ongoing support after launch?",
        answer: "Yes. Ongoing Support is available for sites we build and covers hosting, security updates, content updates, and monthly performance reporting. It is not available for WordPress, Wix, or Squarespace sites we did not build."
    },
];

export type AddOn = {
  label: string;
};

export type PackageTier = {
  name: string;
  description: string;
  deliverables: string[];
  monthlyIncludes: string[];
  addOns: AddOn[];
  timeline: string;
  idealFor: string[];
  recommended?: boolean;
};

export type SiteContent = {
  hero: { headline: string; subheadline: string; ctaPrimary: string; ctaSecondary: string };
  packages: PackageTier[];
  about: { headline: string; body: string[]; stack: string[] };
  cta: { headline: string; body: string; email: string };
};

export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~0177723984e7978280";
export const INTAKE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfP-GqX9W9T9x9/viewform";

export const siteContent: SiteContent = {
  hero: {
    headline: "Website Development Services for Small Businesses",
    subheadline: "Custom-coded websites for small businesses in DFW. Built with real competitor research, keyword strategy, fast mobile performance, clear copy, and no WordPress or page builders.",
    ctaPrimary: "See our work",
    ctaSecondary: "View services"
  },

  packages: [
    {
      name: "Landing Page",
      description: "A single conversion-ready page with copy, SEO, and tracking built in. We write it, build it, and keep it running.",
      deliverables: [
        "Single high-performance page built to convert",
        "Conversion-focused copywriting (we write it)",
        "Responsive across all devices",
        "Contact or lead capture form",
        "GA4 + conversion tracking setup",
        "On-page SEO optimization",
        "Deployed and live",
        "1 round of revisions",
      ],
      monthlyIncludes: [
        "Hosting, security, and uptime monitoring",
        "Content updates (up to 2 requests/month)",
        "Monthly performance report",
        "Security and dependency updates",
      ],
      addOns: [
        { label: "Custom Figma design" },
        { label: "Form & tool integrations (HubSpot, Calendly, etc.)" },
      ],
      timeline: "3–5 days",
      idealFor: ["Ad campaigns", "Product launches", "Service pages"],
    },
    {
      name: "Website Build",
      description: "A complete multi-page website built to get your business found on Google and convert visitors into leads. Copy, SEO, reviews, and GBP setup included.",
      deliverables: [
        "Complete multi-page site (up to 5 pages)",
        "Conversion-focused copywriting (we write it)",
        "Dedicated service pages",
        "Google Business Profile setup and optimization",
        "Review widget integration",
        "GA4 + conversion tracking setup",
        "On-page SEO for all pages",
        "Contact forms with validation",
        "Responsive across all devices",
        "Deployed and live",
        "2 rounds of revisions",
      ],
      monthlyIncludes: [
        "Hosting, security, and uptime monitoring",
        "Content updates (up to 3 requests/month)",
        "Monthly performance report",
        "Security and dependency updates",
      ],
      addOns: [
        { label: "Custom Figma design" },
        { label: "Additional pages beyond 5" },
        { label: "Form & tool integrations (HubSpot, Calendly, etc.)" },
      ],
      timeline: "2–3 weeks",
      idealFor: ["Local businesses", "Service companies", "Consultants"],
      recommended: true,
    },
    {
      name: "Growth Build",
      description: "Everything in Website Build, plus service-area pages, ongoing SEO content, and quarterly strategy calls. For businesses in competitive markets.",
      deliverables: [
        "Complete multi-page site (up to 10 pages)",
        "Conversion-focused copywriting (we write it)",
        "Dedicated service pages + service-area pages",
        "Google Business Profile setup and optimization",
        "Review widget integration",
        "GA4 + conversion tracking setup",
        "On-page SEO for all pages",
        "Contact forms with validation",
        "Responsive across all devices",
        "Deployed and live",
        "2 rounds of revisions",
      ],
      monthlyIncludes: [
        "Everything in Website Build monthly",
        "Keyword research and on-page SEO",
        "2 blog posts per month targeting real search queries",
        "Content published and optimized for Google",
        "Quarterly performance review call",
      ],
      addOns: [
        { label: "Custom Figma design" },
        { label: "Additional pages beyond 10" },
        { label: "Form & tool integrations (HubSpot, Calendly, etc.)" },
        { label: "PPC landing pages" },
      ],
      timeline: "2–3 weeks",
      idealFor: ["Competitive markets", "Multi-service businesses", "Regional coverage"],
    },
  ],

  about: {
    headline: "A small team that builds websites worth paying for",
    body: [
      "We're Brian Woodson Web Development — a distributed studio that designs, writes, and builds websites for small businesses. Not template sites. Not WordPress. Custom-built, conversion-focused, and done right.",
      "Every site ships with the copy, SEO, and tracking your business needs to get found and convert visitors into leads. You own your site from day one — no contracts, no buyout fees, no hostage situation.",
      "Every project is scoped and priced before work begins. You know what you're getting, what it costs, and when it's done."
    ],
    stack: ["SEO-Ready", "Mobile-First", "Fixed Price", "You Own It", "No WordPress"]
  },

  cta: {
    headline: "Let's talk about your project",
    body: "Tell us what your business does and what you need from your website. We'll reply within one business day with questions, a recommended scope, and a straightforward quote.",
    email: "hello@brianwoodson.com"
  }
};
