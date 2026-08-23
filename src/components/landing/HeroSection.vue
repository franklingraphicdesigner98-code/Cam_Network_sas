<template>
  <header class="hero">
    <NetworkBackground :fixed="false" dot-color="#ffffff" line-color="#ffffff" />
    <div class="container hero-inner">
      <div class="hero-media reveal">
        <ImageCarousel :images="images" />
      </div>

      <div class="hero-copy">
        <h1 class="display reveal">
          Conectividad y seguridad para tu hogar y tu empresa
        </h1>
        <p class="lead subtitle reveal reveal-1">
          En Cam Network Soluciones integramos internet de alta velocidad, cámaras de seguridad y sistemas de energía solar,
          con instalación y soporte técnico especializado en toda nuestra zona de cobertura.
        </p>
        <div class="hero-actions reveal reveal-2">
          <BaseButton :to="{ name: 'planes' }" variant="primary">Conoce nuestros planes</BaseButton>
          <BaseButton href="https://api.whatsapp.com/send/?phone=%2B573104697936&text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios" variant="outline" class="on-dark">Contáctanos</BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import BaseButton from '../ui/BaseButton.vue';
import ImageCarousel from '../ui/ImageCarousel.vue';
import NetworkBackground from '../ui/NetworkBackground.vue';

const images = [
  { src: '/img/instalacion-antena-01.jpeg', alt: 'Técnico de Cam Network instalando una antena de internet en una construcción' },
  { src: '/img/instalacion-fibra-optica.jpeg', alt: 'Equipo técnico instalando fibra óptica en zona rural' },
  { src: '/img/torre-telecomunicaciones-01.jpeg', alt: 'Torre de telecomunicaciones de Cam Network en zona montañosa' },
  { src: '/img/instalacion-solar-aerea.jpeg', alt: 'Vista aérea de instalación de paneles de energía solar' },
  { src: '/img/instalacion-antena-02.jpeg', alt: 'Técnico instalando antena de internet junto a vehículo de Cam Network' },
  { src: '/img/torre-telecomunicaciones-02.jpeg', alt: 'Torre de telecomunicaciones de Cam Network' },
  { src: '/img/cobertura-zona-rural.jpeg', alt: 'Vehículo de Cam Network llevando cobertura a zonas rurales' }
];
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 10.5rem 0 5rem;
  background: linear-gradient(135deg, #00620f 0%, #003e0c 100%);
  color: #fff;
}
.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
}
.hero-copy { text-align: left }
.hero .display { color: #fff; font-size: clamp(2.1rem, 3.6vw, 3.1rem); margin-top: 1.3rem }
.eyebrow-on-dark {
  color: #fff; background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.25);
}
.eyebrow-on-dark::before { background: #fff; box-shadow: none }
.subtitle { color: rgba(255,255,255,.88); margin: 1.3rem 0 0; max-width: 52ch }

.hero-actions { display: flex; gap: 1rem; margin-top: 1.8rem; flex-wrap: wrap; justify-content: flex-start }
.hero-actions :deep(.on-dark) { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.4); color: #fff }
.hero-actions :deep(.on-dark:hover) { background: rgba(255,255,255,.18); border-color: #fff; color: #fff }

@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; text-align: center }
  .hero-copy { text-align: center }
  .hero-actions { justify-content: center }
  .subtitle { margin-left: auto; margin-right: auto }
}
@media (max-width: 720px) { .hero { padding: 8.5rem 0 3.5rem } }
</style>
