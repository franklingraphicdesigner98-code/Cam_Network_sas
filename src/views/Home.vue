<template>
  <AppNav />
  <main>
    <!-- 1. Hero -->
    <HeroSection />

    <!-- 2. Servicios -->
    <ServicesSection />

    <!--
      Próximos pasos (uno por uno, como acordamos):
      3. Accesos rápidos — Test de Velocidad, Pago en Línea (Wompi), Radicar PQRS
      4. Planes — internet hogar y empresarial
      5. Cobertura — mapa / imagen de zona de cobertura
      6. Formulario de Contacto
    -->
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import HeroSection from '../components/landing/HeroSection.vue';
import ServicesSection from '../components/landing/ServicesSection.vue';
import { useReveal } from '../composables/useReveal.js';

useReveal();
</script>
