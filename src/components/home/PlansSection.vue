<template>
  <section class="block">
    <div class="container plans-grid">
      <div class="plans-cards">
        <div
          v-for="(p, i) in plans" :key="p.key"
          class="plan card reveal" :class="[`reveal-${(i % 4) + 1}`, i % 2 ? 'from-right' : 'from-left', { contain: p.fit === 'contain' }]"
          @click="abrir(p, $event)"
        >
          <img v-if="p.img" :src="p.img" :alt="t(`home.plans.${p.key}.alt`)" class="plan-img" loading="lazy" />
          <div class="plan-copy">
            <h3>{{ t(`home.plans.${p.key}.title`) }}</h3>
            <p>{{ t(`home.plans.${p.key}.text`) }}</p>
            <a v-if="p.href" :href="p.href" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">{{ t('home.plans.ctaInfo') }}</a>
            <BaseButton v-else :to="p.to" variant="primary" class="btn-sm">{{ t(p.key === 'internet' ? 'home.plans.cta' : 'home.plans.ctaInfo') }}</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import BaseButton from '../ui/BaseButton.vue';
import { whatsappLink } from '../../data/contacto.js';

const { t } = useI18n();
const router = useRouter();

// clic en cualquier parte de la tarjeta = clic en su botón (el botón sigue siendo el enlace real,
// así que con teclado y lector de pantalla todo funciona igual)
function abrir(p, e) {
  if (e.target.closest('a')) return;   // el clic ya fue en el botón
  if (p.href) window.open(p.href, '_blank', 'noopener');
  else router.push(p.to);
}

// TV no tiene página propia: el botón abre WhatsApp de Asesorías
const plans = computed(() => [
  { key: 'internet', img: '/img/instalacion-fibra-optica.jpeg', to: { name: 'servicio-internet' } },
  { key: 'solar', img: '/img/hero/instalacion-solar-960.webp', to: { name: 'servicio-solar' } },
  // foto PNG sin fondo: se muestra completa (no recortada)
  { key: 'camaras', img: '/img/servicios/plan-camaras.webp', to: { name: 'servicio-camaras' }, fit: 'contain' },
  { key: 'tv', img: '/img/servicios/plan-tv.webp', href: whatsappLink('asesorias', t('home.plans.tvMsg')) }
]);
</script>

<style scoped>
.block { padding: 1.25rem 0 }
/* las 4 tarjetas en cuadrícula 2×2 */
.plans-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem }

.plan {
  position: relative; overflow: hidden;
  min-height: 210px;
  display: flex; align-items: stretch;
}
.plan-img {
  position: absolute; inset: 0 0 0 38%; width: 62%; height: 100%;
  object-fit: cover;
  transition: transform .6s ease;
}
.plan:hover .plan-img { transform: scale(1.05) }
.plan.contain .plan-img { z-index: 2; inset: 8% 4% 8% auto; width: 46%; height: 84%; object-fit: contain; filter: drop-shadow(0 12px 18px rgba(14,58,32,.18)) }
.plan.contain::before { background: linear-gradient(90deg, #fff 0%, #fff 50%, var(--green-soft) 100%) }
/* degradado blanco → foto para que el texto siempre sea legible */
.plan::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(90deg, #fff 0%, #fff 40%, rgba(255,255,255,.75) 58%, rgba(255,255,255,0) 82%);
}
.plan { cursor: pointer }
.plan-copy {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 1.6rem 1.4rem; max-width: 62%;
}
.plan h3 {
  margin: 0; font-size: clamp(1.25rem, 2vw, 1.5rem); font-weight: 800; line-height: 1.18;
  letter-spacing: -.015em; color: var(--green-deep);
}
.plan p { margin: .6rem 0 1.1rem; font-size: .9rem; color: var(--ink-dim); line-height: 1.55 }
.plan-copy .btn { margin-top: auto }

@media (max-width: 640px) {
  .plans-cards { grid-template-columns: 1fr }
  .plan-copy { max-width: 70% }
}

/* neumorfismo luminoso (tokens --neu-lite-* en src/assets/tokens.css) */
.plan { background: var(--neu-lite-bg); border: 0; box-shadow: var(--neu-lite-raised) }
.plan:hover { box-shadow: var(--neu-lite-hover) }
</style>
