<template>
  <AppNav />
  <main>
    <HeroSection />
    <div class="home-sections">
      <PlansSection />
      <!-- Seguridad eléctrica y cifras de clientes, lado a lado en PC -->
      <div class="container duo">
        <ServicesSection />
        <StatsBand />
      </div>
      <QuickAccess />
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

.duo { display: grid; grid-template-columns: 1fr; gap: 1.25rem; padding-block: 1.25rem }
/* los dos bloques traen su propio contenedor: aquí se neutraliza para que quepan en la cuadrícula */
.duo :deep(> .block) { padding: 0 }
.duo :deep(> .block > .container) { max-width: none; padding: 0; height: 100% }
.duo :deep(.safety), .duo :deep(.stats) { height: 100% }
.duo :deep(.stats-grid) { grid-template-columns: 1fr }
@media (min-width: 1001px) {
  .duo { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) }
}
</style>
