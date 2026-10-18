<template>
  <AppNav />
  <main>
    <HeroSection />
    <div class="home-sections">
      <ServicesSection />
      <StatsBand />
      <QuickAccess />
      <PlansSection />
      <CoverageBand />
      <ContactSection />
    </div>
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import HeroSection from '../components/landing/HeroSection.vue';
import ServicesSection from '../components/home/ServicesSection.vue';
import StatsBand from '../components/home/StatsBand.vue';
import QuickAccess from '../components/home/QuickAccess.vue';
import PlansSection from '../components/home/PlansSection.vue';
import CoverageBand from '../components/home/CoverageBand.vue';
import ContactSection from '../components/home/ContactSection.vue';
import { useReveal } from '../composables/useReveal.js';

useReveal();
</script>

<style scoped>
.home-sections { padding: .5rem 0 3rem }
</style>
