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

export type LinkSet = {
  repoUrl?: string;
  liveUrl?: string;
  loomUrl?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  problem: string[];
  solution: string[];
  deliverables: string[];
  stack: string[];
  timeline?: string;
  role?: string;
  links?: LinkSet;
  screenshots?: { src: string; alt: string }[];
  featured?: boolean;
};

export type PackageTier = {
  name: string;
  priceFrom: number;
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
    headline: "Fast, modern websites for local businesses",
    subheadline: "I build Next.js websites that load fast, rank on Google, and turn visitors into leads. Fixed scope, clear deliverables, no surprises.",
    ctaPrimary: "See my work",
    ctaSecondary: "View packages"
  },

  stats: [
    { label: "Performance", value: "98" },
    { label: "SEO", value: "100" },
    { label: "Best Practices", value: "100" },
    { label: "Accessibility", value: "96" },
  ],

  projects: [
    {
      slug: "granbury-peak-roofing",
      title: "Granbury Peak Roofing & Restoration",
      tagline: "A high-performance business website for a roofing contractor, built for lead generation, visual polish, and Lighthouse score optimization.",
      role: "Website Developer",
      featured: true,
      problem: [
        "No existing web presence for a local roofing and storm damage company",
        "Needed to rank on Google for local service searches",
        "Required a contact flow that converts visitors into leads",
      ],
      solution: [
        "Built a multi-page Next.js site with dynamic service pages and clean routing",
        "Implemented structured SEO metadata, canonical URLs, and a generated sitemap on every page",
        "Built a contact form with Zod 4 validation and server-side submission handling",
      ],
      deliverables: [
        "Home, About, Services, FAQ, Testimonials, Contact pages",
        "Dynamic service detail pages with individual SEO metadata",
        "Server-side contact form with validation",
        "Generated sitemap and robots.txt",
        "Production deployment to Vercel",
      ],
      stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Zod 4", "React Hook Form"],
      timeline: "2 weeks",
      links: {
        liveUrl: "https://granbury-roofing.vercel.app",
        repoUrl: "https://github.com/bwoodson72/granbury-roofing",
      },
      screenshots: [{ src: "/portfolio/granbury-roofing.avif", alt: "Granbury Peak Roofing website preview" }],
    },
    {
      slug: "forge-athletics",
      title: "FORGE Athletics",
      tagline: "A modern gym and fitness website with bold visuals and smooth interactions, designed to demonstrate range beyond service-based businesses.",
      role: "Website Developer",
      featured: true,
      problem: [
        "Needed a compelling demo project outside the contractor/services niche",
        "Required bold, high-energy design with smooth animations that felt modern and premium",
        "Had to be performant while supporting rich visual elements and interactivity",
      ],
      solution: [
        "Designed and built a full gym website with a dark, high-contrast aesthetic and bold typography",
        "Used Lucide React icons and Tailwind CSS 4 for a polished, component-driven UI",
        "Achieved high Lighthouse scores while maintaining fluid transitions and scroll-based reveals",
      ],
      deliverables: [
        "Home, Classes, Trainers, Pricing, Contact pages",
        "Animated hero and section reveals",
        "Contact form with Zod 4 validation",
        "Mobile responsive layout",
        "Production deployment to Vercel",
      ],
      stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Zod 4", "React Hook Form", "Lucide React"],
      timeline: "2 weeks",
      links: {
        liveUrl: "https://forge-athletics-ruby.vercel.app",
        repoUrl: "https://github.com/bwoodson72/forge-athletics",
      },
      screenshots: [{ src: "/portfolio/forge.avif", alt: "FORGE Athletics website preview" }],
    },
    {
      slug: "aetheria",
      title: "Aetheria",
      tagline: "A premium landing page focused on high-speed performance, accessibility, and fluid motion design with parallax animations.",
      role: "Website Developer",
      featured: true,
      problem: [
        "Needed a showcase project demonstrating advanced motion design and performance optimization",
        "Parallax and animation-heavy pages often suffer on Lighthouse — needed to prove it doesn't have to",
        "Accessibility is frequently sacrificed on visually complex pages",
      ],
      solution: [
        "Built a fully animated landing page using Motion (Framer Motion) for fluid scroll-driven parallax",
        "Carefully scoped animations to avoid layout thrash and maintain a high Lighthouse performance score",
        "Ensured full keyboard navigation and screen-reader compatibility despite heavy visual effects",
      ],
      deliverables: [
        "Single-page premium landing page",
        "Scroll-driven parallax sections",
        "Motion-animated hero, features, and CTA",
        "Accessible, keyboard-navigable layout",
        "Production deployment to Vercel",
      ],
      stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion"],
      timeline: "1 week",
      links: {
        liveUrl: "https://aetheria-landing-page.vercel.app",
        repoUrl: "https://github.com/bwoodson72/aetheria--landing-page",
      },
      screenshots: [{ src: "/portfolio/aetheria.avif", alt: "Aetheria landing page preview" }],
    },
    {
      slug: "nea-ionia-coffee-steki",
      title: "Nea Ionia Coffee (Steki)",
      tagline: "A warm, Mediterranean-inspired cafe website featuring parallax animations, smooth scrolling, and full internationalization with Greek translations.",
      role: "Website Developer",
      featured: false,
      problem: [
        "A Greek-owned cafe needed a site that reflected its cultural identity and warm atmosphere",
        "Required full bilingual support (English and Greek) with seamless language switching",
        "Smooth scrolling and parallax were essential to the brand feel",
      ],
      solution: [
        "Built a warm, texture-rich design with earthy tones and Mediterranean typography",
        "Implemented full i18n with next-intl for English/Greek with URL-based locale routing",
        "Used Lenis for buttery smooth scroll and Motion for parallax image sections",
      ],
      deliverables: [
        "Home, Menu, About, Contact pages",

        "Lenis smooth scroll integration",
        "Parallax image sections with Motion",
        "Production deployment to Vercel",
      ],
      stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "Lenis", "next-intl"],
      timeline: "2 weeks",
      links: {
        liveUrl: "https://the-steki.vercel.app",
        repoUrl: "https://github.com/bwoodson72/the-steki",
      },
      screenshots: [{ src: "/portfolio/steki.avif", alt: "Nea Ionia Coffee (Steki) website preview" }],
    },
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
      idealFor: ["Established local businesses", "Service companies", "Anyone who wants it done right"]
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
    headline: "Ready to get started?",
    body: "Tell me about your project and I'll get back to you within one business day.",
    email: "hello@brianwoodson.com"
  }
};