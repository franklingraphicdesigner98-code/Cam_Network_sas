<template>
  <AppNav />
  <main>
    <header class="contacto-hero">
      <NetworkBackground :fixed="false" dot-color="#ffffff" line-color="#ffffff" />
      <div class="container contacto-hero-inner">
        <h1 class="display reveal">Contacto</h1>
        <p class="lead subtitle reveal reveal-1">Cotiza tu servicio de internet, cámaras de seguridad o energía solar.</p>
      </div>
    </header>

    <section class="s">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-card card reveal">
            <h2>Teléfono</h2>
            <a href="tel:+573112280533">311 228 0533</a>
            <a href="tel:+573104697936">310 469 7936</a>
          </div>
          <div class="contact-card card reveal reveal-1">
            <h2>Correo</h2>
            <a href="mailto:comercial@camnetworksoluciones.com">comercial@camnetworksoluciones.com</a>
          </div>
          <div class="contact-card card reveal reveal-2">
            <h2>Ubicación</h2>
            <p>San Gil, Santander, Colombia</p>
            <a href="https://maps.app.goo.gl/57C54zkmF7vUMev89" target="_blank" rel="noopener noreferrer">Ver en Google Maps ↗</a>
          </div>
        </div>

        <div class="map-frame reveal reveal-3">
          <iframe
            src="https://www.google.com/maps?q=6.554340,-73.132252&z=15&output=embed"
            width="100%"
            height="100%"
            style="border:0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Ubicación de Cam Network Soluciones en el mapa"
          ></iframe>
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import NetworkBackground from '../components/ui/NetworkBackground.vue';
import { useReveal } from '../composables/useReveal.js';

useReveal();
</script>

<style scoped>
.contacto-hero {
  position: relative;
  overflow: hidden;
  padding: 9.5rem 0 5rem;
  background: linear-gradient(135deg, #00620f 0%, #003e0c 100%);
  color: #fff;
  text-align: center;
}
.contacto-hero-inner { position: relative; z-index: 1 }
.contacto-hero .display { color: #fff; font-size: clamp(2.1rem, 4vw, 3rem) }
.contacto-hero .subtitle { color: rgba(255,255,255,.88); margin: 1rem auto 0 }

@media (max-width: 720px) { .contacto-hero { padding: 7.5rem 0 3.5rem } }

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-bottom: 2.5rem;
}
.contact-card {
  padding: 2rem 1.8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .3rem;
}
.contact-card h2 { margin: 0 0 .6rem; font-size: 1.5rem; font-weight: 800; color: var(--ink) }
.contact-card a { color: var(--ink-dim); font-size: .92rem; transition: color .2s ease }
.contact-card a:hover { color: var(--green-deep) }
.contact-card p { margin: 0; color: var(--ink-dim); font-size: .92rem }

.map-frame {
  width: 100%;
  height: 420px;
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

@media (max-width: 860px) {
  .contact-grid { grid-template-columns: 1fr }
  .map-frame { height: 320px }
}
</style>
