import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuditEmailCapture } from "@/components/audit/email-capture";

export const metadata: Metadata = {
  title: "Audit Results | Brian Woodson Web Development",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ slug: string }>;
};

type AuditScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type AuditResponse = {
  scores?: AuditScores;
  error?: string;
};

type Tier = "green" | "yellow" | "red";

function getTier(score: number): Tier {
  if (score >= 90) return "green";
  if (score >= 50) return "yellow";
  return "red";
}

const tierColors = {
  green: {
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    leftBorder: "border-emerald-400",
  },
  yellow: {
    text: "text-amber-400",
    border: "border-amber-500/30",
    leftBorder: "border-amber-400",
  },
  red: {
    text: "text-red-400",
    border: "border-red-500/30",
    leftBorder: "border-red-400",
  },
};

type Feedback = { heading: string; body: string; tier: Tier };

function getScoreFeedback(category: string, score: number): Feedback {
  const tier = getTier(score);

  const map: Record<string, Record<Tier, { heading: string; body: string }>> = {
    Performance: {
      red: {
        heading: "Slow Load Speed",
        body: "Your site takes too long to load. Research shows over half of visitors leave if a page takes longer than 3 seconds. Every second of delay costs you leads.",
      },
      yellow: {
        heading: "Room to Improve",
        body: "Your site loads but not fast enough to compete. Visitors expect near-instant pages — and Google factors load speed into search rankings.",
      },
      green: {
        heading: "Fast Load Speed",
        body: "Your site loads fast. This is a strong foundation for both user experience and search rankings.",
      },
    },
    Accessibility: {
      red: {
        heading: "Accessibility Barriers",
        body: "Your site has significant accessibility issues. This limits your audience and can create legal risk under ADA compliance standards.",
      },
      yellow: {
        heading: "Accessibility Gaps",
        body: "Your site has some accessibility gaps. Fixing these improves usability for all visitors, not just those with disabilities.",
      },
      green: {
        heading: "Accessible",
        body: "Your site meets accessibility standards well. More people can use your site without barriers.",
      },
    },
    "Best Practices": {
      red: {
        heading: "Technical Issues",
        body: "Your site has security or code quality issues that browsers flag. This can trigger warnings that drive visitors away.",
      },
      yellow: {
        heading: "Minor Issues",
        body: "Your site has some technical issues that could affect trust signals and browser compatibility.",
      },
      green: {
        heading: "Solid Foundation",
        body: "Your site follows modern web standards. No red flags for browsers or search engines.",
      },
    },
    SEO: {
      red: {
        heading: "Poor Search Visibility",
        body: "Search engines cannot properly read your site. Missing metadata, broken structure, or crawl issues are keeping you invisible on Google.",
      },
      yellow: {
        heading: "SEO Gaps",
        body: "Your SEO foundations have gaps. You are likely missing rankings you could capture with proper metadata and content optimization.",
      },
      green: {
        heading: "SEO Ready",
        body: "Your technical SEO foundations are solid. Search engines can read and index your site effectively.",
      },
    },
  };

  const entry = map[category]?.[tier] ?? { heading: category, body: "" };
  return { ...entry, tier };
}

export default async function AuditResultPage({ params }: Props) {
  const { slug } = await params;

  let decodedUrl: string;
  try {
    // Restore standard base64 from URL-safe base64
    let base64 = slug.replace(/-/g, "+").replace(/_/g, "/");
    // Re-add padding if needed
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    decodedUrl = decodeURIComponent(atob(base64));
  } catch {
    notFound();
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://brianwoodson.dev";
  let scores: AuditScores | null = null;
  let fetchError: string | null = null;

  try {
    const res = await fetch(
      `${base}/api/audit?url=${encodeURIComponent(decodedUrl)}`,
      { cache: "no-store" }
    );
    const data: AuditResponse = await res.json();
    if (data.error || !data.scores) {
      fetchError = data.error ?? "Audit failed. Please try again.";
    } else {
      scores = data.scores;
    }
  } catch {
    fetchError = "Could not reach the audit service. Please try again later.";
  }

  if (fetchError || !scores) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-24 space-y-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Audit Results
        </h1>
        <p className="text-lg text-red-400">{fetchError}</p>
        <Link href="/" className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-bold text-text transition hover:border-border-strong">
          Back to homepage
        </Link>
      </main>
    );
  }

  const categories: { label: string; key: keyof AuditScores }[] = [
    { label: "Performance", key: "performance" },
    { label: "Accessibility", key: "accessibility" },
    { label: "Best Practices", key: "bestPractices" },
    { label: "SEO", key: "seo" },
  ];

  const tiers = categories.map(({ label, key }) => getTier(scores![key]));
  const hasRed = tiers.includes("red");
  const hasYellow = tiers.includes("yellow");
  const ctaTier = hasRed ? "strong" : hasYellow ? "moderate" : "soft";

  const ctaCopy = {
    strong: {
      heading: "Your website is underperforming",
      body: "We build sites that score 95+ across the board. See what that looks like for your business.",
    },
    moderate: {
      heading: "There is room to gain ground",
      body: "A few targeted improvements could put you ahead of competitors. Let us show you how.",
    },
    soft: {
      heading: "Your site is in good shape",
      body: "If you are looking to go further — faster load times, better conversions, or a design refresh — we can help.",
    },
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-24 space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Audit Results
        </h1>
        <p className="text-lg text-text-muted truncate">{decodedUrl}</p>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map(({ label, key }) => {
          const score = scores![key];
          const tier = getTier(score);
          const colors = tierColors[tier];
          return (
            <div
              key={key}
              className={`rounded-2xl border bg-surface p-6 text-center ${colors.border}`}
            >
              <div className={`text-4xl font-extrabold ${colors.text}`}>
                {score}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-widest text-text-muted">
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Diagnostics */}
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map(({ label, key }) => {
          const score = scores![key];
          const feedback = getScoreFeedback(label, score);
          const colors = tierColors[feedback.tier];
          return (
            <div
              key={key}
              className={`border-l-2 pl-4 ${colors.leftBorder}`}
            >
              <p className="text-sm font-bold text-text">{feedback.heading}</p>
              <p className="mt-1 text-sm text-text-muted">{feedback.body}</p>
            </div>
          );
        })}
      </div>

      <AuditEmailCapture url={decodedUrl} scores={scores} />

      {/* CTA */}
      <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 text-center space-y-6">
        <div className="space-y-3">
          <p className="text-xl font-extrabold text-text">
            {ctaCopy[ctaTier].heading}
          </p>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            {ctaCopy[ctaTier].body}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-text py-3 px-8 text-sm font-bold text-bg transition hover:opacity-90"
        >
          Talk to us
        </Link>
      </div>
    </main>
  );
}
