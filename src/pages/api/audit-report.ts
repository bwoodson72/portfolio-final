import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

type Scores = { performance: number; accessibility: number; bestPractices: number; seo: number };

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json().catch(() => null) as null | { email?: string; url?: string; scores?: Scores };
  if (!data?.email || !data.url || !data.scores || !data.email.includes('@')) {
    return Response.json({ success: false, error: 'Invalid report request.' }, { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ success: false, error: 'Server configuration error.' }, { status: 500 });

  const categories = [
    ['Performance', data.scores.performance],
    ['Accessibility', data.scores.accessibility],
    ['Best Practices', data.scores.bestPractices],
    ['SEO', data.scores.seo],
  ] as const;

  const worst = [...categories].sort((a, b) => a[1] - b[1])[0];
  const verdict = worst[1] < 50
    ? 'Your site has significant issues worth addressing.'
    : worst[1] < 90
      ? 'Your site is functional, but there is meaningful room to improve.'
      : 'Your site has a strong technical foundation.';

  const rows = categories.map(([label, score]) => `<tr><td style="padding:10px;border-bottom:1px solid #334155">${label}</td><td style="padding:10px;border-bottom:1px solid #334155;font-weight:700">${score}</td></tr>`).join('');
  const html = `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;background:#020617;color:#f1f5f9;padding:32px"><p style="color:#94a3b8">Website Audit Report</p><h1 style="font-size:24px">${verdict}</h1><p style="color:#94a3b8">Tested: ${data.url}</p><table style="width:100%;border-collapse:collapse;margin:24px 0">${rows}</table><p>Your lowest score is <strong>${worst[0]} (${worst[1]})</strong>. The detailed next step depends on the underlying Lighthouse findings, but these scores identify where investigation should start.</p><p style="margin-top:28px"><a href="https://brianwoodson.dev/contact" style="color:#f1f5f9">Book a consultation</a></p></div>`;

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: 'Brian Woodson Web Development <contact-form@brianwoodson.dev>',
      to: [data.email],
      subject: 'Your website audit report',
      html,
    });
    if (error) return Response.json({ success: false, error: error.message }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: 'Could not send the report.' }, { status: 502 });
  }
};
