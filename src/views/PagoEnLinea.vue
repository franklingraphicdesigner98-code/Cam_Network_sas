<template>
  <AppNav />
  <main>
    <PageHero :title="t('pages.pagoEnLinea.title')" :subtitle="t('pages.pagoEnLinea.subtitle')" />

    <section class="block">
      <div class="container pay-grid">
        <!-- Botón de pago -->
        <div class="pay-card reveal">
          <IconTile :icon="CreditCard" :size="64" />
          <p class="pay-intro">{{ t('pago.intro') }}</p>
          <a v-if="WOMPI_URL" :href="WOMPI_URL" target="_blank" rel="noopener noreferrer" class="btn btn-primary pay-btn">
            {{ t('pago.payNow') }} <ArrowRight :size="18" />
          </a>
          <template v-else>
            <a :href="waLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary pay-btn">
              {{ t('pago.requestLink') }} <ArrowRight :size="18" />
            </a>
            <p class="pay-note">{{ t('pago.requestNote') }}</p>
          </template>
          <span class="powered">Wompi · Bancolombia</span>
        </div>

        <!-- Pasos -->
        <div class="panel steps reveal reveal-2">
          <h2>{{ t('pago.stepsTitle') }}</h2>
          <ol>
            <li v-for="(step, i) in tm('pago.steps')" :key="i">
              <span class="step-num">{{ i + 1 }}</span>
              <div>
                <strong>{{ rt(step.title) }}</strong>
                <p>{{ rt(step.text) }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="block">
      <div class="container info-grid">
        <!-- Medios de pago -->
        <div class="panel methods reveal">
          <h2>{{ t('pago.methodsTitle') }}</h2>
          <ul>
            <li v-for="(m, i) in tm('pago.methods')" :key="i">
              <span class="method-icon"><component :is="methodIcons[i]" :size="18" /></span>{{ rt(m) }}
            </li>
          </ul>
          <p class="methods-note">{{ t('pago.methodsNote') }}</p>
        </div>

        <!-- Seguridad -->
        <div class="safety reveal reveal-2">
          <ShieldCheck :size="36" class="safety-icon" />
          <h2>{{ t('pago.safetyTitle') }}</h2>
          <p>{{ t('pago.safetyText') }}</p>
        </div>
      </div>
    </section>

    <!-- Pago en persona -->
    <section class="block last">
      <div class="container">
        <div class="panel office reveal">
          <IconTile :icon="Building2" :size="52" tone="soft" />
          <div class="office-copy">
            <h2>{{ t('pago.officeTitle') }}</h2>
            <p>{{ t('pago.officeText') }}</p>
          </div>
          <BaseButton :to="{ name: 'nuestras-oficinas' }" variant="outline" class="btn-sm">
            {{ t('pago.officeCta') }} <ChevronRight :size="16" />
          </BaseButton>
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CreditCard, ArrowRight, ChevronRight, ShieldCheck, Building2, Landmark, Smartphone, Wallet, Banknote } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import IconTile from '../components/ui/IconTile.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import { useReveal } from '../composables/useReveal.js';

// TODO: pegar aquí el enlace de pago de Wompi cuando esté disponible.
// Mientras esté vacío, el botón abre WhatsApp para solicitar el enlace.
const WOMPI_URL = '';
const WHATSAPP_NUMBER = '573112280533';

const { t, tm, rt } = useI18n();

const waLink = computed(() => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('pago.waMessage'))}`);
// Mismo orden que pago.methods en src/locales/*.js
const methodIcons = [CreditCard, Landmark, Smartphone, Wallet, Banknote];

useReveal();
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.block.last { padding-bottom: 4rem }
h2 { margin: 0 0 1rem; font-size: 1.25rem; font-weight: 800; letter-spacing: -.01em; color: var(--green-deep) }

/* ---------- Tarjeta de pago ---------- */
.pay-grid { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 1.25rem }
.pay-card {
  display: flex; flex-direction: column; align-items: flex-start;
  padding: clamp(1.6rem, 3vw, 2.4rem);
  border-radius: var(--r-lg); color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, rgba(34,197,94,.3) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.pay-intro { margin: 1.2rem 0 1.6rem; font-size: 1.1rem; line-height: 1.6; color: rgba(255,255,255,.92) }
.pay-btn { font-size: 1rem; padding: 1rem 1.7rem }
.pay-note { margin: .8rem 0 0; font-size: .82rem; color: rgba(255,255,255,.7) }
.powered { margin-top: auto; padding-top: 1.6rem; font-size: .78rem; font-weight: 600; letter-spacing: .04em; color: var(--green-3) }

/* ---------- Pasos ---------- */
.steps { padding: clamp(1.4rem, 3vw, 2rem) }
.steps ol { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1rem }
.steps li { display: flex; gap: .9rem; align-items: flex-start }
.step-num {
  flex: none; display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%;
  font-weight: 800; color: #fff; background: linear-gradient(150deg, #4ade80 0%, #16a34a 50%, #0f6b32 100%);
  box-shadow: 0 6px 14px rgba(21,128,61,.3);
}
.steps strong { display: block; color: var(--ink); font-size: .98rem }
.steps p { margin: .2rem 0 0; color: var(--ink-dim); font-size: .9rem; line-height: 1.5 }

/* ---------- Medios / seguridad ---------- */
.info-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); gap: 1.25rem }
.methods { padding: clamp(1.4rem, 3vw, 2rem) }
.methods ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .6rem }
.methods li {
  display: flex; align-items: center; gap: .6rem;
  padding: .7rem .8rem; border-radius: 12px;
  background: var(--bg-1); border: 1px solid var(--border);
  font-size: .9rem; font-weight: 600; color: var(--ink);
}
.method-icon { display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 9px; color: var(--green-deep); background: var(--green-soft) }
.methods-note { margin: .9rem 0 0; font-size: .78rem; color: var(--ink-mute) }

.safety {
  padding: clamp(1.4rem, 3vw, 2rem); border-radius: var(--r-lg);
  background: var(--green-soft); border: 1px solid rgba(22,163,74,.25);
}
.safety-icon { color: var(--green); margin-bottom: .8rem }
.safety p { margin: 0; color: var(--ink-dim); line-height: 1.65 }

/* ---------- Oficina ---------- */
.office { display: flex; align-items: center; gap: 1.2rem; padding: 1.4rem 1.8rem }
.office-copy { flex: 1 }
.office h2 { margin: 0 0 .3rem; font-size: 1.1rem }
.office p { margin: 0; color: var(--ink-dim); font-size: .92rem }

@media (max-width: 860px) {
  .pay-grid, .info-grid { grid-template-columns: 1fr }
}
@media (max-width: 560px) {
  .methods ul { grid-template-columns: 1fr }
  .office { flex-direction: column; align-items: flex-start }
}
</style>
