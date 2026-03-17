'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { AuditEmailCapture } from "@/components/audit/email-capture";

// --- Types ---
type AuditScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
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
      red: { heading: "Slow Load Speed", body: "Your site takes too long to load. Research shows over half of visitors leave if a page takes longer than 3 seconds. Every second of delay costs you leads." },
      yellow: { heading: "Room to Improve", body: "Your site loads but not fast enough to compete. Visitors expect near-instant pages — and Google factors load speed into search rankings." },
      green: { heading: "Fast Load Speed", body: "Your site loads fast. This is a strong foundation for both user experience and search rankings." },
    },
    Accessibility: {
      red: { heading: "Accessibility Barriers", body: "Your site has significant accessibility issues. This limits your audience and can create legal risk under ADA compliance standards." },
      yellow: { heading: "Accessibility Gaps", body: "Your site has some accessibility gaps. Fixing these improves usability for all visitors, not just those with disabilities." },
      green: { heading: "Accessible", body: "Your site meets accessibility standards well. More people can use your site without barriers." },
    },
    "Best Practices": {
      red: { heading: "Technical Issues", body: "Your site has security or code quality issues that browsers flag. This can trigger warnings that drive visitors away." },
      yellow: { heading: "Minor Issues", body: "Your site has some technical issues that could affect trust signals and browser compatibility." },
      green: { heading: "Solid Foundation", body: "Your site follows modern web standards. No red flags for browsers or search engines." },
    },
    SEO: {
      red: { heading: "Poor Search Visibility", body: "Search engines cannot properly read your site. Missing metadata, broken structure, or crawl issues are keeping you invisible on Google." },
      yellow: { heading: "SEO Gaps", body: "Your SEO foundations have gaps. You are likely missing rankings you could capture with proper metadata and content optimization." },
      green: { heading: "SEO Ready", body: "Your technical SEO foundations are solid. Search engines can read and index your site effectively." },
    },
  };
  const entry = map[category]?.[tier] ?? { heading: category, body: "" };
  return { ...entry, tier };
}

const categories: { label: string; key: keyof AuditScores }[] = [
  { label: "Performance", key: "performance" },
  { label: "Accessibility", key: "accessibility" },
  { label: "Best Practices", key: "bestPractices" },
  { label: "SEO", key: "seo" },
];

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

const LOADING_CATEGORIES = ["Performance", "Accessibility", "Best Practices", "SEO"];

export function AuditResults({ url }: { url: string }) {
  const [scores, setScores] = useState<AuditScores | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/audit?url=${encodeURIComponent(url)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setScores(data.scores);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to reach the PageSpeed Insights service. Please try again later.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [url]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-24 space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Analyzing your website...
        </h1>
        <p className="text-lg text-text-muted max-w-xl">
          Running performance, accessibility, and SEO checks. This usually takes up to 30 seconds.
        </p>

        <div className="w-full max-w-md h-2 rounded-full bg-surface border border-border overflow-hidden mt-8">
          <motion.div
            className="h-full rounded-full bg-blue-600"
            animate={{ width: "90%" }}
            transition={{ duration: 20, ease: "easeOut" }}
            style={{ width: "0%" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mt-12">
          {LOADING_CATEGORIES.map((label) => (
            <div key={label} className="rounded-2xl border border-border bg-surface p-6 text-center">
              <div className="h-10 w-16 mx-auto rounded-lg bg-border/50 animate-pulse" />
              <div className="text-xs font-bold uppercase tracking-widest text-text-muted mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-24 space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Something went wrong
        </h1>
        <p className="text-lg text-text-muted max-w-xl">{error}</p>
        <Link
          href="/"
          className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-bold text-text transition hover:border-border-strong"
        >
          Back to homepage
        </Link>
      </main>
    );
  }

  const tiers = categories.map(({ key }) => getTier(scores![key]));
  const hasRed = tiers.includes("red");
  const hasYellow = tiers.includes("yellow");
  const ctaTier = hasRed ? "strong" : hasYellow ? "moderate" : "soft";

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-24 space-y-16">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
          Audit Results
        </h1>
        <p className="text-lg text-text-muted truncate">{url}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map(({ label, key }) => {
          const score = scores![key];
          const tier = getTier(score);
          const colors = tierColors[tier];
          return (
            <div key={key} className={`rounded-2xl border bg-surface p-6 text-center ${colors.border}`}>
              <div className={`text-4xl font-extrabold ${colors.text}`}>{score}</div>
              <div className="mt-2 text-xs font-bold uppercase tracking-widest text-text-muted">{label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map(({ label, key }) => {
          const score = scores![key];
          const feedback = getScoreFeedback(label, score);
          const colors = tierColors[feedback.tier];
          return (
            <div key={key} className={`border-l-2 pl-4 ${colors.leftBorder}`}>
              <p className="text-sm font-bold text-text">{feedback.heading}</p>
              <p className="mt-1 text-sm text-text-muted">{feedback.body}</p>
            </div>
          );
        })}
      </div>

      <AuditEmailCapture url={url} scores={scores!} />

      <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 text-center space-y-6">
        <div className="space-y-3">
          <p className="text-xl font-extrabold text-text">{ctaCopy[ctaTier].heading}</p>
          <p className="text-sm text-text-muted max-w-md mx-auto">{ctaCopy[ctaTier].body}</p>
        </div>
        <Link href="/contact" className="inline-block rounded-full bg-text py-3 px-8 text-sm font-bold text-bg transition hover:opacity-90">
          Talk to us
        </Link>
      </div>
    </main>
  );
}
