export type PortfolioCategory = "MVP" | "BUGFIX" | "LANDING" | "FIGMA" | "ECOM";

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  title: string;
  description: string;
  outcomes: string[];
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  priceUsdMin: number;
  priceUsdMax: number;
  links: {
    upworkPackageUrl: string;
  };
};

export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~0177723984e7978280";
export const INTAKE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfP-GqX9W9T9x9/viewform"; // TODO placeholder

export const portfolioItems: PortfolioItem[] = [
  {
    id: "saas-onboarding-mvp",
    category: "MVP",
    title: "SaaS onboarding MVP",
    description: "Guided onboarding flow designed to reduce activation time.",
    outcomes: ["Reduce activation time by 40%", "Clear onboarding narrative", "Funnel analytics ready"],
    deliveryDaysMin: 14,
    deliveryDaysMax: 21,
    priceUsdMin: 3000,
    priceUsdMax: 5000,
    links: {
      upworkPackageUrl: "https://www.upwork.com/services/product/development-it-saas-onboarding-mvp-1871234567890123456",
    },
  },
  {
    id: "landing-conversion-sprint",
    category: "LANDING",
    title: "Landing page conversion sprint",
    description: "Lift conversion with benefit-driven copy and proof strips.",
    outcomes: ["Improve lead conversion", "Faster page load", "Clearer messaging"],
    deliveryDaysMin: 7,
    deliveryDaysMax: 14,
    priceUsdMin: 1500,
    priceUsdMax: 3000,
    links: {
      upworkPackageUrl: "https://www.upwork.com/services/product/development-it-landing-page-conversion-1871234567890123457",
    },
  },
  {
    id: "checkout-bugfix",
    category: "BUGFIX",
    title: "Checkout bugfix & stabilization",
    description: "Eliminate payment failures and stabilize the purchase flow.",
    outcomes: ["Fix critical failures", "Stabilize purchase flow", "Add error monitoring"],
    deliveryDaysMin: 3,
    deliveryDaysMax: 7,
    priceUsdMin: 1000,
    priceUsdMax: 2500,
    links: {
      upworkPackageUrl: "https://www.upwork.com/services/product/development-it-checkout-bugfix-1871234567890123458",
    },
  },
  {
    id: "figma-to-next",
    category: "FIGMA",
    title: "Figma-to-Next.js handoff",
    description: "Pixel-accurate implementation of your Figma designs into Next.js.",
    outcomes: ["Pixel-accurate UI", "Reusable components", "Fast page loads"],
    deliveryDaysMin: 10,
    deliveryDaysMax: 20,
    priceUsdMin: 2000,
    priceUsdMax: 4500,
    links: {
      upworkPackageUrl: "https://www.upwork.com/services/product/development-it-figma-to-next-1871234567890123459",
    },
  },
  {
    id: "ecommerce-speed",
    category: "ECOM",
    title: "E-commerce performance tune-up",
    description: "Optimize images, bundles, and cart flow for maximum speed.",
    outcomes: ["Improve Core Web Vitals", "Reduce cart abandonment", "Faster product pages"],
    deliveryDaysMin: 14,
    deliveryDaysMax: 28,
    priceUsdMin: 2500,
    priceUsdMax: 6000,
    links: {
      upworkPackageUrl: "https://www.upwork.com/services/product/development-it-ecommerce-speed-1871234567890123460",
    },
  },
  {
    id: "mvp-dashboard",
    category: "MVP",
    title: "B2B analytics dashboard MVP",
    description: "Decision-ready analytics dashboard with core KPI tracking.",
    outcomes: ["KPI visibility", "Unified data view", "Fast dashboard response"],
    deliveryDaysMin: 21,
    deliveryDaysMax: 42,
    priceUsdMin: 5000,
    priceUsdMax: 9000,
    links: {
      upworkPackageUrl: "https://www.upwork.com/services/product/development-it-b2b-dashboard-1871234567890123461",
    },
  },
  {
    id: "api-integration-sprint",
    category: "BUGFIX",
    title: "Third-party API integration",
    description: "Seamlessly connect your app with Stripe, Twilio, or any REST/GraphQL API.",
    outcomes: ["Secure API connection", "Robust error handling", "Clean data mapping"],
    deliveryDaysMin: 5,
    deliveryDaysMax: 12,
    priceUsdMin: 1200,
    priceUsdMax: 3500,
    links: {
      upworkPackageUrl: "https://www.upwork.com/services/product/development-it-api-integration-1871234567890123462",
    },
  },
  {
    id: "marketing-site-mvp",
    category: "LANDING",
    title: "SaaS marketing site MVP",
    description: "A high-converting 5-page marketing site for your new SaaS.",
    outcomes: ["Launch-ready site", "SEO optimized", "Mobile responsive"],
    deliveryDaysMin: 14,
    deliveryDaysMax: 28,
    priceUsdMin: 3500,
    priceUsdMax: 7000,
    links: {
      upworkPackageUrl: "https://www.upwork.com/services/product/development-it-marketing-site-mvp-1871234567890123463",
    },
  },
];

export const proofChips = [
  "Top Rated Plus on Upwork",
  "10+ years shipping Next.js",
  "Ship MVPs in 2–6 weeks",
  "Core Web Vitals focused",
  "Senior TypeScript specialist",
  "Founder-friendly delivery",
  "Direct 1:1 collaboration",
];

export const featuredOutcomes = [
  {
    tag: "MVP",
    title: "SaaS onboarding MVP",
    leadMetric: "Goal: Reduce activation time by 40% with a guided onboarding flow",
    upworkPackageUrl: "https://www.upwork.com/services/product/development-it-saas-onboarding-mvp-1871234567890123456",
  },
  {
    tag: "LANDING",
    title: "Landing page conversion sprint",
    leadMetric: "Goal: Improve lead conversion with clearer messaging + faster page load",
    upworkPackageUrl: "https://www.upwork.com/services/product/development-it-landing-page-conversion-1871234567890123457",
  },
  {
    tag: "BUGFIX",
    title: "Checkout bugfix & stabilization",
    leadMetric: "Goal: Fix critical checkout failures and stabilize purchase flow",
    upworkPackageUrl: "https://www.upwork.com/services/product/development-it-checkout-bugfix-1871234567890123458",
  },
];

export const howIWorkSteps = [
  {
    title: "Clarify scope",
    description: "We lock deliverables, constraints, and success criteria.",
  },
  {
    title: "Ship in slices",
    description: "Weekly checkpoints with visible progress.",
  },
  {
    title: "Stabilize + measure",
    description: "Fix edge cases, performance, and analytics.",
  },
  {
    title: "Clean handoff",
    description: "Docs, walkthrough, and next-step recommendations.",
  },
];

export const faqs = [
  {
    question: "What do you need from me to start?",
    answer: "I typically need access to your designs (Figma), any existing codebase, and a clear list of the outcome you're looking for.",
  },
  {
    question: "How do fixed-scope packages work on Upwork?",
    answer: "We define exactly what will be built and for what price. You fund the milestone on Upwork, and I get to work. No hourly surprises.",
  },
  {
    question: "What if we discover more work?",
    answer: "If the scope changes significantly, we can adjust the package or create a new one. I'm always transparent about what fits in a sprint.",
  },
  {
    question: "Do you do ongoing retainers?",
    answer: "Yes, once we've shipped a successful fixed-scope project, many clients move to an ongoing retainer for maintenance and new features.",
  },
  {
    question: "What stack do you work with?",
    answer: "I specialize in Next.js, TypeScript, Tailwind CSS, and various backends like Supabase, Postgres, and Node.js.",
  },
];
