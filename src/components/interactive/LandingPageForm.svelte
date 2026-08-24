<script lang="ts">
  import { onMount } from 'svelte';

  export let heading: string | undefined;
  export let ctaCopy: string | undefined;
  export let campaignTag: string;
  export let gadsConversionId: string | undefined;
  export let gadsConversionLabel: string | undefined;

  let firstName = '';
  let lastName = '';
  let email = '';
  let websiteUrl = '';
  let message = '';
  let turnstileToken = '';
  let submitting = false;
  let success = false;
  let error = '';

  onMount(() => {
    const sitekey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
    if (!sitekey) return;

    const render = () => {
      const el = document.getElementById('lp-turnstile');
      if (!el || !(window as any).turnstile) return;
      (window as any).turnstile.render(el, {
        sitekey,
        theme: 'dark',
        callback: (token: string) => (turnstileToken = token),
        'expired-callback': () => (turnstileToken = ''),
      });
    };

    if ((window as any).turnstile) return render();
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = render;
    document.head.appendChild(script);
  });

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    if (firstName.trim().length < 2 || lastName.trim().length < 2 || !email.includes('@') || message.trim().length < 2) {
      error = 'Please complete all required fields.';
      return;
    }

    submitting = true;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, websiteUrl, message, campaignTag, turnstileToken }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Could not send your message.');

      success = true;
      if (gadsConversionId && gadsConversionLabel && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'conversion', { send_to: `${gadsConversionId}/${gadsConversionLabel}` });
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Could not send your message.';
    } finally {
      submitting = false;
    }
  }
</script>

<div class="space-y-6">
  {#if heading}<h2 class="text-2xl font-extrabold tracking-tight text-text">{heading}</h2>{/if}
  {#if success}
    <div class="rounded-3xl border border-border bg-surface p-12 text-center space-y-3">
      <h2 class="text-2xl font-extrabold text-text">Got it — we'll be in touch</h2>
      <p class="text-text-muted">Expect a reply within one business day.</p>
    </div>
  {:else}
    <form onsubmit={submit} novalidate class="rounded-3xl border border-border bg-surface p-8 md:p-10 space-y-6">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <input bind:value={firstName} class="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text" placeholder="First name" />
        <input bind:value={lastName} class="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text" placeholder="Last name" />
        <input bind:value={email} type="email" class="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text md:col-span-2" placeholder="hello@yourbusiness.com" />
        <input bind:value={websiteUrl} type="url" class="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text md:col-span-2" placeholder="https://yourbusiness.com" />
        <textarea bind:value={message} rows="4" class="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text md:col-span-2" placeholder="Tell me a bit about your business and what you need."></textarea>
      </div>
      <div id="lp-turnstile"></div>
      {#if error}<p role="alert" class="text-sm text-red-400">{error}</p>{/if}
      <button type="submit" disabled={submitting} class="w-full rounded-full bg-text py-4 text-sm font-bold text-bg disabled:opacity-40">
        {submitting ? 'Sending…' : (ctaCopy ?? 'Send my info')}
      </button>
    </form>
  {/if}
</div>
