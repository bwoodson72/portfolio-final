<script lang="ts">
  import { onMount } from 'svelte';

  const CONSENT_KEY = 'cookie_consent';
  const GA_ID =
    import.meta.env.PUBLIC_GA_MEASUREMENT_ID ??
    import.meta.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  type ConsentState = 'accepted' | 'declined' | null;
  type AnalyticsWindow = Window & { dataLayer?: unknown[] };

  let consent: ConsentState | 'uninitialized' = 'uninitialized';

  function loadAnalytics() {
    if (!GA_ID || document.querySelector(`script[data-ga-id="${GA_ID}"]`)) return;

    const external = document.createElement('script');
    external.async = true;
    external.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    external.dataset.gaId = GA_ID;
    document.head.appendChild(external);

    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.dataLayer ??= [];
    const gtag = (...args: unknown[]) => analyticsWindow.dataLayer?.push(args);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    consent = 'accepted';
    loadAnalytics();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    consent = 'declined';
  }

  onMount(() => {
    consent = localStorage.getItem(CONSENT_KEY) as ConsentState;
    if (consent === 'accepted') loadAnalytics();
  });
</script>

{#if consent === null}
  <div class="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg px-6 py-5">
    <div class="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-text-muted">
        This site uses cookies for analytics.
        <a href="/privacy" class="underline transition-colors hover:text-text">Privacy Policy</a>
      </p>
      <div class="flex shrink-0 gap-3">
        <button
          type="button"
          onclick={decline}
          class="rounded-full border border-border px-5 py-2 text-sm font-bold text-text-muted transition hover:border-border-strong hover:text-text"
        >
          Decline
        </button>
        <button
          type="button"
          onclick={accept}
          class="rounded-full bg-text px-5 py-2 text-sm font-bold text-bg transition hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
{/if}
