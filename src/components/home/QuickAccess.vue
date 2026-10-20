<template>
  <section class="block">
    <div class="container quick-grid">
      <router-link
        v-for="(item, i) in items" :key="item.key"
        :to="item.to" class="quick card reveal" :class="`reveal-${i + 1}`"
      >
        <span class="halo"><IconTile :icon="item.icon" :size="84" shape="circle" /></span>
        <div class="quick-body">
          <h3>{{ t(`home.quick.${item.key}.title`) }}</h3>
          <p>{{ t(`home.quick.${item.key}.text`) }}</p>
          <!-- Pago en Línea: logos de todos los medios (src/data/pagos.js) -->
          <span v-if="item.logos" class="pay-logos">
            <img v-for="m in mediosDePago" :key="m.key" :src="m.logo" :alt="t(`pago.methods.${m.key}.name`)" loading="lazy" />
          </span>
          <span class="round-arrow"><ChevronRight :size="18" /></span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Gauge, CreditCard, Building2, ChevronRight } from 'lucide-vue-next';
import IconTile from '../ui/IconTile.vue';
import { mediosDePago } from '../../data/pagos.js';

const { t } = useI18n();

const items = [
  { key: 'speed', icon: Gauge, to: { name: 'test-velocidad' } },
  { key: 'pay', icon: CreditCard, to: { name: 'pago-en-linea' }, logos: true },
  { key: 'office', icon: Building2, to: { name: 'nuestras-oficinas' } }
];
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.quick-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem }
.quick {
  display: flex; align-items: center; gap: 1.3rem;
  padding: 1.6rem 1.5rem;
}
.halo {
  display: grid; place-items: center; flex: none;
  width: 112px; height: 112px; border-radius: 50%;
  background: radial-gradient(closest-side, var(--green-soft) 60%, rgba(236,248,240,0));
}
.quick-body { display: flex; flex-direction: column; align-items: flex-start; min-width: 0 }
.quick h3 { margin: 0; font-size: 1.2rem; font-weight: 800; line-height: 1.2; letter-spacing: -.01em; color: var(--ink) }
.quick p { margin: .45rem 0 0; font-size: .86rem; color: var(--ink-dim); line-height: 1.5 }
/* logos con la misma altura para que pesen igual */
.pay-logos { display: flex; flex-wrap: wrap; align-items: center; gap: .45rem .7rem; margin-top: .7rem }
.pay-logos img { height: 20px; width: auto }
.round-arrow { margin-top: .9rem; width: 34px; height: 34px }
.quick:hover .round-arrow { background: var(--green); color: #fff; border-color: var(--green) }

@media (max-width: 1000px) {
  .quick-grid { grid-template-columns: 1fr }
}
@media (max-width: 420px) {
  .quick { padding: 1.2rem; gap: 1rem }
  .halo { width: 92px; height: 92px }
}
</style>
