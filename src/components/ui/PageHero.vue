<template>
  <header class="page-hero">
    <div class="container">
      <span v-if="eyebrow" class="eyebrow eyebrow-on-dark reveal">{{ eyebrow }}</span>
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
  padding: 9rem 0 4rem;
  background: linear-gradient(135deg, var(--green-deep) 0%, var(--green) 55%, var(--blue) 130%);
  color: #fff;
  text-align: center;
}
.page-hero .display { color: #fff; font-size: clamp(2.1rem, 4vw, 3rem) }
.eyebrow-on-dark {
  color: #fff;
  background: rgba(255,255,255,.14);
  border-color: rgba(255,255,255,.25);
}
.eyebrow-on-dark::before { background: #fff; box-shadow: none }
.subtitle { color: rgba(255,255,255,.88); margin: 1rem auto 0 }

@media (max-width: 720px) { .page-hero { padding: 7.5rem 0 3rem } }
</style>
