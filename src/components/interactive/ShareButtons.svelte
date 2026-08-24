<script lang="ts">
  let { title, slug, type }: { title: string; slug: string; type: 'knowledge' | 'work' } = $props();
  let copied = $state(false);

  const url = `https://brianwoodson.dev/${type}/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    copied = true;
    window.setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="flex items-center gap-3">
  <span class="text-xs uppercase tracking-widest text-text-muted-2">Share</span>
  <div class="flex items-center gap-2">
    <button type="button" onclick={copyLink} class="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted transition hover:border-border-strong hover:text-text">
      {copied ? 'Copied' : 'Copy Link'}
    </button>
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" class="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted transition hover:border-border-strong hover:text-text">LinkedIn</a>
    <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" class="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted transition hover:border-border-strong hover:text-text">X</a>
  </div>
</div>
