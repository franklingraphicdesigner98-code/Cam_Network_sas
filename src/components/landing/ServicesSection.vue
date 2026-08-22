<template>
  <section class="s services-section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Nuestros Servicios</span>
        <h2 class="display">Todo lo que necesitas, en un solo lugar</h2>
      </div>

      <div class="services-grid">
        <div v-for="(service, i) in servicios" :key="service.title" class="service-card card reveal" :class="`reveal-${i + 1}`">
          <span class="service-icon"><component :is="service.icon" :size="22" /></span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Wifi, Camera, Sun, Tv } from 'lucide-vue-next';

const servicios = [
  {
    title: 'Internet',
    icon: Wifi,
    description: 'Internet de alta velocidad para hogar y empresa, con instalación y soporte técnico especializado.'
  },
  {
    title: 'Cámaras de Seguridad',
    icon: Camera,
    description: 'Sistemas de videovigilancia para proteger tu hogar o negocio las 24 horas del día.'
  },
  {
    title: 'Sistema Solar',
    icon: Sun,
    description: 'Paneles solares para reducir tu consumo eléctrico y generar energía limpia y renovable.'
  },
  {
    title: 'Servicio de TV',
    icon: Tv,
    description: 'Televisión con la mejor variedad de canales para disfrutar en familia.'
  }
];
</script>

<style scoped>
.services-section .display { font-size: clamp(1.8rem, 3vw, 2.4rem) }

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.75rem;
}
.service-card { padding: 2.2rem 1.8rem }
.service-icon {
  display: grid; place-items: center;
  width: 52px; height: 52px; border-radius: 14px; color: #fff;
  background: linear-gradient(135deg, var(--green-2), var(--green-deep));
  margin-bottom: 1.2rem;
}
.service-card h3 { margin: 0 0 .6rem; font-size: 1.1rem; font-weight: 800; color: var(--ink) }
.service-card p { margin: 0; font-size: .9rem; color: var(--ink-dim); line-height: 1.65 }

@media (max-width: 980px) {
  .services-grid { grid-template-columns: repeat(2, 1fr) }
}
@media (max-width: 560px) {
  .services-grid { grid-template-columns: 1fr }
}
</style>
