<script lang="ts">
  let isOpen = false;

  const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Guides', href: '/knowledge' },
    { label: 'FAQ', href: '/faq' },
  ];

  function closeMenu() {
    isOpen = false;
  }
</script>

<button
  type="button"
  class="p-2 text-text md:hidden"
  aria-label="Toggle menu"
  aria-expanded={isOpen}
  onclick={() => (isOpen = !isOpen)}
>
  {#if isOpen}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  {/if}
</button>

{#if isOpen}
  <div class="absolute left-0 right-0 top-full border-t border-border bg-bg md:hidden">
    <div class="flex flex-col items-center gap-6 px-6 py-8">
      {#each navLinks as link}
        <a href={link.href} class="text-2xl font-bold text-text" onclick={closeMenu}>{link.label}</a>
      {/each}
      <a
        href="/contact"
        class="inline-flex max-w-fit items-center justify-center whitespace-nowrap rounded-full bg-accent px-8 py-4 text-sm font-bold text-text transition hover:bg-accent-hover"
        onclick={closeMenu}
      >
        Book a Consultation
      </a>
    </div>
  </div>
{/if}
