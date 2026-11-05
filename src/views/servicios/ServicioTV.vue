<template>
  <ServiceLayout
    service-key="tv" :icon="Tv"
    :title="t('tv.title')" :subtitle="t('tv.subtitle', { total: totalCanales })"
    image="/img/servicios/plan-tv.webp" :image-alt="t('tv.imageAlt')"
    :cta-title="t('tv.closing')"
  >
    <!-- Parrilla de canales (datos en src/data/canales.js) -->
    <section class="svc-block">
      <div class="container">
        <div class="grid-head">
          <div>
            <h2 class="svc-heading reveal">{{ t('tv.gridTitle') }}</h2>
            <p class="svc-sub reveal">{{ t('tv.gridSub') }}</p>
          </div>
          <label class="search reveal">
            <Search :size="18" aria-hidden="true" />
            <span class="sr-only">{{ t('tv.searchLabel') }}</span>
            <input v-model.trim="busqueda" type="search" :placeholder="t('tv.searchPlaceholder')" maxlength="40" />
          </label>
        </div>

        <div v-if="filtradas.length" class="categories">
          <article v-for="c in filtradas" :key="c.key" class="category" :class="`cat-${c.key}`">
            <h3><component :is="iconos[c.key]" :size="18" aria-hidden="true" />{{ t(`tv.categories.${c.key}`) }}<span class="count">{{ c.canales.length }}</span></h3>
            <ul>
              <li v-for="ch in c.canales" :key="ch.numero">
                <span class="num">{{ ch.numero }}</span><span class="name">{{ ch.nombre }}</span>
              </li>
            </ul>
          </article>
        </div>
        <p v-else class="no-results">{{ t('tv.noResults') }}</p>
      </div>
    </section>
  </ServiceLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Tv, Search, Flag, Trophy, Clapperboard, Globe, Baby, Newspaper, Smile, Heart, Music, Church, Gamepad2 } from 'lucide-vue-next';
import ServiceLayout from '../../components/services/ServiceLayout.vue';
import { categoriasTV, totalCanales } from '../../data/canales.js';

const { t } = useI18n();
const iconos = {
  nacionales: Flag, deportes: Trophy, peliculas: Clapperboard, cultura: Globe, infantiles: Baby, noticias: Newspaper,
  comedia: Smile, telenovelas: Heart, musica: Music, religiosos: Church, gamers: Gamepad2
};

// búsqueda por nombre (sin importar tildes ni mayúsculas) o por número exacto
const busqueda = ref('');
const normal = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const filtradas = computed(() => {
  const q = normal(busqueda.value);
  if (!q) return categoriasTV;
  return categoriasTV
    .map((c) => ({ ...c, canales: c.canales.filter((ch) => String(ch.numero) === q || normal(ch.nombre).includes(q)) }))
    .filter((c) => c.canales.length);
});
</script>

<style scoped>
.grid-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; flex-wrap: wrap }
.search {
  display: flex; align-items: center; gap: .5rem; min-width: min(100%, 280px);
  padding: .7rem 1rem; border-radius: 999px; color: var(--ink-mute);
  background: #fbfdfa; box-shadow: var(--neu-lite-inset);
}
.search:focus-within { box-shadow: var(--neu-lite-inset), 0 0 0 3px rgba(22,163,74,.3) }
.search input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; font: inherit; color: var(--ink) }

/* columnas tipo "masonry": las categorías largas y cortas se acomodan solas */
.categories { columns: 3 300px; column-gap: 1.25rem; margin-top: 1.4rem }
.category {
  break-inside: avoid; margin-bottom: 1.25rem; padding: 1.2rem 1.2rem 1rem;
  border-radius: var(--r-lg); background: var(--neu-lite-bg); box-shadow: var(--neu-lite-raised);
}
.category h3 {
  display: flex; align-items: center; gap: .5rem; margin: 0 0 .8rem;
  font-size: 1rem; font-weight: 800; color: var(--green-deep);
}
.category h3 :deep(svg) { color: var(--green) }
.count { margin-left: auto; padding: .1rem .55rem; border-radius: 999px; font-size: .75rem; color: var(--green-deep); background: var(--green-soft) }
.category.cat-deportes h3, .category.cat-deportes h3 :deep(svg) { color: #c2410c }
.category.cat-deportes .count { color: #c2410c; background: #ffedd5 }
.category ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .35rem .8rem }
.category li { display: flex; align-items: baseline; gap: .5rem; min-width: 0; font-size: .88rem; color: var(--ink) }
.num { flex: none; min-width: 2.1rem; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--green) }
.name { overflow-wrap: anywhere }
.no-results { margin: 1.5rem 0 0; color: var(--ink-dim) }
</style>
