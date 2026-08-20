<template>
  <AppNav />
  <main>
    <!-- 1. Hero -->
    <HeroSection />

    <!--
      Próximos pasos (uno por uno, como acordamos):
      2. Servicios — Internet, Cámaras de Seguridad, Sistema Solar, Instalación y Mantenimiento
      3. Accesos rápidos — Test de Velocidad, Pago en Línea (Wompi), Radicar PQRS
      4. Planes — internet hogar y empresarial
      5. Cobertura — mapa / imagen de zona de cobertura
      6. Formulario de Contacto
    -->
    <ComingSoon />
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import HeroSection from '../components/landing/HeroSection.vue';
import ComingSoon from '../components/ui/ComingSoon.vue';
import { useReveal } from '../composables/useReveal.js';

useReveal();
</script>
