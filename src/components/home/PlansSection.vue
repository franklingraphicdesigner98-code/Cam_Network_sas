<template>
  <section class="block">
    <div class="container plans-grid">
      <div class="panel intro reveal">
        <h2 class="section-title">{{ t('home.plans.title') }}</h2>
        <p class="section-sub">{{ t('home.plans.sub') }}</p>
        <router-link :to="{ name: 'servicio-internet' }" class="pill-link req">
          {{ t('home.plans.requisitos') }} <ChevronRight :size="14" />
        </router-link>
      </div>

      <div
        v-for="(p, i) in plans" :key="p.key"
        class="plan card reveal" :class="`reveal-${i + 1}`"
      >
        <img :src="p.img" :alt="t(`home.plans.${p.key}Alt`)" class="plan-img" loading="lazy" />
        <div class="plan-copy">
          <h3>{{ t(`home.plans.${p.key}.title`) }}</h3>
          <p>{{ t(`home.plans.${p.key}.text`) }}</p>
          <BaseButton :to="{ name: 'servicio-internet' }" variant="primary" class="btn-sm">{{ t('home.plans.cta') }}</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ChevronRight } from 'lucide-vue-next';
import BaseButton from '../ui/BaseButton.vue';

const { t } = useI18n();

const plans = [
  { key: 'fibra', img: '/img/instalacion-fibra-optica.jpeg' },
  { key: 'hogar', img: '/img/oficina-cam-network.jpeg' }
];
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.plans-grid {
  display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.1fr) minmax(0, 1.1fr); gap: 1.25rem;
}
.intro { padding: 2rem 1.8rem; display: flex; flex-direction: column; align-items: flex-start }
.intro .section-title { font-size: clamp(1.6rem, 2.6vw, 2rem) }
.intro .section-sub { margin-top: .8rem }
.req { margin-top: auto; padding: .6rem 1rem; font-size: .8rem; line-height: 1.3 }
.intro .section-sub + .req { margin-top: 1.6rem }

.plan {
  position: relative; overflow: hidden;
  min-height: 250px;
  display: flex; align-items: stretch;
}
.plan-img {
  position: absolute; inset: 0 0 0 38%; width: 62%; height: 100%;
  object-fit: cover;
  transition: transform .6s ease;
}
.plan:hover .plan-img { transform: scale(1.05) }
/* degradado blanco → foto para que el texto siempre sea legible */
.plan::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(90deg, #fff 0%, #fff 40%, rgba(255,255,255,.75) 58%, rgba(255,255,255,0) 82%);
}
.plan-copy {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 2rem 1.6rem; max-width: 62%;
}
.plan h3 {
  margin: 0; font-size: clamp(1.25rem, 2vw, 1.5rem); font-weight: 800; line-height: 1.18;
  letter-spacing: -.015em; color: var(--green-deep);
}
.plan p { margin: .8rem 0 1.4rem; font-size: .9rem; color: var(--ink-dim); line-height: 1.55 }
.plan-copy .btn { margin-top: auto }

@media (max-width: 1000px) {
  .plans-grid { grid-template-columns: 1fr 1fr }
  .intro { grid-column: 1 / -1 }
  .req { margin-top: 1.4rem }
}
@media (max-width: 640px) {
  .plans-grid { grid-template-columns: 1fr }
  .plan-copy { max-width: 70% }
}
</style>
