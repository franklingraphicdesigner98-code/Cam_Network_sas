<template>
  <AppNav />
  <main>
    <PageHero :title="t('pages.oficinas.title')" :subtitle="t('pages.oficinas.subtitle')" />

    <section class="block last">
      <div class="container office-grid">
        <div class="details">
          <div class="panel info reveal">
            <div class="info-row">
              <IconTile :icon="MapPin" :size="48" />
              <div>
                <h2>{{ t('oficinas.addressTitle') }}</h2>
                <p class="strong">{{ t('oficinas.address') }}</p>
                <p>{{ t('oficinas.city') }}</p>
              </div>
            </div>
            <div class="info-row">
              <IconTile :icon="Clock" :size="48" />
              <div>
                <h2>{{ t('oficinas.hoursTitle') }}</h2>
                <p class="strong">{{ t('oficinas.hours') }}</p>
                <p>{{ t('oficinas.hoursDetail') }}</p>
                <p class="strong second">{{ t('oficinas.hoursSat') }}</p>
                <p>{{ t('oficinas.hoursSatDetail') }}</p>
              </div>
            </div>
            <div class="info-row">
              <IconTile :icon="Phone" :size="48" />
              <div>
                <h2>{{ t('oficinas.phonesTitle') }}</h2>
                <p><a href="tel:+573112280533">311 228 0533</a> · <a href="tel:+573104697936">310 469 7936</a></p>
                <p><a href="mailto:comercial@camnetworksoluciones.com">comercial@camnetworksoluciones.com</a></p>
              </div>
            </div>
          </div>

          <div class="directions reveal reveal-2">
            <h2>{{ t('oficinas.directionsTitle') }}</h2>
            <p>{{ t('oficinas.directionsText') }}</p>
            <div class="dir-actions">
              <a :href="googleDirections" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                <Navigation :size="16" /> {{ t('oficinas.googleMaps') }}
              </a>
              <a :href="DIRECTIONS_VIDEO" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm">
                <CirclePlay :size="16" /> {{ t('oficinas.video') }}
              </a>
            </div>
          </div>
        </div>

        <div class="map-card reveal reveal-2">
          <iframe
            :src="mapEmbed" :title="t('oficinas.mapTitle')"
            loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen
          />
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { MapPin, Clock, Phone, Navigation, CirclePlay } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import IconTile from '../components/ui/IconTile.vue';
import { useReveal } from '../composables/useReveal.js';

const { t } = useI18n();

// Dirección usada por el mapa y los botones de "Cómo llegar"
const ADDRESS = encodeURIComponent('Calle 11 #9-19, San Gil, Santander, Colombia');
const mapEmbed = `https://www.google.com/maps?q=${ADDRESS}&output=embed`;
const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS}`;
// Video en Instagram con las indicaciones para llegar a la oficina
const DIRECTIONS_VIDEO = 'https://www.instagram.com/p/DbykNgTCplm/';

useReveal();
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.block.last { padding-bottom: 4rem }

.office-grid { display: grid; grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr); gap: 1.25rem; align-items: stretch }
.details { display: flex; flex-direction: column; gap: 1.25rem }

.info { padding: clamp(1.4rem, 3vw, 2rem); display: flex; flex-direction: column; gap: 1.3rem }
.info-row { display: flex; gap: 1rem; align-items: flex-start }
.info h2 { margin: 0 0 .25rem; font-size: .8rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--green) }
.info p { margin: 0; color: var(--ink-dim); font-size: .95rem; line-height: 1.5; overflow-wrap: anywhere }
.info p.strong { color: var(--ink); font-weight: 700; font-size: 1.05rem }
.info p.second { margin-top: .5rem }
.info a { color: var(--ink); font-weight: 600 }
.info a:hover { color: var(--green-deep) }

.directions {
  padding: clamp(1.4rem, 3vw, 2rem); border-radius: var(--r-lg); color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, rgba(34,197,94,.3) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.directions h2 { margin: 0 0 .5rem; font-size: 1.25rem; font-weight: 800 }
.directions p { margin: 0 0 1.2rem; color: rgba(255,255,255,.85); line-height: 1.55 }
.dir-actions { display: flex; flex-wrap: wrap; gap: .6rem }

.map-card {
  min-height: 420px; border-radius: var(--r-lg); overflow: hidden;
  border: 6px solid #fff; box-shadow: var(--shadow-lg); background: var(--bg-2);
}
.map-card iframe { display: block; width: 100%; height: 100%; min-height: 420px; border: 0 }

@media (max-width: 900px) {
  .office-grid { grid-template-columns: 1fr }
  .map-card, .map-card iframe { min-height: 340px }
}
</style>
