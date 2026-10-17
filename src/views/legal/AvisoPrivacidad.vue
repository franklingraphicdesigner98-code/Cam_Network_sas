<template>
  <AppNav />
  <main>
    <PageHero :eyebrow="t('pages.legalEyebrow')" :title="t('legal.aviso.title')" />
    <section class="s">
      <div class="container legal-doc reveal">
        <!-- TODO: contenido genérico de placeholder — reemplazar por el texto legal definitivo revisado por Cam Network Soluciones S.A.S. (en src/locales/es.js y en.js) -->
        <p class="updated">{{ t('legal.updated') }}</p>

        <template v-for="(section, i) in tm('legal.aviso.sections')" :key="i">
          <h2>{{ rt(section.title) }}</h2>
          <p>{{ rt(section.body) }}</p>
        </template>

        <h2>{{ t('legal.aviso.policyTitle') }}</h2>
        <i18n-t keypath="legal.aviso.policyBody" tag="p">
          <template #link>
            <router-link to="/legal/politica-tratamiento-datos">{{ t('legal.aviso.policyLink') }}</router-link>
          </template>
        </i18n-t>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import { useReveal } from '../../composables/useReveal.js';

const { t, tm, rt } = useI18n();
useReveal();
</script>

<style scoped>
.legal-doc { max-width: 760px }
.legal-doc .updated { color: var(--ink-mute); font-size: .85rem; margin-bottom: 2rem }
.legal-doc h2 { font-size: 1.15rem; font-weight: 700; color: var(--ink); margin: 2rem 0 .75rem }
.legal-doc p { color: var(--ink-dim); line-height: 1.75 }
.legal-doc :deep(a) { color: var(--green-deep); text-decoration: underline }
</style>
