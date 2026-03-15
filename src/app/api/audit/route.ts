import { NextRequest, NextResponse } from "next/server";

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

  // Append API key if available (increases rate limits)
  if (process.env.PAGESPEED_API_KEY) {
    apiUrl += `&key=${process.env.PAGESPEED_API_KEY}`;
  }

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to analyze this URL. Please check the address and try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const lighthouseCategories = data?.lighthouseResult?.categories;

    if (!lighthouseCategories) {
      return NextResponse.json(
        { error: "Could not retrieve Lighthouse scores for this URL." },
        { status: 502 }
      );
    }

    // Scores come as 0-1 floats, convert to 0-100 integers
    const scores = {
      performance: Math.round((lighthouseCategories["performance"]?.score ?? 0) * 100),
      accessibility: Math.round((lighthouseCategories["accessibility"]?.score ?? 0) * 100),
      bestPractices: Math.round((lighthouseCategories["best-practices"]?.score ?? 0) * 100),
      seo: Math.round((lighthouseCategories["seo"]?.score ?? 0) * 100),
    };

    return NextResponse.json({ url: normalizedUrl, scores });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach the PageSpeed Insights service. Please try again later." },
      { status: 502 }
    );
  }
}
