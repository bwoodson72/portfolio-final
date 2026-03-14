export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "Do you write the content/copy?",
    answer: "Copywriting is available as an add-on for any project. We can write your website copy from scratch, or refine what you already have. If you bring your own content, we'll make sure it fits the design and reads well on screen."
  },
  {
    question: "What do you need from us to get started?",
    answer: "Your branding basics (logo, colors, fonts if you have them), a clear idea of what pages you need, and any reference sites you like. If you don't have content ready, we offer copywriting as an add-on. We'll scope everything before work begins."
  },
  {
    question: "Will my site rank on Google?",
    answer: "Every site ships with technical SEO foundations — metadata, canonical URLs, sitemap, structured data, and fast load times. Our content SEO add-on goes further: keyword research, on-page optimization, and a content strategy to help you compete in local search. Rankings depend on your market and content — we build the infrastructure and the strategy."
  },
  {
    question: "Can you match a design I like?",
    answer: "Our design add-on covers custom Figma mockups — we can work from a reference site, a mood board, or a blank canvas. We'll present concepts before building anything, so you approve the direction early. If you already have a Figma file, we can build from that too."
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Yes. After launch, we offer monthly retainers for content updates, performance monitoring, and SEO adjustments. Many clients start with a build and add ongoing support once they see results."
  },
  {
    question: "How do revisions work?",
    answer: "Each service includes a set number of revision rounds — 1 for landing pages, 2 for full website builds. A revision means changes to existing pages, not adding new pages or features after scope is locked. Anything beyond the original scope gets quoted separately so there are no surprises."
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
  {
    question: "What are the add-ons?",
    answer: "Every project starts with a base build — you provide the content and design direction, we code and deploy. Add-ons let you layer in services like custom Figma design, professional copywriting, Sanity CMS integration, analytics setup, form integrations, and content SEO. You only pay for what you need."
  },
];

export type AddOn = {
  label: string;
};

export type PackageTier = {
  name: string;
  priceFrom: number;
  description: string;
  deliverables: string[];
  addOns: AddOn[];
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
    subheadline: "Most small business websites cost money every month and bring in nothing. We design, write, and build sites that load fast, rank on Google, and actually drive leads — starting at $1,000.",
    ctaPrimary: "See our work",
    ctaSecondary: "View services"
  },

  stats: [
    { label: "Landing Pages", value: "From $1k" },
    { label: "Full Websites", value: "From $3.5k" },
    { label: "Google-Ready", value: "SEO Built In" },
    { label: "Fixed Price", value: "No Surprises" },
  ],

  packages: [
    {
      name: "Landing Page",
      priceFrom: 1000,
      description: "A single high-performance page built to convert — for ad campaigns, product launches, or a focused service offering. You provide the content, we build it fast.",
      deliverables: [
        "Custom single-page Next.js build",
        "Responsive across all devices",
        "Optimized for speed (sub-second load)",
        "Contact or lead capture form",
        "Deployed to Vercel",
        "1 round of revisions",
      ],
      addOns: [
        { label: "Custom Figma design" },
        { label: "Professional copywriting" },
        { label: "Sanity CMS integration" },
        { label: "Form & tool integrations (HubSpot, Calendly, etc.)" },
        { label: "Analytics setup (GA4, conversion tracking)" },
        { label: "Content SEO (keyword research, on-page optimization)" },
      ],
      timeline: "3–5 days",
      idealFor: ["Ad campaigns", "Product launches", "Service pages"],
    },
    {
      name: "Website Build",
      priceFrom: 3500,
      description: "A complete multi-page website designed to establish your business online, get found on Google, and convert visitors into leads. Built from scratch — no templates, no WordPress.",
      deliverables: [
        "Custom multi-page Next.js site (up to 5 pages)",
        "Responsive across all devices",
        "Optimized for speed (sub-second load)",
        "Contact form with validation",
        "SEO metadata + canonical URLs + sitemap",
        "Deployed to Vercel",
        "2 rounds of revisions",
      ],
      addOns: [
        { label: "Custom Figma design" },
        { label: "Professional copywriting" },
        { label: "Sanity CMS integration" },
        { label: "Additional pages beyond 5" },
        { label: "Form & tool integrations (HubSpot, Calendly, etc.)" },
        { label: "Analytics setup (GA4, conversion tracking)" },
        { label: "Content SEO (keyword research, on-page optimization)" },
      ],
      timeline: "2–3 weeks",
      idealFor: ["Local businesses", "Service companies", "Consultants", "Small agencies"],
      recommended: true,
    },
  ],

  about: {
    headline: "A small team that builds websites worth paying for",
    body: [
      "We're Brian Woodson Web Development — a distributed studio that designs, writes, and builds websites for small businesses. Not template sites. Not WordPress. Custom-built, fast, and done right.",
      "Every site we ship loads in under a second, scores 95+ on Google's performance audit, and comes with the SEO foundations you need to get found. No plugins to maintain, no monthly fees, no surprises after launch.",
      "Start with the base build and add what you need — design, copywriting, CMS, SEO. Every project is scoped and priced before work begins."
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"]
  },

  cta: {
    headline: "Let's talk about your project",
    body: "Tell us what your business does and what you need from your website. We'll reply within one business day with a clear scope, a fixed price, and a timeline.",
    email: "hello@brianwoodson.com"
  }
};