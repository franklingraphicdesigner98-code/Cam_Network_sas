<template>
  <ServiceLayout
    service-key="solar" :icon="SolarPanel"
    :title="t('servicios.solar.title')" :subtitle="t('servicios.solar.subtitle')"
    image="/img/hero/instalacion-solar-960.webp" :image-alt="t('servicios.solar.imageAlt')"
  >
    <!-- Planes (datos en src/data/planesSolares.js) -->
    <section class="svc-block">
      <div class="container">
        <h2 class="svc-heading reveal">{{ t('servicios.solar.plansTitle') }}</h2>
        <p class="svc-sub reveal">{{ t('servicios.solar.plansSub') }}</p>
        <div class="splans">
          <article
            v-for="(p, i) in planesSolares" :key="p.key"
            class="splan card reveal" :class="[`reveal-${i + 1}`, { featured: p.recomendado }]"
          >
            <span v-if="p.recomendado" class="splan-badge"><Star :size="14" fill="currentColor" /> {{ t('servicios.solar.recommended') }}</span>
            <h3>{{ tx(p.nombre) }}</h3>
            <p class="splan-cap"><Zap :size="18" /> {{ tx(p.capacidad) }}</p>
            <p class="splan-ideal"><span>{{ t('servicios.solar.idealFor') }}:</span> {{ tx(p.idealPara) }}</p>
            <p class="splan-label">{{ t('servicios.solar.includes') }}</p>
            <ul class="splan-list">
              <li v-for="(it, k) in p.incluye" :key="k">
                <span class="splan-icon" aria-hidden="true"><component :is="iconos[it.icono] || Check" :size="17" /></span>
                {{ tx(it.texto) }}
              </li>
            </ul>
            <a
              :href="planLink(p)" target="_blank" rel="noopener noreferrer"
              class="btn btn-primary splan-cta" :aria-label="t('servicios.solar.requestPlanAria', { plan: tx(p.nombre) })"
            >
              {{ t('servicios.solar.requestPlan') }} <MessageCircle :size="17" />
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- Qué puedes lograr -->
    <section class="svc-block">
      <div class="container">
        <div class="achieve reveal">
          <h2>{{ t('servicios.solar.achieveTitle') }}</h2>
          <ul>
            <li v-for="(item, i) in tm('servicios.solar.achieve')" :key="i"><Check :size="18" />{{ rt(item) }}</li>
          </ul>
        </div>
      </div>
    </section>
  </ServiceLayout>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import {
  SolarPanel, Check,
  Zap, Star, MessageCircle, Cctv, Tv, Fan, Wifi, Refrigerator, Lightbulb, WashingMachine
} from 'lucide-vue-next';
import ServiceLayout from '../../components/services/ServiceLayout.vue';
import { planesSolares } from '../../data/planesSolares.js';
import { whatsappLink } from '../../data/contacto.js';

const { t, tm, rt, locale } = useI18n();
const tx = (o) => o[locale.value] || o.es;

// Ícono de cada ítem de "Incluye" (clave "icono" en src/data/planesSolares.js)
const iconos = { camaras: Cctv, tv: Tv, ventilador: Fan, internet: Wifi, nevera: Refrigerator, luces: Lightbulb, lavadora: WashingMachine };
// WhatsApp de asesorías con el mensaje ya escrito (whatsappLink usa encodeURIComponent)
const planLink = (p) => whatsappLink('asesorias', t('servicios.solar.planMsg', { plan: tx(p.nombre), capacidad: tx(p.capacidad) }));
</script>

<style scoped>
/* ---------- Planes ---------- */
.splans { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; align-items: stretch; margin-top: 1.4rem }
.splan {
  position: relative; display: flex; flex-direction: column;
  padding: 1.7rem 1.5rem 1.5rem;
  background: var(--neu-lite-bg); border: 0; box-shadow: var(--neu-lite-raised);
}
.splan:hover { box-shadow: var(--neu-lite-hover) }
.splan.featured { box-shadow: var(--neu-lite-raised), 0 0 0 2px var(--green) }
.splan.featured:hover { box-shadow: var(--neu-lite-hover), 0 0 0 2px var(--green) }
.splan-badge {
  position: absolute; top: -.85rem; left: 50%; transform: translateX(-50%);
  display: inline-flex; align-items: center; gap: .35rem; white-space: nowrap;
  padding: .35rem .85rem; border-radius: 999px;
  font-size: .78rem; font-weight: 800; letter-spacing: .02em; color: #fff;
  background: linear-gradient(135deg, var(--green) 0%, var(--green-deep) 100%);
  box-shadow: 0 6px 16px rgba(22, 163, 74, .35);
}
.splan h3 { margin: 0; font-size: 1.3rem; font-weight: 800; color: var(--ink) }
.splan-cap {
  align-self: flex-start; display: inline-flex; align-items: center; gap: .4rem;
  margin: .8rem 0 0; padding: .45rem .9rem; border-radius: 999px;
  font-size: 1.05rem; font-weight: 800; letter-spacing: -.01em;
  color: var(--green-deep); background: var(--green-soft); box-shadow: var(--neu-lite-inset);
}
.splan-cap :deep(svg) { color: var(--green) }
.splan-ideal { margin: 1rem 0 0; font-size: .95rem; line-height: 1.5; color: var(--ink) }
.splan-ideal span { font-weight: 700; color: var(--ink-dim) }
.splan-label { margin: 1.2rem 0 .6rem; font-size: .75rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--green) }
.splan-list { list-style: none; margin: 0 0 1.5rem; padding: 0; display: flex; flex-direction: column; gap: .6rem }
.splan-list li { display: flex; align-items: center; gap: .65rem; font-size: .95rem; color: var(--ink) }
.splan-icon {
  flex: none; display: grid; place-items: center; width: 32px; height: 32px; border-radius: 10px;
  color: var(--green-deep); background: #fff; box-shadow: var(--neu-lite-raised);
}
/* el botón siempre al fondo: las 3 tarjetas quedan parejas aunque tengan distinto número de ítems */
.splan-cta { margin-top: auto; justify-content: center; gap: .45rem }
.splan-cta:focus-visible { outline: 3px solid var(--green-deep); outline-offset: 3px }

.achieve {
  padding: clamp(1.6rem, 4vw, 2.4rem); border-radius: var(--r-lg);
  background: var(--green-soft); border: 1px solid rgba(22,163,74,.25);
}
.achieve h2 { margin: 0 0 1.2rem; font-size: clamp(1.3rem, 2.4vw, 1.7rem); font-weight: 800; color: var(--green-deep) }
.achieve ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem 1.5rem }
.achieve li { display: flex; gap: .6rem; align-items: flex-start; color: var(--ink); line-height: 1.5 }
.achieve li :deep(svg) { flex: none; color: var(--green); margin-top: 2px }

@media (max-width: 900px) {
  .splans { grid-template-columns: 1fr; max-width: 460px; margin-inline: auto; gap: 2rem }
}
@media (max-width: 600px) {
  .achieve ul { grid-template-columns: 1fr }
}
</style>
