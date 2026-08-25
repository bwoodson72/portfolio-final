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
    const sitekey =
      import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ??
      import.meta.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!sitekey) return;

    const render = () => {
      const el = document.getElementById('lp-turnstile');
      if (!el || !(window as any).turnstile) return;
      (window as any).turnstile.render(el, {
        sitekey,
        theme: 'dark',
        callback: (token: string) => (turnstileToken = token),
        'expired-callback': () => (turnstileToken = ''),
        'error-callback': () => (turnstileToken = ''),
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
    <div class="rounded-3xl border border-border bg-surface p-12 text-center space-y-3" role="status" aria-live="polite">
      <h2 class="text-2xl font-extrabold text-text">Got it — we'll be in touch</h2>
      <p class="text-text-muted">Expect a reply within one business day.</p>
    </div>
  {:else}
    <form onsubmit={submit} novalidate class="rounded-3xl border border-border bg-surface p-8 md:p-10 space-y-6">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <label for="lp-first-name" class="text-xs font-bold uppercase tracking-widest text-text-muted">First name</label>
          <input id="lp-first-name" bind:value={firstName} autocomplete="given-name" required aria-required="true" class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text" placeholder="Brian" />
        </div>
        <div class="space-y-2">
          <label for="lp-last-name" class="text-xs font-bold uppercase tracking-widest text-text-muted">Last name</label>
          <input id="lp-last-name" bind:value={lastName} autocomplete="family-name" required aria-required="true" class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text" placeholder="Smith" />
        </div>
        <div class="space-y-2 md:col-span-2">
          <label for="lp-email" class="text-xs font-bold uppercase tracking-widest text-text-muted">Email</label>
          <input id="lp-email" bind:value={email} type="email" autocomplete="email" required aria-required="true" class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text" placeholder="hello@yourbusiness.com" />
        </div>
        <div class="space-y-2 md:col-span-2">
          <label for="lp-website" class="text-xs font-bold uppercase tracking-widest text-text-muted">Current website <span class="font-normal normal-case">(optional)</span></label>
          <input id="lp-website" bind:value={websiteUrl} type="url" autocomplete="url" class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text" placeholder="https://yourbusiness.com" />
        </div>
        <div class="space-y-2 md:col-span-2">
          <label for="lp-message" class="text-xs font-bold uppercase tracking-widest text-text-muted">What are you looking for?</label>
          <textarea id="lp-message" bind:value={message} rows="4" required aria-required="true" class="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text" placeholder="Tell me a bit about your business and what you need."></textarea>
        </div>
      </div>
      <div id="lp-turnstile"></div>
      {#if error}<p role="alert" class="text-sm text-red-400">{error}</p>{/if}
      <button type="submit" disabled={submitting} class="w-full rounded-full bg-text py-4 text-sm font-bold text-bg disabled:cursor-not-allowed disabled:opacity-40">
        {submitting ? 'Sending…' : (ctaCopy ?? 'Send my info')}
      </button>
    </form>
  {/if}
</div>
