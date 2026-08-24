import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json().catch(() => null) as null | {
    firstName?: string;
    lastName?: string;
    email?: string;
    websiteUrl?: string;
    message?: string;
    campaignTag?: string;
    turnstileToken?: string;
  };

  if (!data?.firstName || !data.lastName || !data.email || !data.message) {
    return Response.json({ success: false, error: 'Please complete all required fields.' }, { status: 400 });
  }

  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;
  if (secretKey) {
    if (!data.turnstileToken) {
      return Response.json({ success: false, error: 'Bot verification required.' }, { status: 400 });
    }

    try {
      const body = new URLSearchParams({ secret: secretKey, response: data.turnstileToken });
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const result = await verify.json() as { success?: boolean };
      if (!result.success) {
        return Response.json({ success: false, error: 'Bot verification failed. Please try again.' }, { status: 400 });
      }
    } catch {
      return Response.json({ success: false, error: 'Could not verify bot protection.' }, { status: 502 });
    }
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ success: false, error: 'Server configuration error.' }, { status: 500 });
  }

  const escapeHtml = (value = '') => value.replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char] ?? char);

  const resend = new Resend(apiKey);
  const campaignLabel = data.campaignTag ? ` [${data.campaignTag}]` : '';

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio <contact-form@brianwoodson.dev>',
      to: ['brian@brianwoodson.dev'],
      replyTo: data.email,
      subject: `// INQUIRY${campaignLabel}: ${data.firstName} ${data.lastName}`,
      html: `<div style="font-family:Arial,sans-serif"><h2>Website inquiry</h2><p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p><p><strong>Email:</strong> ${escapeHtml(data.email)}</p>${data.websiteUrl ? `<p><strong>Website:</strong> ${escapeHtml(data.websiteUrl)}</p>` : ''}${data.campaignTag ? `<p><strong>Campaign:</strong> ${escapeHtml(data.campaignTag)}</p>` : ''}<p><strong>Message:</strong></p><p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p></div>`,
    });

    if (error) return Response.json({ success: false, error: error.message }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: 'Could not send your message. Please try again.' }, { status: 502 });
  }
};
