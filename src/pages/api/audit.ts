import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const rawUrl = url.searchParams.get('url');
  if (!rawUrl) {
    return Response.json({ error: 'URL is required' }, { status: 400 });
  }

  let normalizedUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) normalizedUrl = `https://${normalizedUrl}`;

  const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
  const categoryParams = categories.map((category) => `category=${category}`).join('&');
  let apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&${categoryParams}&strategy=mobile`;

  if (import.meta.env.PAGESPEED_API_KEY) {
    apiUrl += `&key=${import.meta.env.PAGESPEED_API_KEY}`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return Response.json({ error: 'Failed to analyze this URL. Please check the address and try again.' }, { status: 502 });
    }

    const data = await response.json();
    const lighthouseCategories = data?.lighthouseResult?.categories;
    if (!lighthouseCategories) {
      return Response.json({ error: 'Failed to analyze this URL. Please check the address and try again.' }, { status: 502 });
    }

    const scores = {
      performance: Math.round((lighthouseCategories.performance?.score ?? 0) * 100),
      accessibility: Math.round((lighthouseCategories.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((lighthouseCategories['best-practices']?.score ?? 0) * 100),
      seo: Math.round((lighthouseCategories.seo?.score ?? 0) * 100),
    };

    return Response.json({ url: normalizedUrl, scores });
  } catch {
    return Response.json({ error: 'Failed to reach the PageSpeed Insights service. Please try again later.' }, { status: 502 });
  }
};
