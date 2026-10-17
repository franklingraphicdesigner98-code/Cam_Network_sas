<template>
  <section class="block">
    <div class="container services-grid">
      <div class="panel services reveal">
        <h2 class="section-title">{{ t('home.services.title') }}</h2>
        <p class="section-sub">{{ t('home.services.sub') }}</p>

        <div class="service-list">
          <div v-for="s in services" :key="s.key" class="service card">
            <IconTile :icon="s.icon" :size="58" />
            <div class="service-body">
              <h3>{{ t(`home.services.items.${s.key}`) }}</h3>
              <router-link :to="{ name: 'contacto', query: { servicio: s.key } }" class="pill-link">
                {{ t('home.services.info') }} <ChevronRight :size="14" />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="safety reveal reveal-2">
        <div class="safety-copy">
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
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Wifi, SolarPanel, Cctv, Wrench, Check, ChevronRight, Shield, Zap } from 'lucide-vue-next';
import IconTile from '../ui/IconTile.vue';

const { t, tm, rt } = useI18n();

const services = [
  { key: 'internet', icon: Wifi },
  { key: 'solar', icon: SolarPanel },
  { key: 'camaras', icon: Cctv },
  { key: 'instalacion', icon: Wrench }
];

const showMore = ref(false);
const tips = computed(() => [
  ...tm('home.safety.tips'),
  ...(showMore.value ? tm('home.safety.more') : [])
]);
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.services-grid {
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1.25rem;
}

/* ---------- Servicios ---------- */
.services { padding: 1.8rem }
.service-list {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem;
  margin-top: 1.4rem;
}
.service {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.15rem; border-radius: var(--r-md);
  background: linear-gradient(180deg, #fff 0%, #f8fbf9 100%);
}
.service-body { display: flex; flex-direction: column; align-items: flex-start; gap: .7rem; min-width: 0 }
.service h3 { margin: 0; font-size: .98rem; font-weight: 700; line-height: 1.25; color: var(--ink) }

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
.safety-copy { position: relative; z-index: 1; flex: 1 }
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

@media (max-width: 1000px) {
  .services-grid { grid-template-columns: 1fr }
}
@media (max-width: 560px) {
  .service-list { grid-template-columns: 1fr }
  .services, .safety { padding: 1.4rem }
  .shield { display: none }
}
</style>
