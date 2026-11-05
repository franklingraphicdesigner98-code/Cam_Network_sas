<template>
  <PageLayout>
    <PageHero :eyebrow="t('pages.legalEyebrow')" :title="t('legal.terminos.title')" />
    <section class="s">
      <div class="container legal-doc reveal">
        <!-- TODO: contenido genérico de placeholder — reemplazar por el texto legal definitivo revisado por Cam Network Soluciones S.A.S. (en src/locales/es.js y en.js) -->
        <p class="updated">{{ t('legal.updated') }}</p>

        <template v-for="(section, i) in tm('legal.terminos.sections')" :key="i">
          <h2>{{ rt(section.title) }}</h2>
          <p>{{ rt(section.body) }}</p>
        </template>
      </div>
    </section>
  </PageLayout>
</template>

<script setup>
import PageLayout from '../../components/landing/PageLayout.vue';
import { useI18n } from 'vue-i18n';
import PageHero from '../../components/ui/PageHero.vue';

const { t, tm, rt } = useI18n();
</script>

<style scoped>
.legal-doc { max-width: 760px }
.legal-doc .updated { color: var(--ink-mute); font-size: .85rem; margin-bottom: 2rem }
.legal-doc h2 { font-size: 1.15rem; font-weight: 700; color: var(--ink); margin: 2rem 0 .75rem }
.legal-doc p { color: var(--ink-dim); line-height: 1.75 }
</style>
