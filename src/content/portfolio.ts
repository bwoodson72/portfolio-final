export type LinkSet = {
  repoUrl?: string;
  liveUrl?: string;
  loomUrl?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  problem: string[];       // bullet points
  solution: string[];      // bullet points
  deliverables: string[];  // bullet points
  stack: string[];         // simple list
  timeline?: string;       // “2–3 weeks”
  role?: string;           // “Full-stack”
  links?: LinkSet;
  screenshots?: { src: string; alt: string }[];
};

export type PackageTier = {
  name: string;
  priceFrom: number;       // display as “From $X”
  description: string;
  deliverables: string[];
  timeline: string;
  idealFor: string[];
};

export type SiteContent = {
  hero: { headline: string; subheadline: string; ctaPrimary: string; ctaSecondary: string };
  stats?: { label: string; value: string }[];
  projects: Project[];
  packages: PackageTier[];
  about: { headline: string; body: string[]; stack: string[] };
  cta: { headline: string; body: string; email: string };
};

export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~0177723984e7978280";
export const INTAKE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfP-GqX9W9T9x9/viewform";

export const siteContent: SiteContent = {
  hero: {
    headline: "Ship your next product win with a senior Next.js partner",
    subheadline: "I help product teams and founders launch MVPs, stabilize bugs, and improve conversions with fixed-scope engagements. Fast timelines, clear deliverables, and measurable outcomes.",
    ctaPrimary: "View work",
    ctaSecondary: "See packages"
  },
  stats: [
    { label: "Experience", value: "10+ years" },
    { label: "Success Rate", value: "100%" },
    { label: "Client Satisfaction", value: "5/5" },
    { label: "MVPs Shipped", value: "20+" }
  ],
  projects: [
    {
      slug: "saas-onboarding",
      title: "SaaS Onboarding System",
      tagline: "Reducing activation time by 40%",
      problem: [
        "Complex multi-step registration flow causing 60% drop-off",
        "Lack of progress visualization for users",
        "No clear path to first value"
      ],
      solution: [
        "Implemented a guided, multi-step onboarding flow",
        "Added real-time validation and progress tracking",
        "Integrated interactive product tours"
      ],
      deliverables: [
        "Custom Next.js onboarding component library",
        "State management for multi-step forms",
        "Analytics integration for funnel tracking"
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      timeline: "3 weeks",
      role: "Lead Frontend Engineer",
      links: {
        liveUrl: "https://example.com",
        loomUrl: "https://loom.com/example"
      }
    },
    {
      slug: "ecom-performance",
      title: "E-commerce Speed Optimization",
      tagline: "Boosting conversion through performance",
      problem: [
        "Lighthouse performance score below 40",
        "Large image payloads causing slow mobile experience",
        "Unoptimized third-party scripts"
      ],
      solution: [
        "Full image optimization pipeline with Next/Image",
        "Code splitting and dynamic imports implementation",
        "Critical CSS extraction and font optimization"
      ],
      deliverables: [
        "Performance audit report",
        "Optimized frontend codebase",
        "Monitoring dashboard setup"
      ],
      stack: ["Next.js", "Vercel", "Cloudinary", "Sentry"],
      timeline: "2 weeks",
      role: "Performance Specialist",
      links: {
        liveUrl: "https://example-shop.com"
      }
    },
    {
      slug: "checkout-stabilization",
      title: "Checkout Flow Stabilization",
      tagline: "Eliminating payment failures",
      problem: [
        "Intermittent checkout failures during peak traffic",
        "Poor error messaging for payment declines",
        "Race conditions in inventory reservation"
      ],
      solution: [
        "Refactored checkout state machine",
        "Improved Stripe error handling and user feedback",
        "Implemented robust inventory locking"
      ],
      deliverables: [
        "Stabilized checkout flow",
        "Automated checkout test suite",
        "Error logging and alerting"
      ],
      stack: ["Next.js", "Stripe API", "Node.js", "Redis"],
      timeline: "2 weeks",
      role: "Full-stack Engineer",
      links: {
        liveUrl: "https://example.io"
      }
    }
  ],
  packages: [
    {
      name: "MVP Sprint",
      priceFrom: 5000,
      description: "Launch your core product idea in record time.",
      deliverables: [
        "Core feature implementation",
        "Landing page",
        "Basic authentication",
        "Database setup"
      ],
      timeline: "4 weeks",
      idealFor: ["Founders", "Early-stage startups"]
    },
    {
      name: "Conversion Boost",
      priceFrom: 3000,
      description: "Optimize your existing flow to capture more value.",
      deliverables: [
        "Landing page audit",
        "Copy optimization",
        "Speed improvements",
        "A/B test setup"
      ],
      timeline: "2 weeks",
      idealFor: ["Marketing teams", "Established SaaS"]
    },
    {
      name: "Technical Stabilization",
      priceFrom: 2000,
      description: "Fix critical bugs and improve code reliability.",
      deliverables: [
        "Critical bug fixes",
        "TypeScript conversion",
        "Error monitoring setup",
        "Performance tuning"
      ],
      timeline: "1-2 weeks",
      idealFor: ["Teams with legacy debt", "Pre-launch products"]
    }
  ],
  about: {
    headline: "Senior Next.js Partner for Fast-Moving Teams",
    body: [
      "I'm Brian Woodson, a senior frontend engineer specializing in the Next.js ecosystem. With over 10 years of experience, I've helped dozens of startups ship high-quality products.",
      "I focus on clean code, measurable performance, and pixel-perfect implementation of complex designs."
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase", "Framer Motion"]
  },
  cta: {
    headline: "Ready to ship your next win?",
    body: "Let's discuss your project and see if we're a good fit. I'm usually available to start within 1-2 weeks.",
    email: "hello@brianwoodson.com"
  }
};
