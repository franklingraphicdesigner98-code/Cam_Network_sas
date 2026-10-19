<template>
  <header class="hero">
    <!-- Fotos a todo el ancho que se alternan; el degradado verde a la izquierda da contraste al texto.
         Están en public/img/hero/ en dos tamaños (1920 y 960 px) -->
    <img
      v-for="(photo, i) in photos" :key="photo"
      :src="`/img/hero/${photo}-1920.webp`"
      :srcset="`/img/hero/${photo}-960.webp 960w, /img/hero/${photo}-1920.webp 1920w`"
      sizes="100vw"
      :alt="i === active ? rt(alts[i]) : ''"
      class="hero-bg" :class="{ active: i === active }"
      :fetchpriority="i === 0 ? 'high' : 'low'"
      :loading="i === 0 ? 'eager' : 'lazy'"
    />
    <div class="hero-shade" aria-hidden="true" />

    <div class="container hero-inner">
      <div class="hero-copy">
        <h1 class="display reveal">{{ t('hero.title') }}</h1>
        <p class="lead subtitle reveal reveal-1">{{ t('hero.text') }}</p>
        <p class="tagline reveal reveal-2"><Handshake :size="20" />{{ t('hero.tagline') }}</p>
        <BaseButton :to="{ name: 'cobertura' }" variant="primary" class="hero-cta reveal reveal-3">
          {{ t('hero.cta') }}
          <template #icon-right><ArrowRight :size="18" /></template>
        </BaseButton>
      </div>
    </div>

  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { Handshake, ArrowRight } from 'lucide-vue-next';
import BaseButton from '../ui/BaseButton.vue';

const { t, tm, rt } = useI18n();

// Mismo orden que hero.alts en src/locales/*.js
const photos = ['montanas-antena', 'instalacion-solar', 'paneles-torre', 'valle', 'panorama'];
const alts = computed(() => tm('hero.alts'));
const active = ref(0);

let timer = null;
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  timer = setInterval(() => { active.value = (active.value + 1) % photos.length; }, 6000);
});
onBeforeUnmount(() => clearInterval(timer));
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  display: flex; align-items: center;
  min-height: clamp(540px, 82vh, 780px);
  padding: calc(var(--nav-h) + 3rem) 0 4rem;
  color: #fff;
  background: var(--forest);
}
.hero-bg {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; object-position: 70% 50%;
  opacity: 0; transform: scale(1.08);
  transition: opacity 1.4s ease, transform 7.5s ease-out;
}
.hero-bg.active { opacity: 1; transform: scale(1) }
.hero-shade {
  position: absolute; inset: 0;
  background:
    linear-gradient(90deg, rgba(5,38,19,.94) 0%, rgba(8,62,31,.84) 30%, rgba(10,80,38,.45) 55%, rgba(10,80,38,0) 75%),
    linear-gradient(0deg, rgba(5,38,19,.45) 0%, rgba(5,38,19,0) 35%);
}
.hero-inner { position: relative; z-index: 1; width: 100% }
.hero-copy { max-width: 560px }

.hero .display {
  color: #fff;
  font-size: clamp(2.4rem, 5vw, 4rem);
  text-shadow: 0 4px 24px rgba(0,0,0,.25);
}
.subtitle {
  margin: 1.3rem 0 0; max-width: 40ch;
  color: rgba(255,255,255,.9); font-size: clamp(1rem, 1.6vw, 1.2rem);
}
.tagline {
  display: flex; align-items: center; gap: .55rem;
  margin: 1.4rem 0 0;
  font-style: italic; font-weight: 600; font-size: .98rem;
  color: #fff;
}
.tagline :deep(svg) { color: var(--green-3) }
.hero-cta { margin-top: 2rem }

@media (prefers-reduced-motion: reduce) {
  .hero-bg { transition: none; transform: none }
}
@media (max-width: 720px) {
  .hero { min-height: 0; padding: calc(var(--nav-h) + 3.5rem) 0 3.5rem }
  .hero-bg { object-position: 75% 50% }
  .hero-shade {
    background: linear-gradient(90deg, rgba(5,38,19,.92) 0%, rgba(8,62,31,.8) 60%, rgba(10,80,38,.55) 100%);
  }
}
</style>
