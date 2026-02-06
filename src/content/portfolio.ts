export type PortfolioCategory = "MVP" | "BUGFIX" | "LANDING" | "FIGMA" | "ECOM";

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  oneLinerOutcome: string;
  problem: string[];
  solution: string[];
  deliverables: string[];
  stack: string[];
  timeline: string;
  links: {
    loomUrl?: string;
    screenshots?: string[];
    repoUrl?: string;
    upworkPackageUrl: string;
  };
  images: {
    thumbnail: string;
    gallery?: string[];
  };
};

export type HowIWorkStep = {
  title: string;
  description: string;
};

export type PackageOption = {
  id: string;
  name: string;
  bestFor: string;
  scope: string[];
  timeline: string;
  priceGuidance: string;
  upworkPackageUrl: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "saas-onboarding-mvp",
    title: "SaaS onboarding MVP",
    category: "MVP",
    oneLinerOutcome:
      "TODO: Reduced activation time by 40% with a guided onboarding flow.",
    problem: [
      "TODO: New users were dropping before reaching the first key action.",
      "TODO: Product lacked a clear onboarding narrative and checkpoints.",
    ],
    solution: [
      "Designed a progressive onboarding checklist with contextual prompts.",
      "Shipped an analytics-ready funnel to identify drop-off points.",
    ],
    deliverables: [
      "Onboarding flow (3-step wizard)",
      "Event instrumentation plan",
      "Activation dashboard (v1)",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    timeline: "3 weeks",
    links: {
      loomUrl: "TODO: https://loom.com/share/onboarding-walkthrough",
      screenshots: ["/images/portfolio/onboarding-mvp.png"],
      upworkPackageUrl: "TODO: https://www.upwork.com/services/product/onboarding-mvp",
    },
    images: {
      thumbnail: "/images/portfolio/onboarding-mvp-thumb.png",
      gallery: ["/images/portfolio/onboarding-mvp.png"],
    },
  },
  {
    id: "landing-conversion-sprint",
    title: "Landing page conversion sprint",
    category: "LANDING",
    oneLinerOutcome:
      "TODO: Lifted booked calls by 28% with a benefit-driven hero and proof strip.",
    problem: [
      "TODO: Messaging was feature-heavy with unclear differentiation.",
      "TODO: Page lacked social proof and clear next steps.",
    ],
    solution: [
      "Rewrote the hero to emphasize outcomes and time-to-value.",
      "Added proof strip, testimonials, and tighter CTA placement.",
    ],
    deliverables: [
      "Hero + value props rewrite",
      "New testimonial/proof section",
      "CTA + form optimization",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind"],
    timeline: "1.5 weeks",
    links: {
      screenshots: ["/images/portfolio/landing-conversion.png"],
      upworkPackageUrl:
        "TODO: https://www.upwork.com/services/product/landing-conversion-sprint",
    },
    images: {
      thumbnail: "/images/portfolio/landing-conversion-thumb.png",
      gallery: ["/images/portfolio/landing-conversion.png"],
    },
  },
  {
    id: "checkout-bugfix",
    title: "Checkout bugfix & stabilization",
    category: "BUGFIX",
    oneLinerOutcome:
      "TODO: Eliminated payment failures and restored 99.9% checkout success.",
    problem: [
      "TODO: Payment flow was failing for repeat customers.",
      "TODO: Monitoring lacked actionable error grouping.",
    ],
    solution: [
      "Isolated the failing edge case with targeted logging.",
      "Patched retries and introduced guardrails for stale sessions.",
    ],
    deliverables: [
      "Bugfix patch + regression tests",
      "Sentry alerts for payment flow",
      "Post-mortem summary",
    ],
    stack: ["Next.js", "TypeScript", "Stripe", "Sentry"],
    timeline: "4 days",
    links: {
      loomUrl: "TODO: https://loom.com/share/checkout-bugfix",
      screenshots: ["/images/portfolio/checkout-bugfix.png"],
      upworkPackageUrl:
        "TODO: https://www.upwork.com/services/product/checkout-bugfix",
    },
    images: {
      thumbnail: "/images/portfolio/checkout-bugfix-thumb.png",
      gallery: ["/images/portfolio/checkout-bugfix.png"],
    },
  },
  {
    id: "figma-to-next",
    title: "Figma-to-Next.js handoff",
    category: "FIGMA",
    oneLinerOutcome:
      "TODO: Delivered pixel-accurate marketing pages in under 10 days.",
    problem: [
      "TODO: Design team needed fast, reliable implementation support.",
      "TODO: Existing UI lacked a reusable component system.",
    ],
    solution: [
      "Mapped Figma components to a typed design system.",
      "Built reusable sections for rapid iteration.",
    ],
    deliverables: [
      "Component library (8 core components)",
      "Marketing page templates",
      "Documentation handoff",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Storybook"],
    timeline: "2 weeks",
    links: {
      screenshots: ["/images/portfolio/figma-handoff.png"],
      upworkPackageUrl:
        "TODO: https://www.upwork.com/services/product/figma-to-next",
    },
    images: {
      thumbnail: "/images/portfolio/figma-handoff-thumb.png",
      gallery: ["/images/portfolio/figma-handoff.png"],
    },
  },
  {
    id: "ecommerce-optimization",
    title: "E-commerce performance tune-up",
    category: "ECOM",
    oneLinerOutcome:
      "TODO: Improved Core Web Vitals and reduced cart abandonment by 18%.",
    problem: [
      "TODO: Slow product pages were hurting conversions.",
      "TODO: Cart UX had friction at shipping selection.",
    ],
    solution: [
      "Optimized images, bundles, and lazy loading for key pages.",
      "Simplified cart flow with clearer totals and inline validation.",
    ],
    deliverables: [
      "Performance audit summary",
      "Optimized product templates",
      "Cart UX improvements",
    ],
    stack: ["Next.js", "TypeScript", "Shopify", "Tailwind"],
    timeline: "2.5 weeks",
    links: {
      loomUrl: "TODO: https://loom.com/share/ecom-performance",
      screenshots: ["/images/portfolio/ecom-optimization.png"],
      upworkPackageUrl:
        "TODO: https://www.upwork.com/services/product/ecommerce-optimization",
    },
    images: {
      thumbnail: "/images/portfolio/ecom-optimization-thumb.png",
      gallery: ["/images/portfolio/ecom-optimization.png"],
    },
  },
  {
    id: "mvp-dashboard",
    title: "B2B analytics dashboard MVP",
    category: "MVP",
    oneLinerOutcome:
      "TODO: Shipped a decision-ready analytics dashboard in 4 weeks.",
    problem: [
      "TODO: Stakeholders lacked visibility into weekly KPIs.",
      "TODO: Data was trapped across multiple tools.",
    ],
    solution: [
      "Unified core metrics into a single dashboard view.",
      "Added role-based views for sales and ops.",
    ],
    deliverables: [
      "Dashboard MVP (6 core widgets)",
      "KPI definitions + data model",
      "Rollout checklist",
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Tailwind"],
    timeline: "4 weeks",
    links: {
      screenshots: ["/images/portfolio/mvp-dashboard.png"],
      upworkPackageUrl:
        "TODO: https://www.upwork.com/services/product/b2b-dashboard-mvp",
    },
    images: {
      thumbnail: "/images/portfolio/mvp-dashboard-thumb.png",
      gallery: ["/images/portfolio/mvp-dashboard.png"],
    },
  },
];

export const proofBadges: string[] = [
  "Top Rated Plus on Upwork",
  "10+ years shipping Next.js",
  "Ship MVPs in 2-6 weeks",
  "Core Web Vitals focused",
  "Senior TypeScript specialist",
  "Founder-friendly delivery",
  "Direct 1:1 collaboration",
];

export const howIWorkSteps: HowIWorkStep[] = [
  {
    title: "Align on outcomes",
    description:
      "We define the outcome, success metrics, and the fastest path to prove value.",
  },
  {
    title: "Plan a fixed scope",
    description:
      "You get a clear scope, timeline, and deliverables before we start building.",
  },
  {
    title: "Build + iterate",
    description:
      "Weekly progress updates with Loom walkthroughs and checkpoint demos.",
  },
  {
    title: "Launch + stabilize",
    description:
      "Performance checks, QA, and a handoff package so you can keep momentum.",
  },
];

export const whatINeedChecklist: string[] = [
  "Access to existing design files or brand guidelines",
  "Your top 1-2 business goals for this project",
  "Any must-have integrations (payments, CRM, analytics)",
  "Stakeholders for weekly async reviews",
];

export const packageOptions: PackageOption[] = [
  {
    id: "mvp-launch",
    name: "MVP Launch Package",
    bestFor: "Founders validating a new product idea fast",
    scope: [
      "Outcome-driven MVP plan",
      "Core user flows",
      "Analytics-ready release",
    ],
    timeline: "3-6 weeks",
    priceGuidance: "TODO: $4k-$9k fixed scope",
    upworkPackageUrl: "TODO: https://www.upwork.com/services/product/mvp-launch",
  },
  {
    id: "growth-landing",
    name: "Landing Page Growth",
    bestFor: "Marketing teams that need better conversions",
    scope: [
      "Messaging refresh",
      "Hero + proof redesign",
      "CTA + funnel optimization",
    ],
    timeline: "1-2 weeks",
    priceGuidance: "TODO: $1.5k-$3k fixed scope",
    upworkPackageUrl:
      "TODO: https://www.upwork.com/services/product/landing-page-growth",
  },
  {
    id: "stability-sprint",
    name: "Stability Sprint",
    bestFor: "Teams with bugs, regressions, or performance fires",
    scope: [
      "Audit + bug triage",
      "Fixes + regression tests",
      "Performance improvements",
    ],
    timeline: "1-3 weeks",
    priceGuidance: "TODO: $2k-$6k fixed scope",
    upworkPackageUrl:
      "TODO: https://www.upwork.com/services/product/stability-sprint",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "How do fixed-scope packages work on Upwork?",
    answer:
      "We align on scope and deliverables upfront. You purchase a package and I deliver against that exact scope with weekly updates.",
  },
  {
    question: "Can we customize a package?",
    answer:
      "Yes. Start with the closest package and we will tailor the scope before you purchase.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "A short intake, access to existing assets, and a single decision-maker for fast feedback.",
  },
  {
    question: "Do you work with existing teams?",
    answer:
      "Absolutely. I can plug into your team, pair with designers, and coordinate with product or engineering leads.",
  },
];
