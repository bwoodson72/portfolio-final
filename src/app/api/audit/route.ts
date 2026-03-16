import { NextRequest, NextResponse } from "next/server";

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Normalize — prepend https:// if no protocol
  let normalizedUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = "https://" + normalizedUrl;
  }

  // Build PageSpeed Insights API URL
  const categories = ["performance", "accessibility", "best-practices", "seo"];
  const categoryParams = categories.map((c) => `category=${c}`).join("&");
  let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&${categoryParams}&strategy=mobile`;

  if (process.env.PAGESPEED_API_KEY) {
    apiUrl += `&key=${process.env.PAGESPEED_API_KEY}`;
  }

  const NUM_RUNS = 3;

  try {
    const results: { performance: number; accessibility: number; bestPractices: number; seo: number }[] = [];

    for (let i = 0; i < NUM_RUNS; i++) {
      if (i > 0) await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch(apiUrl);
      if (!res.ok) continue;
      const data = await res.json();
      const lighthouseCategories = data?.lighthouseResult?.categories;
      if (!lighthouseCategories) continue;

      results.push({
        performance: (lighthouseCategories["performance"]?.score ?? 0) * 100,
        accessibility: (lighthouseCategories["accessibility"]?.score ?? 0) * 100,
        bestPractices: (lighthouseCategories["best-practices"]?.score ?? 0) * 100,
        seo: (lighthouseCategories["seo"]?.score ?? 0) * 100,
      });
    }

    if (results.length === 0) {
      return NextResponse.json(
          { error: "Failed to analyze this URL. Please check the address and try again." },
          { status: 502 }
      );
    }

    const scores = {
      performance: Math.round(median(results.map((r) => r.performance))),
      accessibility: Math.round(median(results.map((r) => r.accessibility))),
      bestPractices: Math.round(median(results.map((r) => r.bestPractices))),
      seo: Math.round(median(results.map((r) => r.seo))),
    };

    return NextResponse.json({ url: normalizedUrl, scores });
  } catch {
    return NextResponse.json(
        { error: "Failed to reach the PageSpeed Insights service. Please try again later." },
        { status: 502 }
    );
  }
}