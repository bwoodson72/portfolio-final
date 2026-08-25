<script lang="ts">
  import { trackEvent } from '@/lib/analytics/events';

  export let url: string;
  export let scores: { performance: number; accessibility: number; bestPractices: number; seo: number };

  let email = '';
  let submitting = false;
  let success = false;
  let error = '';

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    if (!email.includes('@')) {
      error = 'Enter a valid email address';
      return;
    }

    submitting = true;
    trackEvent('audit_email_capture', { url });
    try {
      const response = await fetch('/api/audit-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, url, scores }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Could not send your report.');
      success = true;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Could not send your report.';
    } finally {
      submitting = false;
    }
  }
</script>

{#if success}
  <div class="rounded-2xl border border-border bg-surface p-8 text-center space-y-3">
    <p class="text-sm font-bold text-text">Report sent — check your inbox</p>
    <p class="text-xs text-text-muted">If you do not see it, check your spam folder.</p>
  </div>
{:else}
  <div class="space-y-4">
    <p class="text-lg font-bold text-text">Want the detailed report with business-specific recommendations?</p>
    <p class="text-sm text-text-muted">The report explains what your scores mean and where to investigate first.</p>
    <form onsubmit={submit} novalidate>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input bind:value={email} type="email" placeholder="hello@example.com" class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text" />
        <button type="submit" disabled={submitting} class="rounded-xl bg-text text-bg px-6 py-3 text-sm font-bold disabled:opacity-40 whitespace-nowrap">{submitting ? 'Sending...' : 'Send my report'}</button>
      </div>
      {#if error}<p role="alert" class="text-sm text-red-400 mt-2">{error}</p>{/if}
    </form>
  </div>
{/if}
