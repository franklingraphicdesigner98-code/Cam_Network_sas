<template>
  <AppNav />
  <main>
    <PageHero :eyebrow="t('pages.usuariosEyebrow')" :title="t('pages.pqrs.title')" :subtitle="t('pages.pqrs.subtitle')" />
    <div class="pqrs-wrap"><ContactSection pqrs /></div>
  </main>
  <AppFooter />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import ContactSection from '../../components/home/ContactSection.vue';
import { useReveal } from '../../composables/useReveal.js';

const { t } = useI18n();
useReveal();
</script>

<style scoped>
.pqrs-wrap { padding: 1.5rem 0 4rem }
</style>
