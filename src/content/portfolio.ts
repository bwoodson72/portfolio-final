export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "Do you write the content/copy?",
    answer: "Yes — copywriting is one of our core services. We can write your website copy from scratch, or refine what you already have. If you bring your own content, we'll make sure it fits the design and reads well on screen."
  },
  {
    question: "What do you need from us to get started?",
    answer: "Your branding basics (logo, colors, fonts if you have them), a clear idea of what pages you need, and any reference sites you like. If you don't have content ready, our copywriting team handles that. We'll scope everything before work begins."
  },
  {
    question: "Will my site rank on Google?",
    answer: "Every site ships with technical SEO foundations — metadata, canonical URLs, sitemap, structured data, and fast load times. Our SEO service goes further: keyword research, on-page optimization, and a content strategy to help you compete in local search. Rankings depend on your market and content — we build the infrastructure and the strategy."
  },
  {
    question: "Can you match a design I like?",
    answer: "Our design team can work from a reference site, a mood board, or a blank canvas. We'll present concepts before building anything, so you approve the direction early. If you have a Figma file, we can build from that too — just let us know when you reach out."
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Yes. After launch, we offer monthly retainers for content updates, performance monitoring, and SEO adjustments. Many clients start with a build and add ongoing support once they see results."
  },
  {
    question: "How do revisions work?",
    answer: "Each package includes a set number of design revisions. A revision means changes to existing pages — not adding new pages or features after scope is locked. Anything beyond the original scope gets quoted separately so there are no surprises."
  },
  {
    question: "Why Next.js instead of WordPress?",
    answer: "WordPress is fine for simple blogs. For a business site that needs to load fast, rank well, and scale cleanly, Next.js is the better tool. No plugins to maintain, no security patches, no page builders slowing things down. The 98+ performance scores in our portfolio aren't achievable on a typical WordPress build."
  },
  {
    question: "Who actually does the work?",
    answer: "Brian Woodson leads every project and handles all development. Design, copywriting, and SEO are handled by vetted specialists we've worked with across dozens of projects. You'll always have a single point of contact — Brian — and the same team from kickoff to launch."
  },
  {
    question: "How is this different from a big agency?",
    answer: "No account managers, no layers, no bloated timelines. You talk directly to the people doing the work. We keep our client list small so every project gets full attention — not a ticket in a queue. Agency-level output, without the agency overhead or price tag."
  },
];

export type PackageTier = {
  name: string;
  priceFrom: number;
  description: string;
  deliverables: string[];
  timeline: string;
  idealFor: string[];
  recommended?: boolean;
};

export type SiteContent = {
  hero: { headline: string; subheadline: string; ctaPrimary: string; ctaSecondary: string };
  stats?: { label: string; value: string }[];
  packages: PackageTier[];
  about: { headline: string; body: string[]; stack: string[] };
  cta: { headline: string; body: string; email: string };
};

export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~0177723984e7978280";
export const INTAKE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfP-GqX9W9T9x9/viewform";

export const siteContent: SiteContent = {
  hero: {
    headline: "Your website should be your best salesperson",
    subheadline: "Most small business websites cost money every month and bring in nothing. We design, write, and build sites that load fast, rank on Google, and actually drive leads — for a fixed price, delivered in weeks.",
    ctaPrimary: "See our work",
    ctaSecondary: "View packages"
  },

  stats: [
    { label: "Load Time", value: "< 1s" },
    { label: "Google-Ready", value: "SEO Built In" },
    { label: "Delivery", value: "2–3 Weeks" },
    { label: "Maintenance Fees", value: "$0/mo" },
  ],

  packages: [
    {
      name: "Business Site",
      priceFrom: 750,
      description: "A professional website that makes your business look as good online as it is in person. Fast, mobile-friendly, and built to get found.",
      deliverables: [
        "Custom design + development",
        "Up to 5 pages",
        "Contact form with validation",
        "SEO metadata + canonical URLs",
        "Mobile responsive",
        "Deployed to Vercel",
        "2 design revisions",
      ],
      timeline: "14 days",
      idealFor: ["Local service businesses", "Professionals", "Contractors"]
    },
    {
      name: "Full Business Site",
      priceFrom: 1500,
      description: "Everything in the Business Site, plus copywriting, advanced SEO, and a site built to compete for search traffic. The complete package.",
      deliverables: [
        "Custom design + development",
        "Professional copywriting",
        "Up to 8 pages",
        "Contact form with validation",
        "SEO metadata + canonical URLs + sitemap",
        "On-page SEO optimization",
        "FAQ page with schema markup",
        "Mobile responsive",
        "Deployed to Vercel",
        "95+ Lighthouse score guaranteed",
        "3 design revisions",
      ],
      timeline: "21 days",
      idealFor: ["Established local businesses", "Service companies", "Anyone who wants it done right"],
      recommended: true,
    },
  ],

  about: {
    headline: "A small team that builds websites worth paying for",
    body: [
      "We're Brian Woodson Web Development — a distributed studio that designs, writes, and builds websites for small businesses. Not template sites. Not WordPress. Custom-built, fast, and done right.",
      "Every site we ship loads in under a second, scores 95+ on Google's performance audit, and comes with the SEO foundations you need to get found. No plugins to maintain, no monthly fees, no surprises after launch.",
      "We keep our client list small on purpose. Fixed scope on every project — you know exactly what you're getting, what it costs, and when it ships."
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"]
  },

  cta: {
    headline: "Let's talk about your project",
    body: "Tell us what your business does and what you need from your website. We'll reply within one business day with a clear scope, a fixed price, and a timeline.",
    email: "hello@brianwoodson.com"
  }
};