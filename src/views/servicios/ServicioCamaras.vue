<template>
  <ServiceLayout
    service-key="camaras" :icon="Cctv"
    :title="t('servicios.camaras.title')" :stat="t('servicios.camaras.stat')"
    :cta-title="t('servicios.camaras.closing')"
  >
    <!-- A la derecha del texto: cámara que barre de lado a lado (fotos en public/img/Rotacion/;
         hay una versión 3D con Camara.glb en CameraSweep3D.vue, sin usar por ahora) -->
    <template #visual>
      <CameraSweep :label="t('servicios.camaras.sweepAlt')" />
    </template>

    <!-- Subtítulo con hogar / empresa / fábrica resaltados -->
    <template #subtitle>
      <i18n-t keypath="servicios.camaras.subtitle" tag="span">
        <template v-for="w in ['hogar', 'empresa', 'fabrica']" :key="w" #[w]>
          <strong class="hl">{{ t(`servicios.camaras.subWords.${w}`) }}</strong>
        </template>
      </i18n-t>
    </template>

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
              <img :src="cam.image" :alt="t(`servicios.camaras.products.${cam.key}.name`)" loading="lazy" width="720" height="880" />
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
import { Cctv, Smartphone, Moon, BellRing, Video } from 'lucide-vue-next';
import ServiceLayout from '../../components/services/ServiceLayout.vue';
import CameraSweep from '../../components/ui/CameraSweep.vue';
import { camaras } from '../../data/camaras.js';
import { whatsappLink } from '../../data/contacto.js';

const { t, tm, rt } = useI18n();

// Mismo orden que servicios.camaras.features en src/locales/*.js
const featureIcons = [Smartphone, Moon, BellRing, Video];

const productLink = (cam) => {
  const msg = t('servicios.camaras.productMsg', { producto: t(`servicios.camaras.products.${cam.key}.name`) });
  return whatsappLink('asesorias', msg);
};
</script>

<style scoped>
/* palabras resaltadas del subtítulo (efecto marcador) */
.hl {
  color: var(--green-deep); font-weight: 800; font-size: 1.12em;
  background: linear-gradient(transparent 58%, rgba(74,222,128,.45) 58%);
  padding: 0 .12em; border-radius: 3px;
}

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
.product-media { aspect-ratio: 9 / 11; background: var(--bg-2) }
.product-media img { width: 100%; height: 100%; object-fit: cover }
.product-body { display: flex; flex-direction: column; align-items: flex-start; flex: 1; padding: 1.4rem }
.product h3 { margin: 0 0 .4rem; font-size: 1.15rem; font-weight: 800; color: var(--ink) }
.product p { margin: 0 0 1.2rem; font-size: .92rem; line-height: 1.55; color: var(--ink-dim) }
.product .btn { margin-top: auto }

@media (max-width: 1000px) {
  .features { grid-template-columns: 1fr 1fr }
}
@media (max-width: 860px) {
  .products { grid-template-columns: 1fr 1fr }
}
@media (max-width: 520px) {
  .features { grid-template-columns: 1fr }
  .products { grid-template-columns: 1fr }
}

/* neumorfismo luminoso (tokens --neu-lite-* en src/assets/tokens.css) */
.product { background: var(--neu-lite-bg); border: 0; box-shadow: var(--neu-lite-raised) }
.product:hover { box-shadow: var(--neu-lite-hover) }
</style>
