<template>
  <div class="vv">
    <div class="vv-frame">
      <video
        ref="video"
        :src="src" :poster="poster || undefined"
        controls playsinline
        :muted="muted" :autoplay="autoplay" :preload="autoplay ? 'auto' : 'none'"
        :aria-label="title"
        @volumechange="muted = $event.target.muted"
      />
      <!-- Los navegadores solo reproducen solos los videos sin sonido; este botón lo activa -->
      <button v-if="autoplay && muted" type="button" class="vv-sound" @click="unmute">
        <VolumeX :size="18" /> {{ soundLabel }}
      </button>
    </div>
    <a v-if="link" :href="link" target="_blank" rel="noopener" class="vv-link">
      <Instagram :size="16" /> {{ linkLabel }} <ExternalLink :size="14" />
    </a>
  </div>
</template>

<script setup>
// Video vertical (formato Reel 9:16) alojado en el sitio, con reproductor nativo.
// Con `autoplay` arranca solo y sin sonido (requisito de los navegadores); si no, solo se
// descarga cuando la persona presiona reproducir.
import { ref, onMounted } from 'vue';
import { Instagram, ExternalLink, VolumeX } from 'lucide-vue-next';

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },     // imagen de portada antes de reproducir
  title: { type: String, default: '' },
  autoplay: { type: Boolean, default: false },
  soundLabel: { type: String, default: 'Activar sonido' },
  link: { type: String, default: '' },       // enlace opcional al post original
  linkLabel: { type: String, default: 'Ver en Instagram' }
});

const video = ref(null);
const muted = ref(props.autoplay);

function unmute() {
  video.value.muted = false;
  video.value.play();
}

onMounted(() => {
  if (!props.autoplay) return;
  // respeta a quien pidió reducir el movimiento en su dispositivo
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  video.value.muted = true;
  video.value.play().catch(() => {});   // si el navegador lo bloquea, queda el botón de reproducir
});
</script>

<style scoped>
.vv { width: 100%; max-width: 380px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: .8rem }
.vv-frame {
  position: relative; width: 100%; aspect-ratio: 9 / 16;
  border-radius: var(--r-lg); overflow: hidden;
  background: var(--forest); border: 6px solid #fff; box-shadow: var(--shadow-lg);
}
.vv-frame video { display: block; width: 100%; height: 100%; object-fit: cover; background: #000 }
.vv-sound {
  position: absolute; top: .8rem; left: 50%; transform: translateX(-50%);
  display: inline-flex; align-items: center; gap: .45rem;
  padding: .55rem 1rem; border-radius: 999px;
  font-size: .85rem; font-weight: 700; color: #fff;
  background: rgba(10,42,23,.78); border: 1px solid rgba(74,222,128,.5);
  backdrop-filter: blur(6px); box-shadow: 0 6px 18px rgba(0,0,0,.3);
  animation: nudge 2s ease-in-out infinite;
}
.vv-sound:hover { background: var(--green-deep) }
@keyframes nudge { 0%, 100% { transform: translateX(-50%) scale(1) } 50% { transform: translateX(-50%) scale(1.05) } }
@media (prefers-reduced-motion: reduce) { .vv-sound { animation: none } }
.vv-link {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .88rem; font-weight: 600; color: var(--green-deep);
}
.vv-link:hover { text-decoration: underline }
</style>
