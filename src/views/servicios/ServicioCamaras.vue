<template>
  <ServiceLayout
    service-key="camaras" :icon="Cctv"
    :title="t('servicios.camaras.title')" :subtitle="t('servicios.camaras.subtitle')" :stat="t('servicios.camaras.stat')"
    image="/img/servicios/camara-ptz.webp" image-fit="contain" :image-alt="t('servicios.camaras.imageAlt')"
    :cta-title="t('servicios.camaras.closing')"
  >
    <!-- Mensaje principal -->
    <section class="svc-block">
      <div class="container">
        <div class="headline reveal">
          <Eye :size="40" class="headline-icon" />
          <div>
            <h2>{{ t('servicios.camaras.headline') }}</h2>
            <p>{{ t('servicios.camaras.headlineText') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Hogar / empresa / taller -->
    <section class="svc-block">
      <div class="container">
        <h2 class="svc-heading reveal">{{ t('servicios.camaras.placesTitle') }}</h2>
        <div class="places">
          <article v-for="(place, i) in places" :key="place.key" class="place card reveal" :class="`reveal-${i + 1}`">
            <IconTile :icon="place.icon" :size="56" />
            <h3>{{ t(`servicios.camaras.places.${place.key}.title`) }}</h3>
            <p>{{ t(`servicios.camaras.places.${place.key}.text`) }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Características -->
    <section class="svc-block">
      <div class="container">
        <h2 class="svc-heading reveal">{{ t('servicios.camaras.featuresTitle') }}</h2>
        <div class="features">
          <div v-for="(f, i) in tm('servicios.camaras.features')" :key="i" class="feature reveal" :class="`reveal-${(i % 4) + 1}`">
            <span class="feature-icon"><component :is="featureIcons[i]" :size="22" /></span>
            <div>
              <h3>{{ rt(f.title) }}</h3>
              <p>{{ rt(f.text) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cámaras disponibles (datos en src/data/camaras.js) -->
    <section class="svc-block">
      <div class="container">
        <h2 class="svc-heading reveal">{{ t('servicios.camaras.productsTitle') }}</h2>
        <p class="svc-sub reveal">{{ t('servicios.camaras.productsSub') }}</p>
        <div class="products">
          <article v-for="(cam, i) in camaras" :key="cam.key" class="product card reveal" :class="`reveal-${(i % 3) + 1}`">
            <div class="product-media">
              <img v-if="cam.image" :src="cam.image" :alt="t(`servicios.camaras.products.${cam.key}.name`)" loading="lazy" />
              <IconTile v-else :icon="Cctv" :size="76" tone="soft" />
            </div>
            <div class="product-body">
              <h3>{{ t(`servicios.camaras.products.${cam.key}.name`) }}</h3>
              <p>{{ t(`servicios.camaras.products.${cam.key}.text`) }}</p>
              <a :href="productLink(cam)" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                {{ t('servicios.camaras.productCta') }}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </ServiceLayout>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Cctv, Eye, House, Building2, Wrench, Smartphone, Moon, BellRing, Video } from 'lucide-vue-next';
import ServiceLayout from '../../components/services/ServiceLayout.vue';
import IconTile from '../../components/ui/IconTile.vue';
import { camaras } from '../../data/camaras.js';
import { whatsappLink } from '../../data/contacto.js';

const { t, tm, rt } = useI18n();

const places = [
  { key: 'hogar', icon: House },
  { key: 'empresa', icon: Building2 },
  { key: 'taller', icon: Wrench }
];
// Mismo orden que servicios.camaras.features en src/locales/*.js
const featureIcons = [Smartphone, Moon, BellRing, Video];

const productLink = (cam) => {
  const msg = t('servicios.camaras.productMsg', { producto: t(`servicios.camaras.products.${cam.key}.name`) });
  return whatsappLink('asesorias', msg);
};
</script>

<style scoped>
.headline {
  display: flex; gap: 1.2rem; align-items: flex-start;
  padding: clamp(1.6rem, 4vw, 2.4rem); border-radius: var(--r-lg);
  background: var(--green-soft); border: 1px solid rgba(22,163,74,.25);
}
.headline-icon { flex: none; color: var(--green) }
.headline h2 { margin: 0 0 .5rem; font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; letter-spacing: -.02em; color: var(--ink) }
.headline p { margin: 0; font-size: 1.05rem; line-height: 1.7; color: var(--ink-dim); max-width: 64ch }

.places { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; margin-top: 1.2rem }
.place { padding: 1.6rem }
.place h3 { margin: 1rem 0 .4rem; font-size: 1.2rem; font-weight: 800; color: var(--ink) }
.place p { margin: 0; font-size: .95rem; line-height: 1.6; color: var(--ink-dim) }

.features { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-top: 1.2rem }
.feature { display: flex; gap: .8rem; align-items: flex-start; padding: 1.2rem; border-radius: var(--r-md); background: #fff; border: 1px solid var(--border) }
.feature-icon {
  flex: none; display: grid; place-items: center; width: 42px; height: 42px; border-radius: 12px; color: #fff;
  background: linear-gradient(150deg, #4ade80 0%, #16a34a 50%, #0f6b32 100%);
}
.feature h3 { margin: 0 0 .2rem; font-size: .98rem; font-weight: 800; color: var(--ink) }
.feature p { margin: 0; font-size: .86rem; color: var(--ink-dim); line-height: 1.45 }

.products { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem }
.product { display: flex; flex-direction: column; overflow: hidden }
.product-media {
  position: relative; aspect-ratio: 1 / 1; display: grid; place-items: center;
  background: linear-gradient(160deg, #0f3d22 0%, #0a2a17 100%);
}
.product-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 40% 50% }
.product-body { display: flex; flex-direction: column; align-items: flex-start; flex: 1; padding: 1.4rem }
.product h3 { margin: 0 0 .4rem; font-size: 1.15rem; font-weight: 800; color: var(--ink) }
.product p { margin: 0 0 1.2rem; font-size: .92rem; line-height: 1.55; color: var(--ink-dim) }
.product .btn { margin-top: auto }

@media (max-width: 1000px) {
  .features { grid-template-columns: 1fr 1fr }
}
@media (max-width: 860px) {
  .places, .products { grid-template-columns: 1fr }
  .product { flex-direction: row }
  .product-media { width: 40%; flex: none; aspect-ratio: auto }
}
@media (max-width: 520px) {
  .features { grid-template-columns: 1fr }
  .product { flex-direction: column }
  .product-media { width: 100%; aspect-ratio: 16 / 10 }
  .headline { flex-direction: column }
}
</style>
