<template>
  <AppNav />
  <main>
    <header class="help-hero">
      <NetworkBackground :fixed="false" dot-color="#ffffff" line-color="#ffffff" />
      <div class="container help-hero-inner">
        <span class="eyebrow eyebrow-on-dark reveal">Centro de Ayuda</span>
        <h1 class="display reveal reveal-1">PQRS</h1>
        <p class="lead subtitle reveal reveal-2">Radica tus peticiones, quejas, reclamos y sugerencias.</p>
      </div>
    </header>
    <ComingSoon />
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import NetworkBackground from '../../components/ui/NetworkBackground.vue';
import ComingSoon from '../../components/ui/ComingSoon.vue';
import { useReveal } from '../../composables/useReveal.js';

useReveal();
</script>

<style scoped>
.help-hero {
  position: relative;
  overflow: hidden;
  padding: 9.5rem 0 5rem;
  background: linear-gradient(135deg, #00620f 0%, #003e0c 100%);
  color: #fff;
  text-align: center;
}
.help-hero-inner { position: relative; z-index: 1 }
.help-hero .display { color: #fff; font-size: clamp(2.1rem, 4vw, 3rem); margin-top: 1.2rem }
.help-hero .eyebrow-on-dark { color: #fff; background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.25) }
.help-hero .eyebrow-on-dark::before { background: #fff; box-shadow: none }
.help-hero .subtitle { color: rgba(255,255,255,.88); margin: 1rem auto 0 }

@media (max-width: 720px) { .help-hero { padding: 7.5rem 0 3.5rem } }
</style>
