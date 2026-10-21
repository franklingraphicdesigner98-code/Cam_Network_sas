<template>
  <AppNav />
  <main>
    <header class="coverage-hero">
      <!-- Malla de terreno 3D (scripts/generar-terreno-3d.cjs): nace de partículas, gira y se asienta -->
      <ParticleTerrain src="/img/terreno-3d-ancho.webp" class="terrain" @settle="mapReady = true" />
      <div class="container coverage-inner">
        <div class="coverage-copy">
          <span class="eyebrow reveal">{{ t('cobertura.eyebrow') }}</span>
          <h1 class="display reveal reveal-1">{{ t('cobertura.title') }}</h1>
          <p class="lead subtitle reveal reveal-2">
            {{ t('cobertura.subtitle') }}
          </p>
          <div class="info-card reveal reveal-3">
            <IconTile :icon="Users" :size="44" />
            <p>{{ t('cobertura.info') }}</p>
          </div>
        </div>

        <div class="coverage-media reveal reveal-4">
          <!-- Pines sobre la malla de terreno del fondo; posición geográfica aproximada (norte arriba) -->
          <!-- los pines aparecen cuando el terreno empieza a asentarse -->
          <div class="pins-area" :class="{ ready: mapReady }" aria-hidden="true">
            <template v-if="mapReady">
              <span class="zone" />
              <MapPins :pins="towns" :size="34" intro :intro-delay="0.5" />
            </template>
          </div>
          <ul class="sr-only">
            <li v-for="town in towns" :key="town.name">{{ town.name }}</li>
          </ul>
        </div>
      </div>
    </header>

    <section class="features">
      <div class="container features-grid">
        <div v-for="f in features" :key="f.key" class="feature card">
          <IconTile :icon="f.icon" :size="46" />
          <div>
            <p class="feature-title">{{ t(`cobertura.features.${f.key}.title`) }}</p>
            <p class="feature-text">{{ t(`cobertura.features.${f.key}.text`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="s">
      <div class="container towns-cta reveal">
        <p class="lead">{{ t('cobertura.missingTown') }}</p>
        <BaseButton :to="{ name: 'contacto' }" variant="primary">{{ t('cobertura.ask') }}</BaseButton>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Users, Wifi, ShieldCheck, Sun, Headphones, Cpu } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import IconTile from '../components/ui/IconTile.vue';
import MapPins from '../components/ui/MapPins.vue';
import ParticleTerrain from '../components/ui/ParticleTerrain.vue';
import { useReveal } from '../composables/useReveal.js';

const { t } = useI18n();

// x = oeste → este, y = norte → sur (en % del área del mapa)
const mapReady = ref(false);

const towns = [
  { name: 'Villanueva', x: 26, y: 30 },
  { name: 'Barichara', x: 13, y: 39 },
  { name: 'Cabrera', x: 5, y: 50 },
  { name: 'Curití', x: 46, y: 43 },
  { name: 'San Gil', x: 34, y: 56 },
  { name: 'Pinchote', x: 19, y: 63 },
  { name: 'Pitiguao', x: 70, y: 55 },
  { name: 'San Miguel', x: 91, y: 45 },
  { name: 'Mogotes', x: 60, y: 68 },
  { name: 'Valle de San José', x: 36, y: 75 },
  { name: 'Páramo', x: 17, y: 83 },
  { name: 'San Joaquín', x: 80, y: 82 },
  { name: 'Ocamonte', x: 36, y: 95 }
];

const features = [
  { key: 'conectividad', icon: Wifi },
  { key: 'seguridad', icon: ShieldCheck },
  { key: 'energia', icon: Sun },
  { key: 'soporte', icon: Headphones },
  { key: 'tecnologia', icon: Cpu }
];

useReveal();
</script>

<style scoped>
.coverage-hero {
  position: relative;
  overflow: hidden;
  padding: calc(var(--nav-h) + 3.5rem) 0 3rem;
  background:
    radial-gradient(50% 70% at 75% 50%, rgba(74,222,128,.22) 0%, rgba(74,222,128,0) 70%),
    linear-gradient(180deg, #ffffff 0%, var(--bg-1) 100%);
}
.terrain {
  position: absolute; left: 0; right: 0; bottom: 0;
  width: 100%; height: 78%;
  --obj-pos: 50% 30%;
  opacity: .85;
  /* se desvanece hacia arriba, hacia el borde inferior y hacia el texto (izquierda) */
  --fade-v: linear-gradient(0deg, transparent 0%, #000 14%, #000 40%, transparent 100%);
  --fade-h: linear-gradient(90deg, transparent 0%, rgba(0,0,0,.15) 30%, #000 60%);
  -webkit-mask-image: var(--fade-v), var(--fade-h);
  -webkit-mask-composite: source-in;
  mask-image: var(--fade-v), var(--fade-h);
  mask-composite: intersect;
  pointer-events: none;
}
.pins-area {
  position: relative; width: 100%; max-width: 560px; aspect-ratio: 1.15 / 1; margin: 0 auto;
  opacity: 0;
}
.pins-area.ready { animation: map-spin 1.1s cubic-bezier(.2, .8, .2, 1) both }
/* ---------- Entrada: el mapa gira y se asienta, luego caen los pines ---------- */
@keyframes map-spin {
  0% { opacity: 0; transform: rotate(-35deg) scale(.7) }
  100% { opacity: 1; transform: none }
}
.zone { animation: zone-pulse 3.5s ease-in-out 1.2s infinite }
@keyframes zone-pulse { 0%, 100% { transform: scale(1); opacity: 1 } 50% { transform: scale(1.06); opacity: .75 } }
@media (prefers-reduced-motion: reduce) {
  .pins-area, .pins-area.ready, .zone { animation: none; opacity: 1 }
}
.zone {
  position: absolute; inset: 12% 0 0 0; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(34,197,94,.3), rgba(34,197,94,.1) 65%, rgba(34,197,94,0));
}
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.coverage-inner {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
}
.coverage-copy { text-align: left }
.coverage-hero .display { font-size: clamp(2.2rem, 4vw, 3.1rem); margin-top: 1.2rem }
.subtitle { margin: 1.1rem 0 0; max-width: 46ch }

.info-card {
  display: flex; align-items: center; gap: .9rem;
  margin-top: 2rem; padding: .9rem 1.1rem; max-width: 440px;
  background: #fff; border: 1px solid var(--border);
  border-radius: var(--r-md); box-shadow: var(--shadow);
}
.info-card p { margin: 0; font-size: .9rem; color: var(--ink-dim); line-height: 1.5 }

.features { padding: 1.5rem 0 }
.features-grid {
  display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1rem;
}
.feature { display: flex; flex-direction: column; align-items: flex-start; gap: .9rem; padding: 1.3rem }
.feature-title { margin: 0 0 .25rem; font-weight: 800; font-size: .98rem; color: var(--green-deep) }
.feature-text { margin: 0; font-size: .84rem; color: var(--ink-dim); line-height: 1.45 }

.towns-cta {
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
  text-align: center;
}
.towns-cta .lead { margin: 0; font-weight: 600; color: var(--ink) }

@media (max-width: 900px) {
  .coverage-inner { grid-template-columns: 1fr; text-align: center }
  .coverage-copy { text-align: center }
  .info-card { margin-left: auto; margin-right: auto; text-align: left }
  .subtitle { margin-left: auto; margin-right: auto }
  .coverage-media { order: -1 }
  /* en celular/tablet el diagrama va arriba: el terreno queda detrás de él */
  .terrain {
    top: calc(var(--nav-h) + 1rem); bottom: auto; height: min(70vw, 460px);
    --obj-pos: 50% 40%;
    --fade-h: linear-gradient(#000, #000);
  }
}
@media (max-width: 720px) { .coverage-hero { padding: calc(var(--nav-h) + 2rem) 0 2.5rem } }
@media (max-width: 1000px) {
  .features-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) }
}
@media (max-width: 640px) {
  .features-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) }
}
@media (max-width: 400px) {
  .features-grid { grid-template-columns: 1fr }
}
</style>
