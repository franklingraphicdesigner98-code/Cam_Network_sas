<template>
  <section class="s services-section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Nuestros Servicios</span>
        <h2 class="display">Todo lo que necesitas, en un solo lugar</h2>
      </div>

      <div class="services-grid">
        <div v-for="(service, i) in servicios" :key="service.title" class="service-card reveal" :class="`reveal-${i + 1}`">
          <div class="card-photo">
            <img :src="service.image" :alt="service.title" loading="lazy" />
          </div>

          <div class="card-highlight">{{ service.highlight }}</div>

          <div class="card-body">
            <div class="card-row">
              <h3>{{ service.title }}</h3>
            </div>
            <div class="card-row card-row-bottom">
              <div class="card-tags">
                <span v-for="tag in service.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <router-link :to="service.to" class="card-cta">Conoce más <ArrowUpRight :size="14" /></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowUpRight } from 'lucide-vue-next';

const servicios = [
  {
    title: 'Internet',
    image: '/img/instalacion-fibra-optica.jpeg',
    highlight: 'Instalación incluida este mes',
    tags: ['Fibra Óptica', 'Wifi 6', 'Alta velocidad'],
    to: '/planes'
  },
  {
    title: 'Cámaras de Seguridad',
    image: '/img/instalacion-antena-02.jpeg',
    highlight: 'Monitoreo las 24 horas',
    tags: ['HD', 'Grabación en la nube', 'Acceso remoto'],
    to: '/contacto'
  },
  {
    title: 'Sistema Solar',
    image: '/img/instalacion-solar-aerea.jpeg',
    highlight: 'Ahorra en tu factura de luz',
    tags: ['Paneles Solares', 'Energía Limpia', 'Instalación'],
    to: '/contacto'
  },
  {
    title: 'Servicio de TV',
    image: '/img/torre-telecomunicaciones-01.jpeg',
    highlight: 'Más de 80 canales en vivo',
    tags: ['HD', 'Variedad de canales', 'Streaming'],
    to: '/contacto'
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

.service-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--r-xl);
  overflow: hidden;
  border: 2px solid var(--green-deep);
  background: #fff;
}

.card-photo {
  padding: 1.5rem 1.5rem .75rem;
  background: linear-gradient(160deg, #eef5e8, #dbe9d0);
}
.card-photo img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--r-md);
  display: block;
}

.card-highlight {
  background: var(--green-deep);
  color: rgba(255, 255, 255, .92);
  font-size: .76rem;
  font-weight: 600;
  text-align: center;
  padding: .55rem 1rem;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(135deg, var(--green-2), var(--green-deep));
  color: #fff;
  padding: 1.3rem 1.4rem 1.5rem;
}
.card-row { display: flex; align-items: flex-start; justify-content: center; gap: .6rem }
.card-row-bottom { flex-direction: column; align-items: stretch; gap: .7rem }

.card-body h3 { min-width: 0; margin: 0; font-size: 1.4rem; font-weight: 800; line-height: 1.2; text-align: center }

.card-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: .4rem; flex: 1; min-width: 0 }
.tag {
  font-size: .72rem; font-weight: 600; color: #fff;
  background: #0f5c2e;
  padding: .35rem .65rem; border-radius: 999px;
  white-space: nowrap;
}

.card-cta {
  display: inline-flex; align-items: center; gap: .3rem;
  align-self: center;
  font-size: .82rem; font-weight: 700; color: #fff;
  white-space: nowrap;
}
.card-cta:hover { text-decoration: underline }

@media (max-width: 980px) {
  .services-grid { grid-template-columns: repeat(2, 1fr) }
}
@media (max-width: 560px) {
  .services-grid { grid-template-columns: 1fr }
}
</style>
