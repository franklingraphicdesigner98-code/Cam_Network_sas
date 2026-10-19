<template>
  <section class="block">
    <div class="container">
      <div class="safety reveal">
        <!-- Fondo: fotos reales del equipo y las instalaciones (public/img/equipo/), se alternan -->
        <div class="safety-bg" aria-hidden="true">
          <img v-for="(src, i) in teamPhotos" :key="src" :src="src" alt="" :class="{ active: i === photo }" loading="lazy" />
        </div>
        <div class="safety-copy">
          <span class="no-contract"><BadgeCheck :size="16" /> {{ t('home.safety.badge') }}</span>
          <h2>{{ t('home.safety.title') }}</h2>
          <p class="safety-sub">{{ t('home.safety.sub') }}</p>
          <ul>
            <li v-for="(tip, i) in tips" :key="i"><Check :size="18" />{{ rt(tip) }}</li>
          </ul>
          <button type="button" class="btn btn-glass btn-sm" :aria-expanded="showMore" @click="showMore = !showMore">
            {{ showMore ? t('home.safety.ctaLess') : t('home.safety.cta') }}
            <ChevronRight :size="16" class="more-chev" :class="{ open: showMore }" />
          </button>
        </div>
        <div class="shield" aria-hidden="true">
          <Shield :size="190" :stroke-width="1.1" class="shield-outline" />
          <Zap :size="74" :stroke-width="1.6" class="shield-bolt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { Check, ChevronRight, Shield, Zap, BadgeCheck } from 'lucide-vue-next';

const { t, tm, rt } = useI18n();

const teamPhotos = [
  '/img/equipo/tecnico-torre.webp',
  '/img/equipo/equipo-oficina.webp',
  '/img/equipo/tecnico-terreno.webp',
  '/img/equipo/instalacion-rural.webp',
  '/img/equipo/torre-antenas.webp',
  '/img/equipo/torre-enlaces.webp'
];
const photo = ref(0);
let timer = null;
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  timer = setInterval(() => { photo.value = (photo.value + 1) % teamPhotos.length; }, 4500);
});
onBeforeUnmount(() => clearInterval(timer));

const showMore = ref(false);
const tips = computed(() => [
  ...tm('home.safety.tips'),
  ...(showMore.value ? tm('home.safety.more') : [])
]);
</script>

<style scoped>
.block { padding: 1.25rem 0 }
/* ---------- Seguridad eléctrica ---------- */
.safety {
  position: relative; overflow: hidden;
  display: flex; align-items: center; gap: 1rem;
  padding: 2.2rem 2rem;
  border-radius: var(--r-lg);
  color: #fff;
  background:
    radial-gradient(70% 90% at 90% 60%, rgba(34,197,94,.35) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.safety-bg { position: absolute; inset: 0; z-index: 0 }
.safety-bg img {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  opacity: 0; transform: scale(1.06); transition: opacity 1.2s ease, transform 6s ease-out;
}
.safety-bg img.active { opacity: 1; transform: scale(1) }
/* velo verde oscuro: las fotos se ven de fondo y el texto sigue legible */
.safety-bg::after {
  content: ""; position: absolute; inset: 0;
  background:
    linear-gradient(90deg, rgba(6,32,17,.94) 0%, rgba(8,45,24,.86) 50%, rgba(10,60,30,.6) 100%),
    radial-gradient(70% 90% at 90% 60%, rgba(34,197,94,.3) 0%, rgba(34,197,94,0) 65%);
}
.safety-copy { position: relative; z-index: 1; flex: 1 }
.no-contract :deep(svg) { color: var(--green-3) }
.no-contract {
  display: inline-flex; align-items: center; gap: .4rem; margin-bottom: 1rem;
  padding: .4rem .85rem; border-radius: 999px;
  font-size: .78rem; font-weight: 800; letter-spacing: .02em; color: #fff;
  background: #354d9b; box-shadow: 0 6px 18px rgba(10,25,70,.35);   /* azul del logo */
}
.shield { z-index: 1 }
.safety h2 { margin: 0; font-size: clamp(1.5rem, 2.6vw, 2.05rem); font-weight: 800; line-height: 1.15; letter-spacing: -.02em }
.safety-sub { margin: .9rem 0 1.1rem; font-size: 1.05rem; font-weight: 700; color: var(--green-3); max-width: 24ch; line-height: 1.3 }
.safety ul { list-style: none; padding: 0; margin: 0 0 1.6rem; display: flex; flex-direction: column; gap: .65rem }
.safety li { display: flex; align-items: flex-start; gap: .6rem; font-size: .92rem; color: rgba(255,255,255,.9); line-height: 1.4 }
.safety li :deep(svg) { flex: none; color: var(--green-3); margin-top: 1px }
.more-chev { transition: transform .2s ease }
.more-chev.open { transform: rotate(90deg) }

.shield { position: relative; flex: none; display: grid; place-items: center; width: 200px; height: 220px }
.shield-outline {
  color: var(--green-3);
  filter: drop-shadow(0 0 18px rgba(74,222,128,.7));
  fill: rgba(34,197,94,.14);
}
.shield-bolt {
  position: absolute; color: #d9ffe6; fill: var(--green-3);
  filter: drop-shadow(0 0 16px rgba(134,239,172,.95));
  transform: translateY(-4px);
}

@media (max-width: 560px) {
  .safety { padding: 1.4rem }
  .shield { display: none }
}
</style>
