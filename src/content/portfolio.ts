export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "Do you write the content/copy?",
    answer: "No. You'll need to provide your text, logo, and any images before we start. If you need a copywriter, I'm happy to recommend one. Projects start faster and deliver better results when content is ready on day one."
  },
  {
    question: "What do you need from me to get started?",
    answer: "Your content (text and images), any branding (logo, colors, fonts), and a clear idea of what pages you need. If you have a site you like the look of, share it — it helps me understand your style preferences quickly."
  },
  {
    question: "Will my site rank on Google?",
    answer: "Every page is built with proper SEO metadata, canonical URLs, and a sitemap submitted-ready. That gives search engines everything they need to index your site correctly. Rankings depend on your content and competition — I build the right technical foundation, the rest is up to your market."
  },
  {
    question: "Can you match a design I like?",
    answer: "I can match the general style, layout feel, and color scheme of a site you like. I don't do pixel-perfect Figma-to-code conversions unless that's scoped separately. If you have a Figma file, message me before ordering."
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer: "Not as a standard package, but reach out after delivery and we can work something out. Small updates, content changes, and performance checks are all things I can quote on a per-request basis."
  },
  {
    question: "How do revisions work?",
    answer: "Each package includes a set number of revisions. A revision means changes to existing pages — not adding new pages or features after the scope is agreed. Anything outside the original scope is quoted as an extra."
  },
  {
    question: "Why Next.js instead of WordPress?",
    answer: "WordPress is fine for simple blogs. For a business site that needs to load fast, rank well, and scale cleanly, Next.js is the better tool. No plugins to update, no security patches, no page builders slowing you down. The 98 Performance score in my portfolio isn't achievable on a typical WordPress build."
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
    headline: "A website you're actually proud to share",
    subheadline: "I build fast, modern websites for small businesses — sites that load instantly, rank on Google, and make people take you seriously. Fixed price, clear scope, delivered in weeks.",
    ctaPrimary: "See my work",
    ctaSecondary: "View packages"
  },

  stats: [
    { label: "Performance", value: "98" },
    { label: "SEO", value: "100" },
    { label: "Best Practices", value: "100" },
    { label: "Accessibility", value: "96" },
  ],

  packages: [
    {
      name: "Business Site",
      priceFrom: 750,
      description: "A clean, fast multi-page website for your local business. Built to rank and built to last.",
      deliverables: [
        "Up to 5 pages",
        "Contact form with validation",
        "SEO metadata + canonical URLs",
        "Mobile responsive",
        "Deployed to Vercel",
        "2 revisions",
      ],
      timeline: "14 days",
      idealFor: ["Local service businesses", "Professionals", "Contractors"]
    },
    {
      name: "Full Business Site",
      priceFrom: 1200,
      description: "A complete business website with performance optimization, SEO infrastructure, and a guaranteed Lighthouse score.",
      deliverables: [
        "Up to 8 pages",
        "Contact form with validation",
        "SEO metadata + canonical URLs",
        "Generated sitemap",
        "FAQ page",
        "Mobile responsive",
        "Deployed to Vercel",
        "95+ Lighthouse score guaranteed",
        "3 revisions",
      ],
      timeline: "21 days",
      idealFor: ["Established local businesses", "Service companies", "Anyone who wants it done right"],
      recommended: true,
    },
  ],

  about: {
    headline: "Next.js websites built to perform",
    body: [
      "I'm Brian Woodson, a frontend developer specializing in Next.js. I build websites for local businesses that are fast, easy to find on Google, and built to last.",
      "Every site I deliver is production-ready — clean code, proper SEO foundations, and deployed to Vercel. No page builders, no bloated plugins, no WordPress maintenance headaches.",
      "Fixed scope on every project. You know exactly what you're getting, what it costs, and when it ships."
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"]
  },

  cta: {
    headline: "Let's build something you're proud of",
    body: "Tell me about your project. I'll get back to you within one business day with a clear scope and fixed price.",
    email: "hello@brianwoodson.com"
  }
};