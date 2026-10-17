<template>
  <section class="block">
    <div class="container">
      <div class="panel band reveal">
        <div class="band-copy">
          <h2 class="section-title">{{ t('home.coverage.title') }}</h2>
          <p class="section-sub">{{ t('home.coverage.sub') }}</p>
          <router-link :to="{ name: 'cobertura' }" class="pill-link">
            {{ t('home.coverage.cta') }} <ChevronRight :size="14" />
          </router-link>
        </div>

        <div class="map" aria-hidden="true">
          <img src="/img/terreno-3d.webp" alt="" class="terrain" loading="lazy" />
          <span class="zone" />
          <MapPins :pins="pins" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ChevronRight } from 'lucide-vue-next';
import MapPins from '../ui/MapPins.vue';

const { t } = useI18n();

// Posiciones decorativas (no geográficas) sobre el mapa
const pins = [
  { name: 'San Gil', x: 26, y: 58 },
  { name: 'Barichara', x: 44, y: 80 },
  { name: 'Mogotes', x: 58, y: 48 },
  { name: 'Curití', x: 74, y: 76 },
  { name: 'Pinchote', x: 88, y: 66 }
];
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.band {
  position: relative; overflow: hidden;
  display: grid; grid-template-columns: minmax(0, .7fr) minmax(0, 1.3fr);
  align-items: center; min-height: 220px;
}
.band-copy {
  position: relative; z-index: 2;
  padding: 2rem 1.8rem;
  display: flex; flex-direction: column; align-items: flex-start; gap: 1.2rem;
}
.band-copy .section-sub { margin: -0.6rem 0 0 }

.map { position: relative; align-self: stretch; min-height: 220px; overflow: hidden }
/* Modelo digital de terreno en malla alámbrica: se genera con scripts/generar-terreno-3d.cjs */
.terrain {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; object-position: 50% 22%;
}
/* resalta en verde la zona con cobertura */
.zone {
  position: absolute; left: 18%; top: 30%; width: 75%; height: 70%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(34,197,94,.28), rgba(34,197,94,.08) 70%, rgba(34,197,94,0));
  mix-blend-mode: multiply;
}
/* desvanece el borde izquierdo del mapa hacia el texto */
.map::before {
  content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 22%);
}

@media (max-width: 800px) {
  .band { grid-template-columns: 1fr }
  .map::before { background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0) 25%) }
}
</style>
