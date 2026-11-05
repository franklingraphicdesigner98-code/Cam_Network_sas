<template>
  <!-- Trabajos realizados: galería de fotos reales (lista editable en src/data/trabajos.js) -->
  <section class="block">
    <div class="container">
      <h2 class="section-title reveal">{{ t('works.title') }}</h2>
      <p class="section-sub reveal">{{ t('works.sub') }}</p>
      <ul v-if="trabajos.length" class="works">
        <li v-for="(w, i) in trabajos" :key="w.src" class="work reveal" :class="`reveal-${(i % 4) + 1}`">
          <img :src="w.src" :alt="tx(w.alt)" loading="lazy" width="800" height="600" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useTx } from '../../composables/useTx.js';
import { trabajos } from '../../data/trabajos.js';

const { t } = useI18n();
const tx = useTx();
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.section-sub { margin: .4rem 0 1.2rem }
.works { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem }
.work {
  aspect-ratio: 4 / 3; border-radius: var(--r-md); overflow: hidden;
  background: var(--bg-2); box-shadow: var(--neu-lite-raised);
}
.work img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease }
.work:hover img { transform: scale(1.05) }
@media (max-width: 900px) { .works { grid-template-columns: repeat(3, minmax(0, 1fr)) } }
@media (max-width: 640px) { .works { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .7rem } }
</style>
