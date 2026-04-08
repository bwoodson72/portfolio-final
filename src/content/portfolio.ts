export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "Do you write the content/copy?",
    answer: "Copywriting is included in every project. We write your website copy from scratch based on your business, services, and target customers. You review and approve before anything goes live."
  },
  {
    question: "What do you need from us to get started?",
    answer: "Your branding basics (logo, colors, fonts if you have them), a clear idea of your services and service areas, and any reference sites you like. We handle copy, design direction, SEO, and everything else. We'll scope everything before work begins."
  },
  {
    question: "Will my site rank on Google?",
    answer: "Every site ships with on-page SEO, metadata, canonical URLs, sitemap, structured data, and Google Business Profile setup. Full-build projects can include ongoing keyword research and monthly blog content for businesses that want to invest in search visibility. Rankings depend on your market and competition — we build the infrastructure and, where scoped, execute the content strategy."
  },
  {
    question: "Can you match a design I like?",
    answer: "Our design add-on covers custom Figma mockups — we can work from a reference site, a mood board, or a blank canvas. We'll present concepts before building anything, so you approve the direction early. If you already have a Figma file, we can build from that too."
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Every project includes a post-launch support period covering hosting, security, uptime monitoring, content updates, and a monthly performance report. Full-build projects can also include ongoing SEO content — 2 blog posts per month, keyword research, and quarterly strategy calls. No contracts — cancel anytime."
  },
  {
    question: "How do revisions work?",
    answer: "Each project includes a defined number of revision rounds based on scope — typically 1 for landing pages and 2 for full website builds. A revision means changes to existing pages, not adding new pages or features after scope is locked. Anything beyond the original scope gets quoted separately so there are no surprises."
  },
  {
    question: "Why don't you use WordPress?",
    answer: "WordPress relies on plugins, page builders, and constant security patches. It's how most agencies build because it's fast for them — not because it's good for you. We use a modern build system that's faster, more secure, and doesn't need monthly maintenance. The 98+ performance scores in our portfolio aren't achievable on a typical WordPress build."
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
    answer: "Every project comes with copywriting, SEO, tracking, and GBP setup already included. Optional extras include custom Figma design, additional pages, tool integrations (HubSpot, Calendly), and PPC landing pages. You only pay for what goes beyond the base scope."
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
    headline: "Most business websites don't do anything. Yours should.",
    subheadline: "We build small business websites that get found on Google, load fast on mobile, and give visitors a reason to call.",
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
