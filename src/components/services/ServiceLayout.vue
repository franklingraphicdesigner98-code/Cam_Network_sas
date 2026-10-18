<template>
  <AppNav />
  <main>
    <!-- Encabezado corto del servicio -->
    <header class="svc-hero">
      <div class="grid-bg" aria-hidden="true" />
      <div class="container svc-hero-inner" :class="{ 'has-image': image }">
        <div class="svc-hero-copy">
          <router-link :to="{ name: 'home' }" class="eyebrow reveal">{{ t('servicios.eyebrow') }}</router-link>
          <div class="svc-title reveal reveal-1">
            <IconTile :icon="icon" :size="64" />
            <h1 class="display">{{ title }}</h1>
          </div>
          <p class="lead reveal reveal-2">{{ subtitle }}</p>
          <p v-if="stat" class="svc-stat reveal reveal-3"><Users :size="18" /> {{ stat }}</p>
        </div>
        <figure v-if="image" class="svc-hero-photo reveal reveal-3" :class="{ contain: imageFit === 'contain' }">
          <img :src="image" :alt="imageAlt" fetchpriority="high" />
        </figure>
      </div>
    </header>

    <!-- Contenido propio de cada servicio -->
    <slot />

    <!-- Cierre con llamado a la acción -->
    <section class="svc-block svc-last">
      <div class="container">
        <div class="svc-cta reveal">
          <div>
            <h2>{{ ctaTitle || t('servicios.cta.title') }}</h2>
            <p>{{ ctaText || t('servicios.cta.text') }}</p>
          </div>
          <div class="svc-cta-actions">
            <BaseButton :to="{ name: 'contacto', query: { servicio: serviceKey } }" variant="primary">
              {{ t('servicios.cta.contact') }} <ArrowRight :size="18" />
            </BaseButton>
            <a :href="waLink" target="_blank" rel="noopener noreferrer" class="btn btn-glass">
              {{ t('servicios.cta.whatsapp') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
// Layout base de las páginas de servicio (Internet, Energía solar, Cámaras):
// encabezado corto + contenido (slot) + cierre con "Solicitar información" / WhatsApp.
// Las secciones internas usan las clases globales .svc-block, .svc-heading y .svc-sub (src/style.css).
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowRight, Users } from 'lucide-vue-next';
import AppNav from '../landing/AppNav.vue';
import AppFooter from '../landing/AppFooter.vue';
import IconTile from '../ui/IconTile.vue';
import BaseButton from '../ui/BaseButton.vue';
import { whatsappLink } from '../../data/contacto.js';
import { useReveal } from '../../composables/useReveal.js';

const props = defineProps({
  serviceKey: { type: String, required: true },   // internet | solar | camaras (preselecciona el formulario)
  icon: { type: [Object, Function], required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  stat: { type: String, default: '' },          // cifra destacada, ej. '+2.000 clientes'
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  imageFit: { type: String, default: 'cover' },   // 'contain' para fotos verticales (se ve completa sobre fondo oscuro)
  ctaTitle: { type: String, default: '' },
  ctaText: { type: String, default: '' }
});

const { t } = useI18n();
const waLink = computed(() =>
  whatsappLink('asesorias', t('servicios.waMsg', { servicio: props.title }))
);

useReveal();
</script>

<style scoped>
.svc-hero {
  position: relative; overflow: hidden;
  padding: calc(var(--nav-h) + 3rem) 0 2.5rem;
  background:
    radial-gradient(55% 90% at 75% 0%, rgba(74,222,128,.22) 0%, rgba(74,222,128,0) 70%),
    linear-gradient(180deg, #ffffff 0%, var(--bg-1) 100%);
}
.grid-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(22,163,74,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22,163,74,.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(60% 90% at 60% 10%, #000 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(60% 90% at 60% 10%, #000 0%, transparent 75%);
}
.svc-hero-inner { position: relative; display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center }
.svc-hero-inner.has-image { grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr) }
.svc-title { display: flex; align-items: center; gap: 1rem; margin-top: 1.1rem }
.svc-hero .display { font-size: clamp(2rem, 4vw, 3rem) }
.svc-hero .lead { margin: 1rem 0 0; max-width: 46ch }
.svc-stat {
  display: inline-flex; align-items: center; gap: .5rem; margin: 1.2rem 0 0;
  padding: .55rem 1rem; border-radius: 999px;
  font-weight: 700; color: var(--green-deep); background: #fff;
  border: 1px solid rgba(22,163,74,.25); box-shadow: var(--shadow);
}
.svc-hero-photo {
  margin: 0; aspect-ratio: 16 / 10; border-radius: var(--r-xl); overflow: hidden;
  border: 6px solid #fff; box-shadow: var(--shadow-lg); background: var(--bg-2);
}
.svc-hero-photo img { width: 100%; height: 100%; object-fit: cover }
.svc-hero-photo.contain { background: linear-gradient(160deg, #0f3d22 0%, #0a2a17 100%) }
.svc-hero-photo.contain img { object-fit: contain }

.svc-last { padding-bottom: 4rem }

.svc-cta {
  display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;
  padding: clamp(1.6rem, 4vw, 2.6rem);
  border-radius: var(--r-lg); color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, rgba(34,197,94,.3) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.svc-cta h2 { margin: 0 0 .5rem; font-size: clamp(1.4rem, 2.6vw, 1.9rem); font-weight: 800; letter-spacing: -.02em }
.svc-cta p { margin: 0; max-width: 52ch; color: rgba(255,255,255,.85); line-height: 1.6 }
.svc-cta-actions { display: flex; flex-wrap: wrap; gap: .7rem }

@media (max-width: 900px) {
  .svc-hero-inner.has-image { grid-template-columns: 1fr }
}
@media (max-width: 480px) {
  .svc-title { gap: .8rem }
  .svc-cta-actions { width: 100% }
  .svc-cta-actions > * { flex: 1; justify-content: center }
}
</style>
