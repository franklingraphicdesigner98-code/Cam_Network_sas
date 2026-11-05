<template>
  <!-- Portada: arranca con la foto editada (brillos verdes); a los 1,5 s se funde con la foto normal y
       sigue el carrusel. Va por tiempo: el scroll no la controla. Fotos, tiempos y textos en src/data/heroEtapas.js -->
  <header ref="root" class="hero" :class="`is-${phase}`">
    <!-- carrusel: "Lejos" + las 5 fotos de siempre (public/img/hero/, en 1920 y 960 px) -->
    <img
      v-for="(s, i) in slides" :key="s.key"
      :ref="(el) => setSlideRef(el, s.key)"
      :src="cargadas.has(i) ? s.src : undefined" :srcset="cargadas.has(i) ? s.srcset : undefined" :sizes="s.srcset ? '100vw' : undefined"
      :alt="i === active && phase === 'carousel' ? s.alt : ''"
      class="hero-bg" :class="{ active: i === active, tower: s.key === 'lejos' }"
      :fetchpriority="i === 0 ? 'high' : 'low'" decoding="async"
      @error="s.key === 'lejos' && onMissing('lejos')"
    />

    <!-- foto de entrada: se ve TRANSICION.intro ms y se funde con "Lejos" (mismo fundido que el carrusel) -->
    <img
      v-if="!missing.editada" ref="imgIntro" :src="IMAGENES.editada"
      :srcset="`${IMAGENES.editadaMovil} 960w, ${IMAGENES.editada} 1837w`" sizes="100vw" :alt="phase === 'carousel' ? '' : t('hero.towerAlts.signal')"
      class="intro-img" :class="{ gone: phase === 'carousel' }"
      width="1837" height="856" fetchpriority="high" decoding="async"
      @error="onMissing('editada')"
    />

    <div class="hero-shade" aria-hidden="true" />

    <div class="container hero-inner">
      <div class="hero-copy" aria-live="polite">
        <div class="reveal">
          <transition name="copy" mode="out-in">
            <div :key="step">
              <h1 class="display">{{ tx(etapas[step].title) }}</h1>
              <p class="lead subtitle">{{ tx(etapas[step].text) }}</p>
            </div>
          </transition>
        </div>
        <p class="tagline reveal reveal-2"><Handshake :size="20" />{{ t('hero.tagline') }}</p>
        <BaseButton :to="{ name: 'cobertura' }" variant="primary" class="hero-cta reveal reveal-3">
          {{ t('hero.cta') }}
          <template #icon-right><ArrowRight :size="18" /></template>
        </BaseButton>
      </div>

      <!-- indicador lateral discreto de etapas -->
      <ol class="hero-steps reveal reveal-2" :aria-label="t('hero.stepsLabel')">
        <li v-for="(e, i) in etapas" :key="i" :class="{ active: i === step, done: i < step }" :aria-current="i === step ? 'step' : undefined">
          <span class="dot" aria-hidden="true" /><span class="label">{{ tx(e.paso) }}</span>
        </li>
      </ol>
    </div>

    <!-- invita a bajar a ver el resto de la página -->
    <button type="button" class="scroll-hint" :aria-label="t('hero.scroll')" @click="scrollDown">
      <ChevronDown :size="26" />
    </button>
  </header>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRotacion, decodificar } from '../../composables/useRotacion.js';
import { useI18n } from 'vue-i18n';
import { useTx } from '../../composables/useTx.js';
import { Handshake, ArrowRight, ChevronDown } from 'lucide-vue-next';
import BaseButton from '../ui/BaseButton.vue';
import { IMAGENES, TRANSICION, etapas, etapaPorFoto } from '../../data/heroEtapas.js';

const { t, tm, rt } = useI18n();
const tx = useTx();

// Mismo orden que hero.alts en src/locales/*.js
const photos = ['montanas-antena', 'instalacion-solar', 'paneles-torre', 'valle', 'panorama'];
const alts = computed(() => tm('hero.alts'));
const missing = reactive({ editada: false, lejos: false });
const slides = computed(() => [
  ...(missing.lejos ? [] : [{
    key: 'lejos', src: IMAGENES.lejos, srcset: `${IMAGENES.lejosMovil} 960w, ${IMAGENES.lejos} 1280w`, alt: t('hero.towerAlts.original')
  }]),
  ...photos.map((p, i) => ({
    key: p,
    src: `/img/hero/${p}-1920.webp`,
    srcset: `/img/hero/${p}-960.webp 960w, /img/hero/${p}-1920.webp 1920w`,
    alt: rt(alts.value[i])
  }))
]);

const root = ref(null);
const imgIntro = ref(null);
let imgLejos = null;
const setSlideRef = (el, key) => { if (el && key === 'lejos') imgLejos = el; };
// pending (antes de montar) → intro (foto editada visible) → carousel (la editada se funde y sigue el carrusel)
const phase = ref('pending');
const active = ref(0);
// fotos del carrusel ya pedidas: al inicio solo la primera; cada foto se pide justo antes de su turno
const cargadas = reactive(new Set([0]));
// durante la intro el título inicial queda fijo; en el carrusel sigue la etapa de cada foto
const step = computed(() => (phase.value === 'carousel' ? etapaPorFoto[slides.value[active.value]?.key] ?? 0 : 0));

// ---------- Intro por tiempo (sin scroll): la editada se ve TRANSICION.intro ms y luego se funde ----------
let introTimer = null;

// ---------- Fin de la intro → carrusel normal ----------
const { paso, iniciar: startCarousel } = useRotacion(TRANSICION.carrusel, { auto: false });
watch(paso, () => {
  active.value = (active.value + 1) % slides.value.length;
  cargadas.add((active.value + 1) % slides.value.length);   // la siguiente se va cargando mientras tanto
});
function finish() {
  if (phase.value === 'carousel') return;
  clearTimeout(introTimer);
  phase.value = 'carousel';            // la clase .gone hace el fundido de la editada (solo opacity)
  active.value = 0;
  cargadas.add(1 % slides.value.length);
  startCarousel();
}

function onMissing(cual) {
  if (missing[cual]) return;
  const ruta = cual === 'editada' ? IMAGENES.editada : IMAGENES.lejos;
  console.warn(`[Hero] No se encontró la imagen "${ruta}": se omite la intro.`);
  missing[cual] = true;
  finish();
}


function scrollDown() {
  const hero = root.value;
  window.scrollTo({ top: hero.offsetTop + hero.offsetHeight - 70, behavior: 'smooth' });
}

onMounted(async () => {
  // con "reducir movimiento" o ahorro de datos: directo al carrusel
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  if (missing.editada || missing.lejos || reduced || saveData) { finish(); return; }
  phase.value = 'intro';

  // precarga: las dos fotos cargadas y decodificadas antes de empezar a contar (sin saltos)
  const [ed, le] = await Promise.allSettled([decodificar(imgIntro.value), decodificar(imgLejos)]);
  if (ed.status === 'rejected') { onMissing('editada'); return; }
  if (le.status === 'rejected') { onMissing('lejos'); return; }
  if (phase.value !== 'intro') return;
  introTimer = setTimeout(finish, TRANSICION.intro);
});
onBeforeUnmount(() => {
  clearTimeout(introTimer);
});
</script>

<style scoped>
/* La portada mide siempre una pantalla (100svh), con o sin intro: sin saltos de layout */
.hero {
  position: relative;
  overflow: hidden;
  display: flex; align-items: center;
  height: 100vh; height: 100svh; min-height: 520px;
  padding: var(--nav-h) 0 2rem;
  color: #fff;
  background: #111;
}
.hero-bg, .intro-img {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover;
}
.hero-bg {
  object-position: 70% 50%;
  opacity: 0; transform: scale(1.08);
  transition: opacity 1s ease, transform 7.5s ease-out;   /* fundido de 1 s entre fotos */
}
.hero-bg.active { opacity: 1; transform: scale(1) }
/* "Lejos" y la foto editada usan el mismo encuadre para que la torre coincida */
.hero-bg.tower, .intro-img { object-position: 50% 50% }

/* foto de entrada: encima de "Lejos"; solo cambia su opacidad */
.intro-img { will-change: opacity }
.intro-img { transition: opacity 1s ease }          /* mismo fundido que el carrusel */
.intro-img.gone { opacity: 0; pointer-events: none }

/* degradado neutro oscuro, solo lo necesario para leer el texto */
.hero-shade {
  position: absolute; inset: 0;
  background:
    linear-gradient(90deg, rgba(0,0,0,.58) 0%, rgba(0,0,0,.42) 32%, rgba(0,0,0,.12) 58%, rgba(0,0,0,0) 72%),
    linear-gradient(0deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 30%);
}
.hero-inner {
  position: relative; z-index: 1; width: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 2rem;
}
.hero-copy { max-width: 560px }

.hero .display {
  color: #fff;
  font-size: clamp(2.4rem, 5vw, 4rem);
  text-shadow: 0 2px 18px rgba(0,0,0,.45);
}
.subtitle {
  margin: 1.3rem 0 0; max-width: 40ch;
  color: #fff; font-size: clamp(1rem, 1.6vw, 1.2rem);
  text-shadow: 0 1px 10px rgba(0,0,0,.5);
}
.tagline {
  display: flex; align-items: center; gap: .55rem;
  margin: 1.4rem 0 0;
  font-style: italic; font-weight: 600; font-size: .98rem;
  color: #fff; text-shadow: 0 1px 10px rgba(0,0,0,.5);
}
.tagline :deep(svg) { color: var(--green-3) }
.hero-cta { margin-top: 2rem }
.copy-enter-active, .copy-leave-active { transition: opacity .3s ease }
.copy-enter-from, .copy-leave-to { opacity: 0 }

/* indicador lateral discreto */
.hero-steps {
  list-style: none; margin: 0; padding: .85rem 1rem; display: flex; flex-direction: column; gap: .9rem;
  background: rgba(0, 0, 0, .35); border: 1px solid rgba(255,255,255,.12); border-radius: 14px;
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
}
.hero-steps li { display: flex; align-items: center; justify-content: flex-end; gap: .6rem; font-size: .78rem; font-weight: 600; color: rgba(255,255,255,.62); transition: color .3s ease }
.hero-steps li .label { order: -1 }
.hero-steps .dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,255,255,.3); transition: background .3s ease, box-shadow .3s ease }
.hero-steps li.done .dot { background: #354d9b }
.hero-steps li.active { color: #fff }
.hero-steps li.active .dot { background: var(--green-3); box-shadow: 0 0 0 4px rgba(74,222,128,.22), 0 0 12px rgba(74,222,128,.7) }


.scroll-hint {
  position: absolute; z-index: 2; left: 50%; bottom: 1.1rem; transform: translateX(-50%);
  display: grid; place-items: center; width: 46px; height: 46px; border-radius: 50%;
  color: #fff; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.35);
  animation: hint-bounce 2s ease-in-out infinite;
}
.scroll-hint:hover { background: rgba(255,255,255,.22) }
.scroll-hint:focus-visible { outline: 2px solid #fff; outline-offset: 3px }
@keyframes hint-bounce { 0%, 100% { transform: translate(-50%, 0) } 50% { transform: translate(-50%, 8px) } }

@media (prefers-reduced-motion: reduce) {
  .hero-bg { transition: none; transform: none }
  .scroll-hint { animation: none }
}
@media (max-width: 767px) {
  .hero-steps { display: none }
}
@media (max-width: 720px) {
  .scroll-hint { display: none }   /* en celular tapaba el botón de la portada */
  .hero-bg:not(.tower) { object-position: 75% 50% }
  .hero-shade { background: linear-gradient(90deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.45) 60%, rgba(0,0,0,.3) 100%) }
}
</style>
