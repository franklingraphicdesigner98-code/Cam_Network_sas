<template>
  <AppNav />
  <main>
    <PageHero title="Planes" subtitle="Planes de internet hogar y empresarial." />
    <ServicesSection />
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import ServicesSection from '../components/landing/ServicesSection.vue';
import { useReveal } from '../composables/useReveal.js';

useReveal();
</script>
