<template>
  <AppNav />
  <main>
    <PageHero eyebrow="Usuarios" title="Opiniones de Usuarios" subtitle="Lo que dicen nuestros clientes sobre nuestros servicios." />
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
