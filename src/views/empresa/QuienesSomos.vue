<template>
  <AppNav />
  <main>
    <PageHero eyebrow="Empresa" title="Quiénes Somos" subtitle="La historia, la misión y los valores de Cam Network Soluciones S.A.S." />
    <ComingSoon />
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import ComingSoon from '../../components/ui/ComingSoon.vue';
import { useReveal } from '../../composables/useReveal.js';

useReveal();
</script>
