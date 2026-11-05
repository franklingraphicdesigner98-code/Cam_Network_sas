<template>
  <PageLayout>
    <HeroSection />
    <div class="home-sections">
      <PlansSection />
      <!-- Seguridad eléctrica y líneas de atención, lado a lado en PC -->
      <div class="container duo">
        <ServicesSection />
        <ContactLines />
      </div>
      <QuickAccess />
      <WorksGallery />
      <CoverageBand />
      <ContactSection />
    </div>
  </PageLayout>
</template>

<script setup>
import PageLayout from '../components/landing/PageLayout.vue';
import HeroSection from '../components/landing/HeroSection.vue';
import ServicesSection from '../components/home/ServicesSection.vue';
import ContactLines from '../components/home/ContactLines.vue';
import WorksGallery from '../components/home/WorksGallery.vue';
import QuickAccess from '../components/home/QuickAccess.vue';
import PlansSection from '../components/home/PlansSection.vue';
import CoverageBand from '../components/home/CoverageBand.vue';
import ContactSection from '../components/home/ContactSection.vue';
</script>

<style scoped>
.home-sections { padding: .5rem 0 3rem }

.duo { display: grid; grid-template-columns: 1fr; gap: 1.25rem; padding-block: 1.25rem }
/* los dos bloques traen su propio contenedor: aquí se neutraliza para que quepan en la cuadrícula */
.duo :deep(> .block) { padding: 0 }
.duo :deep(> .block > .container) { max-width: none; padding: 0; height: 100% }
.duo :deep(.safety), .duo :deep(.lines) { height: 100% }
@media (min-width: 1001px) {
  .duo { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) }
}
</style>
