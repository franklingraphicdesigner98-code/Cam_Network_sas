<template>
  <AppNav />
  <main>
    <PageHero :title="t('pages.planes.title')" :subtitle="t('pages.planes.subtitle')" />
    <ComingSoon />
  </main>
  <AppFooter />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import ComingSoon from '../components/ui/ComingSoon.vue';
import { useReveal } from '../composables/useReveal.js';

const { t } = useI18n();
useReveal();
</script>
