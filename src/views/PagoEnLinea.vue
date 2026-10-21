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
          <a v-if="EPAYCO_URL" :href="EPAYCO_URL" target="_blank" rel="noopener noreferrer" class="btn btn-primary pay-btn">
            {{ t('pago.payNow') }} <ArrowRight :size="18" />
          </a>
          <template v-else>
            <a :href="waLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary pay-btn">
              {{ t('pago.requestLink') }} <ArrowRight :size="18" />
            </a>
            <p class="pay-note">{{ t('pago.requestNote') }}</p>
          </template>
          <span class="powered">Daviplata · Bancolombia · Davivienda · ePayco · Efecty</span>
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

    <!-- Medios de pago con su video explicativo (datos en src/data/pagos.js) -->
    <section class="block">
      <div class="container">
        <h2 class="methods-title reveal">{{ t('pago.methodsTitle') }}</h2>
        <p class="methods-sub reveal">{{ t('pago.methodsSub') }}</p>
        <div class="methods-grid">
          <article
            v-for="(m, i) in mediosDePago" :key="m.key"
            class="method card reveal" :class="[`reveal-${(i % 4) + 1}`, { 'no-video': !m.video }]"
          >
            <div class="method-head">
              <!-- logo del medio; el nombre queda para lectores de pantalla -->
              <h3 class="method-logo">
                <img :src="m.logo" :alt="t(`pago.methods.${m.key}.name`)" loading="lazy" />
              </h3>
              <span class="channel-tag">{{ t(`pago.methods.${m.key}.tag`) }}</span>
            </div>
            <p class="method-text">{{ t(`pago.methods.${m.key}.text`) }}</p>
            <p v-if="m.number" class="method-number">
              {{ t('pago.accountLabel') }}: <strong>{{ m.number }}</strong>
              <span v-if="m.ref" class="method-ref">{{ t('pago.refLabel') }}</span>
            </p>
            <VerticalVideo
              v-if="m.video" :src="m.video" :poster="m.poster" :ratio="m.ratio"
              :title="t('pago.videoLabel', { medio: t(`pago.methods.${m.key}.name`) })"
              class="method-video"
            />
          </article>
        </div>
        <p class="methods-note reveal">{{ t('pago.methodsNote') }}</p>
      </div>
    </section>

    <!-- Seguridad -->
    <section class="block">
      <div class="container">
        <div class="safety reveal">
          <ShieldCheck :size="36" class="safety-icon" />
          <div>
            <h2>{{ t('pago.safetyTitle') }}</h2>
            <p>{{ t('pago.safetyText') }}</p>
          </div>
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
import { CreditCard, ArrowRight, ChevronRight, ShieldCheck, Building2 } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import IconTile from '../components/ui/IconTile.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import VerticalVideo from '../components/ui/VerticalVideo.vue';
import { mediosDePago } from '../data/pagos.js';
import { useReveal } from '../composables/useReveal.js';
import { whatsappLink } from '../data/contacto.js';

// TODO: pegar aquí el enlace de pago de ePayco cuando esté disponible.
// Mientras esté vacío, el botón abre WhatsApp para solicitar el enlace.
const EPAYCO_URL = '';

const { t, tm, rt } = useI18n();

const waLink = computed(() => whatsappLink('facturacion', t('pago.waMessage')));

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

/* ---------- Medios de pago ---------- */
.methods-title { margin: 0; font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 800; letter-spacing: -.02em; color: var(--green-deep) }
.methods-sub { margin: .4rem 0 1.4rem; color: var(--ink-dim) }
.methods-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; align-items: start }
.method { display: flex; flex-direction: column; padding: 1.2rem }
.method-head { display: flex; flex-direction: column; align-items: center; gap: .6rem; text-align: center }
/* todos los logos con la misma altura (cuadrados y horizontales) para que pesen igual */
.method-logo { margin: 0; height: 48px; width: 100%; display: flex; align-items: center; justify-content: center }
.method-logo img { height: 48px; width: auto; max-width: 100% }
.channel-tag {
  display: inline-block; padding: .12rem .5rem; border-radius: 999px;
  font-size: .72rem; font-weight: 700; color: var(--green-deep); background: var(--green-soft);
}
.method-text { margin: .8rem 0 0; font-size: .88rem; line-height: 1.5; color: var(--ink-dim) }
.method-number { margin: .6rem 0 0; font-size: .88rem; color: var(--ink-dim) }
.method-number strong { color: var(--ink); font-size: 1.05rem }
.method-ref { display: block; font-size: .8rem; color: var(--ink-mute) }
.method-video { margin-top: 1rem; max-width: none }
/* Efecty (sin video): fila completa y compacta */
.method.no-video { grid-column: 1 / -1; flex-direction: row; flex-wrap: wrap; align-items: center; gap: .6rem 1.5rem }
.method.no-video .method-head { flex-direction: row; align-items: center }
.method.no-video .method-number { margin: 0 }
.method.no-video .method-text { margin: 0; flex: 1 1 20rem }
.methods-note { margin: 1rem 0 0; font-size: .82rem; color: var(--ink-mute) }

.safety {
  display: flex; gap: 1rem; align-items: flex-start;
  padding: clamp(1.4rem, 3vw, 2rem); border-radius: var(--r-lg);
  background: var(--green-soft); border: 1px solid rgba(22,163,74,.25);
}
.safety-icon { flex: none; color: var(--green) }
.safety h2 { margin-bottom: .4rem }
.safety p { margin: 0; color: var(--ink-dim); line-height: 1.65 }

/* ---------- Oficina ---------- */
.office { display: flex; align-items: center; gap: 1.2rem; padding: 1.4rem 1.8rem }
.office-copy { flex: 1 }
.office h2 { margin: 0 0 .3rem; font-size: 1.1rem }
.office p { margin: 0; color: var(--ink-dim); font-size: .92rem }

@media (max-width: 860px) {
  .pay-grid { grid-template-columns: 1fr }
  .methods-grid { grid-template-columns: 1fr 1fr }
}
@media (max-width: 560px) {
  .methods-grid { grid-template-columns: 1fr }
  .method-video { max-width: 340px; margin-inline: auto }
  .office { flex-direction: column; align-items: flex-start }
}

/* ---------- Neumorfismo: solo tarjetas con video ---------- */
.method:not(.no-video) { background: var(--neu-bg); border: 0; box-shadow: var(--neu-raised) }
.method:not(.no-video):hover { box-shadow: var(--neu-raised-hover) }
.method:not(.no-video) .channel-tag { background: var(--neu-bg); box-shadow: var(--neu-small) }
.method:not(.no-video) .method-video :deep(.vv-frame) { border: 0; box-shadow: var(--neu-inset); padding: 6px; background: var(--neu-bg) }
.method:not(.no-video) .method-video :deep(video) { border-radius: calc(var(--r-lg) - 6px) }
</style>
