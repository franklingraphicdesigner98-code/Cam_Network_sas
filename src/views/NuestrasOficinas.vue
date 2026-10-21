<template>
  <AppNav />
  <main>
    <PageHero :title="t('pages.oficinas.title')" :subtitle="t('pages.oficinas.subtitle')" />

    <!-- Celular: video, dirección y mapa, uno debajo del otro.
         PC: video y mapa lado a lado, y la dirección debajo -->
    <section class="block last">
      <div class="container office-layout">
        <div id="video-como-llegar" class="video reveal">
          <h2>{{ t('oficinas.videoTitle') }}</h2>
          <p>{{ t('oficinas.videoText') }}</p>
          <!-- Con el archivo del video en el sitio se ve vertical completo; mientras tanto, embed de Instagram -->
          <VerticalVideo
            v-if="VIDEO_SRC" :src="VIDEO_SRC" :poster="VIDEO_POSTER" :title="t('oficinas.videoFrameTitle')"
            autoplay :sound-label="t('oficinas.videoSound')"
            :link="DIRECTIONS_VIDEO" :link-label="t('oficinas.videoLink')"
          />
          <InstagramEmbed v-else :post="DIRECTIONS_VIDEO" :title="t('oficinas.videoFrameTitle')" :link-label="t('oficinas.videoLink')" />
        </div>

        <!-- Dirección, horario y líneas -->
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
              <ul class="lines">
                <li v-for="(line, key) in LINEAS" :key="key">
                  <span class="line-name">{{ t('lineas.' + key) }}</span>
                  <a :href="'tel:+' + line.number">{{ line.display }}</a>
                  <a :href="whatsappLink(key)" target="_blank" rel="noopener noreferrer" class="line-wa" aria-label="WhatsApp"><MessageCircle :size="15" /></a>
                </li>
              </ul>
              <p><a href="mailto:comercial@camnetworksoluciones.com">comercial@camnetworksoluciones.com</a></p>
            </div>
          </div>
          <div class="dir-actions">
            <a :href="googleDirections" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <Navigation :size="16" /> {{ t('oficinas.googleMaps') }}
            </a>
            <a href="#video-como-llegar" class="btn btn-outline btn-sm">
              <CirclePlay :size="16" /> {{ t('oficinas.video') }}
            </a>
          </div>
        </div>

        <!-- Mapa -->
        <div class="map-card reveal">
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
import { MapPin, Clock, Phone, Navigation, CirclePlay, MessageCircle } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import IconTile from '../components/ui/IconTile.vue';
import InstagramEmbed from '../components/ui/InstagramEmbed.vue';
import VerticalVideo from '../components/ui/VerticalVideo.vue';
import { useReveal } from '../composables/useReveal.js';
import { LINEAS, whatsappLink } from '../data/contacto.js';

const { t } = useI18n();

// Dirección usada por el mapa y el botón de Google Maps
const ADDRESS = encodeURIComponent('Calle 11 #9-19, Local 103, San Gil, Santander, Colombia');
const mapEmbed = `https://www.google.com/maps?q=${ADDRESS}&output=embed`;
const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS}`;
// Video de Instagram con las indicaciones para llegar (se puede cambiar por otro post o reel)
const DIRECTIONS_VIDEO = 'https://www.instagram.com/p/DbykNgTCplm/';
// Video alojado en el sitio (vertical 9:16, comprimido para la web). Si se deja VIDEO_SRC vacío, se usa el embed de Instagram.
const VIDEO_SRC = '/video/como-llegar.mp4';
const VIDEO_POSTER = '/video/como-llegar-portada.webp';

useReveal();
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.block.last { padding-bottom: 4rem }

.office-layout { display: grid; grid-template-columns: 1fr; gap: 1.5rem }
@media (min-width: 901px) {
  .office-layout {
    grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
    grid-template-areas: 'video map' 'info info';
    align-items: stretch;
  }
  .video { grid-area: video }
  .office-layout .map-card { grid-area: map; height: auto; min-height: 480px }
  .info { grid-area: info }
}

.info {
  padding: clamp(1.4rem, 3vw, 2rem);
  display: grid; grid-template-columns: repeat(3, minmax(0, auto)); justify-content: space-between; gap: 1.5rem 2rem;
}
.info-row { display: flex; gap: 1rem; align-items: flex-start }
.info h2 { margin: 0 0 .25rem; font-size: .8rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--green) }
.info p { margin: 0; color: var(--ink-dim); font-size: .95rem; line-height: 1.5; overflow-wrap: anywhere }
.info p.strong { color: var(--ink); font-weight: 700; font-size: 1.05rem }
.info p.second { margin-top: .5rem }
.info a { color: var(--ink); font-weight: 600 }
.info a:hover { color: var(--green-deep) }
.lines { list-style: none; margin: .2rem 0 .5rem; padding: 0; display: flex; flex-direction: column; gap: .45rem }
.lines li { display: grid; grid-template-columns: auto auto; justify-content: start; align-items: center; gap: .1rem .6rem }
.line-name { grid-column: 1 / -1; font-size: .82rem; color: var(--ink-dim) }
.line-wa { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; color: #fff !important; background: #25d366 }

.dir-actions {
  grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: .6rem;
  padding-top: 1.2rem; border-top: 1px dashed var(--border);
}

.map-card {
  height: clamp(340px, 45vw, 480px); border-radius: var(--r-lg); overflow: hidden;
  border: 6px solid #fff; box-shadow: var(--shadow-lg); background: var(--bg-2);
}
.map-card iframe { display: block; width: 100%; height: 100%; border: 0 }

.video { display: flex; flex-direction: column; align-items: center; text-align: center }
.video h2 { margin: 0 0 .4rem; font-size: 1.3rem; font-weight: 800; letter-spacing: -.01em; color: var(--green-deep) }
.video > p { margin: 0 0 1.1rem; max-width: 40ch; color: var(--ink-dim); line-height: 1.55 }

@media (max-width: 900px) {
  .info { grid-template-columns: 1fr }
}
</style>
