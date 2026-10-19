<template>
  <ServiceLayout
    service-key="solar" :icon="SolarPanel"
    :title="t('servicios.solar.title')" :subtitle="t('servicios.solar.subtitle')"
    image="/img/hero/instalacion-solar-960.webp" :image-alt="t('servicios.solar.imageAlt')"
  >
    <!-- Importancia: texto + imagen -->
    <section class="svc-block">
      <div class="container split">
        <figure class="photo reveal">
          <img src="/img/hero/paneles-torre-960.webp" :alt="t('servicios.solar.achieveImageAlt')" loading="lazy" />
        </figure>
        <div class="reveal reveal-2">
          <h2 class="svc-heading">{{ t('servicios.solar.importanceTitle') }}</h2>
          <p v-for="(p, i) in tm('servicios.solar.importance')" :key="i" class="paragraph">{{ rt(p) }}</p>
        </div>
      </div>
    </section>

    <!-- Beneficios -->
    <section class="svc-block">
      <div class="container">
        <h2 class="svc-heading reveal">{{ t('servicios.solar.benefitsTitle') }}</h2>
        <div class="benefits">
          <article v-for="(b, i) in tm('servicios.solar.benefits')" :key="i" class="benefit card reveal" :class="`reveal-${(i % 3) + 1}`">
            <IconTile :icon="benefitIcons[i]" :size="50" />
            <h3>{{ rt(b.title) }}</h3>
            <p>{{ rt(b.text) }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Qué puedes lograr -->
    <section class="svc-block">
      <div class="container">
        <div class="achieve reveal">
          <h2>{{ t('servicios.solar.achieveTitle') }}</h2>
          <ul>
            <li v-for="(item, i) in tm('servicios.solar.achieve')" :key="i"><Check :size="18" />{{ rt(item) }}</li>
          </ul>
        </div>
      </div>
    </section>
  </ServiceLayout>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { SolarPanel, PiggyBank, Leaf, Plug, Mountain, Wrench, House, Check } from 'lucide-vue-next';
import ServiceLayout from '../../components/services/ServiceLayout.vue';
import IconTile from '../../components/ui/IconTile.vue';

const { t, tm, rt } = useI18n();
// Mismo orden que servicios.solar.benefits en src/locales/*.js
const benefitIcons = [PiggyBank, Leaf, Plug, Mountain, Wrench, House];
</script>

<style scoped>
/* imagen a la izquierda y texto a la derecha (alterna con el encabezado) */
.split { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(1.5rem, 4vw, 3rem); align-items: center }
.paragraph { margin: 0 0 1rem; font-size: 1.02rem; line-height: 1.75; color: var(--ink-dim) }
.photo { margin: 0; aspect-ratio: 4 / 3; border-radius: var(--r-xl); overflow: hidden; border: 6px solid #fff; box-shadow: var(--shadow-lg) }
.photo img { width: 100%; height: 100%; object-fit: cover; object-position: 70% 50% }

.benefits { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; margin-top: 1.2rem }
.benefit { padding: 1.5rem }
.benefit h3 { margin: 1rem 0 .4rem; font-size: 1.1rem; font-weight: 800; color: var(--ink) }
.benefit p { margin: 0; font-size: .92rem; line-height: 1.55; color: var(--ink-dim) }

.achieve {
  padding: clamp(1.6rem, 4vw, 2.4rem); border-radius: var(--r-lg);
  background: var(--green-soft); border: 1px solid rgba(22,163,74,.25);
}
.achieve h2 { margin: 0 0 1.2rem; font-size: clamp(1.3rem, 2.4vw, 1.7rem); font-weight: 800; color: var(--green-deep) }
.achieve ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem 1.5rem }
.achieve li { display: flex; gap: .6rem; align-items: flex-start; color: var(--ink); line-height: 1.5 }
.achieve li :deep(svg) { flex: none; color: var(--green); margin-top: 2px }

@media (max-width: 900px) {
  .split { grid-template-columns: 1fr }
  .benefits { grid-template-columns: 1fr 1fr }
}
@media (max-width: 600px) {
  .benefits, .achieve ul { grid-template-columns: 1fr }
}
</style>
