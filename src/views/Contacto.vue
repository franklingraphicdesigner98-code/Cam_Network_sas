<template>
  <AppNav />
  <main>
    <PageHero title="Contacto" subtitle="Cotiza tu servicio de internet, cámaras de seguridad o energía solar." />
    <!-- TODO: el formulario de contacto se construye en el siguiente paso (sección 6 del Home) -->
    <ComingSoon />
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import ComingSoon from '../components/ui/ComingSoon.vue';
import { useReveal } from '../composables/useReveal.js';

useReveal();
</script>
