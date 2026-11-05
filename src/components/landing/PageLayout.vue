<template>
  <!-- Estructura común de todas las páginas: menú, contenido (slot), pie y animaciones de entrada (.reveal) -->
  <AppNav />
  <main>
    <slot />
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from './AppNav.vue';
import AppFooter from './AppFooter.vue';
import { useReveal } from '../../composables/useReveal.js';

useReveal();
</script>
