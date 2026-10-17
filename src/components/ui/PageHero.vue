<template>
  <header class="page-hero">
    <div class="grid-bg" aria-hidden="true" />
    <div class="container inner">
      <span v-if="eyebrow" class="eyebrow reveal">{{ eyebrow }}</span>
      <h1 class="display reveal reveal-1">{{ title }}</h1>
      <p v-if="subtitle" class="lead subtitle reveal reveal-2">{{ subtitle }}</p>
    </div>
  </header>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
});
</script>

<style scoped>
.page-hero {
  position: relative; overflow: hidden;
  padding: calc(var(--nav-h) + 4rem) 0 3.5rem;
  text-align: center;
  background:
    radial-gradient(55% 90% at 50% 0%, rgba(74,222,128,.22) 0%, rgba(74,222,128,0) 70%),
    linear-gradient(180deg, #ffffff 0%, var(--bg-1) 100%);
}
.grid-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(22,163,74,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22,163,74,.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(60% 90% at 50% 10%, #000 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(60% 90% at 50% 10%, #000 0%, transparent 75%);
}
.inner { position: relative }
.page-hero .display { font-size: clamp(2.1rem, 4vw, 3.1rem); margin-top: 1.1rem }
.page-hero .eyebrow + .display { margin-top: 1.1rem }
.page-hero .display:first-child { margin-top: 0 }
.subtitle { margin: 1rem auto 0 }

@media (max-width: 720px) { .page-hero { padding: calc(var(--nav-h) + 2.5rem) 0 2.5rem } }
</style>
