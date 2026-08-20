<template>
  <AppNav />
  <main>
    <header class="coverage-hero">
      <NetworkBackground :fixed="false" dot-color="#ffffff" line-color="#ffffff" />
      <div class="container coverage-inner">
        <div class="coverage-copy">
          <span class="eyebrow eyebrow-on-dark reveal">Cobertura</span>
          <h1 class="display reveal reveal-1">Estamos más cerca de ti</h1>
          <p class="lead subtitle reveal reveal-2">
            Llevamos conectividad, seguridad, energía y soluciones tecnológicas a estos 10 municipios de la región.
          </p>
          <div class="info-card reveal reveal-3">
            <span class="info-icon"><Users :size="20" /></span>
            <p>Conectamos hogares, negocios y comunidades con tecnología de calidad.</p>
          </div>
        </div>

        <div class="coverage-media reveal reveal-4">
          <CoverageDiagram />
        </div>
      </div>
    </header>

    <section class="features">
      <div class="container features-grid">
        <div class="feature">
          <span class="feature-icon"><Wifi :size="20" /></span>
          <div>
            <p class="feature-title">Conectividad</p>
            <p class="feature-text">Internet rápido y confiable.</p>
          </div>
        </div>
        <div class="feature">
          <span class="feature-icon"><ShieldCheck :size="20" /></span>
          <div>
            <p class="feature-title">Seguridad</p>
            <p class="feature-text">Protegemos lo que más te importa.</p>
          </div>
        </div>
        <div class="feature">
          <span class="feature-icon"><Sun :size="20" /></span>
          <div>
            <p class="feature-title">Energía</p>
            <p class="feature-text">Soluciones solares para tu hogar o negocio.</p>
          </div>
        </div>
        <div class="feature">
          <span class="feature-icon"><Headphones :size="20" /></span>
          <div>
            <p class="feature-title">Soporte</p>
            <p class="feature-text">Atención cercana y oportuna.</p>
          </div>
        </div>
        <div class="feature">
          <span class="feature-icon"><Cpu :size="20" /></span>
          <div>
            <p class="feature-title">Tecnología</p>
            <p class="feature-text">Innovación y soluciones para todos.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="s">
      <div class="container towns-cta reveal">
        <p class="lead">¿No ves tu municipio en la lista?</p>
        <BaseButton :to="{ name: 'contacto' }" variant="primary">Consúltanos</BaseButton>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { Users, Wifi, ShieldCheck, Sun, Headphones, Cpu } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import NetworkBackground from '../components/ui/NetworkBackground.vue';
import CoverageDiagram from '../components/cobertura/CoverageDiagram.vue';
import { useReveal } from '../composables/useReveal.js';

useReveal();
</script>

<style scoped>
.coverage-hero {
  position: relative;
  overflow: hidden;
  padding: 9rem 0 5rem;
  background: linear-gradient(135deg, #00620f 0%, #003e0c 100%);
  color: #fff;
}
.coverage-inner {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
}
.coverage-copy { text-align: left }
.coverage-hero .display { color: #fff; font-size: clamp(2.2rem, 4vw, 3.1rem); margin-top: 1.2rem }
.eyebrow-on-dark { color: #fff; background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.25) }
.eyebrow-on-dark::before { background: #fff; box-shadow: none }
.subtitle { color: rgba(255,255,255,.88); margin: 1.1rem 0 0; max-width: 46ch }

.info-card {
  display: flex; align-items: center; gap: .9rem;
  margin-top: 2rem; padding: 1rem 1.2rem; max-width: 420px;
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);
  border-radius: var(--r-md);
}
.info-card p { margin: 0; font-size: .88rem; color: rgba(255,255,255,.92); line-height: 1.5 }
.info-icon {
  display: grid; place-items: center; flex: none;
  width: 42px; height: 42px; border-radius: 10px; color: #fff;
  background: linear-gradient(135deg, var(--green-2), var(--green-deep));
}

.features { padding: 3.5rem 0; background: #003e0c; color: #fff }
.features-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem;
}
.feature { display: flex; align-items: flex-start; gap: .7rem }
.feature-icon {
  display: grid; place-items: center; flex: none;
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(255,255,255,.12); color: #fff;
}
.feature-title { margin: 0 0 .2rem; font-weight: 700; font-size: .92rem }
.feature-text { margin: 0; font-size: .8rem; color: rgba(255,255,255,.75); line-height: 1.4 }

.towns-cta {
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
  text-align: center;
}
.towns-cta .lead { margin: 0 }

@media (max-width: 900px) {
  .coverage-inner { grid-template-columns: 1fr; text-align: center }
  .coverage-copy { text-align: center }
  .info-card { margin-left: auto; margin-right: auto }
  .subtitle { margin-left: auto; margin-right: auto }
  .coverage-media { order: -1 }
}
@media (max-width: 720px) { .coverage-hero { padding: 7.5rem 0 3.5rem } }
@media (max-width: 780px) {
  .features-grid { grid-template-columns: repeat(2, 1fr) }
}
@media (max-width: 420px) {
  .features-grid { grid-template-columns: 1fr }
}
</style>
