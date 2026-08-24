<script lang="ts">
  import { trackEvent } from '@/lib/analytics/events';

  let url = '';
  let error = '';
  let navigating = false;

  function normalizeUrl(value: string) {
    const trimmed = value.trim();
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  function validateUrl(value: string) {
    if (!value.trim()) return 'Enter a website URL';

    try {
      const parsed = new URL(normalizeUrl(value));
      if (!parsed.hostname.includes('.')) throw new Error('invalid host');
      return '';
    } catch {
      return 'Enter a valid URL (e.g. example.com or https://example.com)';
    }
  }

  function submit(event: SubmitEvent) {
    event.preventDefault();
    error = validateUrl(url);
    if (error) return;

    const normalizedUrl = normalizeUrl(url);
    trackEvent('audit_submit', { url: normalizedUrl });

    const slug = btoa(encodeURIComponent(normalizedUrl))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    navigating = true;
    window.location.assign(`/audit/${slug}`);
  }
</script>

<section class="mx-auto w-full max-w-7xl border-t border-border px-6 py-24">
  <div class="space-y-4 text-center md:text-left">
    <h2 class="text-3xl font-extrabold tracking-tight text-text md:text-5xl">
      Is your website costing you customers?
    </h2>
    <p class="max-w-2xl text-lg text-text-muted">
      Enter your URL and get a free performance, SEO, and accessibility audit. Takes 30 seconds — and you might not like what you find.
    </p>
  </div>

  <form class="mt-8 space-y-3" novalidate onsubmit={submit}>
    <div class="flex flex-col gap-3 sm:flex-row">
      <input
        bind:value={url}
        type="text"
        inputmode="url"
        autocomplete="url"
        placeholder="https://yourwebsite.com"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'audit-url-error' : undefined}
        class:border-red-500={Boolean(error)}
        class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted-2 transition-colors focus:border-border-strong focus:outline-none"
      />
      <button
        type="submit"
        disabled={navigating}
        class="whitespace-nowrap rounded-xl bg-text px-6 py-3 text-sm font-bold text-bg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {navigating ? 'Analyzing...' : 'Run free audit'}
      </button>
    </div>
    {#if error}
      <p id="audit-url-error" role="alert" class="mt-2 text-sm text-red-400">{error}</p>
    {/if}
  </form>
</section>
