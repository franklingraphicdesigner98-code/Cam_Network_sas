<template>
  <!-- Portada: cada vez que se abre arranca con la foto editada (brillos verdes); al primer scroll espera
       un momento y se vuelve transparente hasta dejar ver la foto normal. Después, el carrusel normal.
       Fotos, encuadre y textos por etapa en src/data/heroEtapas.js -->
  <header ref="root" class="hero" :class="`is-${phase}`">
    <!-- botón para saltar la intro (primero en el orden de tabulación del hero) -->
    <button v-if="phase === 'intro' && !auto" type="button" class="skip-btn" @click="skip">
      {{ t('hero.skip') }} <ChevronsRight :size="16" />
    </button>

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

    <!-- foto de entrada: se aleja y se funde con "Lejos" -->
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
    <button v-if="phase !== 'intro'" type="button" class="scroll-hint" :aria-label="t('hero.scroll')" @click="scrollDown">
      <ChevronDown :size="26" />
    </button>
  </header>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { Handshake, ArrowRight, ChevronDown, ChevronsRight } from 'lucide-vue-next';
import BaseButton from '../ui/BaseButton.vue';
import { IMAGENES, TRANSICION, etapas, etapaPorFoto } from '../../data/heroEtapas.js';

const { t, tm, rt, locale } = useI18n();
const tx = (o) => o[locale.value] || o.es;

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
// pending (antes de decidir) → intro (foto editada esperando el scroll / fundiéndose) → carousel
const phase = ref('pending');
const auto = ref(false);          // celular: sin bloqueo de scroll ni botón "Saltar"
const active = ref(0);
// fotos del carrusel ya pedidas: al inicio solo la primera; cada foto se pide justo antes de su turno
const cargadas = reactive(new Set([0]));
// durante la intro el título inicial queda fijo; en el carrusel sigue la etapa de cada foto
const step = computed(() => (phase.value === 'carousel' ? etapaPorFoto[slides.value[active.value]?.key] ?? 0 : 0));

// ---------- Alejamiento ----------
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeInOut = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
// una sola escritura por cuadro: la foto editada se vuelve transparente y deja ver "Lejos"
function apply(p) {
  const el = imgIntro.value;
  if (el) el.style.opacity = (1 - easeInOut(clamp01(p))).toFixed(3);
}

// ---------- Disparo: al primer scroll, espera TRANSICION.pausa y se funde sola ----------
let ready = false, triggered = false, raf = null, safety = null, delayTimer = null, timer = null;

function play() {
  const t0 = performance.now();
  const tick = (now) => {
    if (phase.value !== 'intro') return;
    const p = clamp01((now - t0) / TRANSICION.duracion);
    apply(p);
    if (p >= 1) finish(450); else raf = requestAnimationFrame(tick);   // pausa: la inercia de la rueda no baja la página de golpe
  };
  raf = requestAnimationFrame(tick);
}
function trigger() {
  if (!ready || triggered) return;
  triggered = true;
  delayTimer = setTimeout(play, TRANSICION.pausa);
  // seguridad: el scroll nunca queda bloqueado más de 10 s
  safety = setTimeout(() => finish(), 10000);
}

// PC: mientras dura la intro la página no baja; el primer gesto hacia abajo dispara el alejamiento
function onWheel(e) { e.preventDefault(); if (e.deltaY > 0) trigger(); }
let touchY = null;
function onTouchStart(e) { touchY = e.touches[0].clientY; }
function onTouchMove(e) {
  if (!auto.value) e.preventDefault();
  if (touchY != null && touchY - e.touches[0].clientY > 8) trigger();
}
function onKey(e) {
  if (e.key === 'Escape') { finish(); return; }
  const tag = e.target?.tagName;
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || e.target?.isContentEditable) return;
  if (e.key === ' ' && (tag === 'BUTTON' || tag === 'A')) return;     // Espacio sobre un botón lo activa
  if (['ArrowDown', 'PageDown', ' ', 'End', 'ArrowUp', 'PageUp', 'Home'].includes(e.key)) {
    e.preventDefault();
    if (!['ArrowUp', 'PageUp', 'Home'].includes(e.key)) trigger();
  }
}
const keepTop = () => { if (window.scrollY !== 0) window.scrollTo(0, 0); };   // p. ej. arrastrando la barra
// celular: sin bloqueo; el primer desplazamiento de la página dispara el alejamiento
const onMobileScroll = () => { if (window.scrollY > 4) trigger(); };

function listen() {
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  if (auto.value) {
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onMobileScroll, { passive: true });
    return;
  }
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('keydown', onKey);
  window.addEventListener('scroll', keepTop, { passive: true });
}
function unlisten() {
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('keydown', onKey);
  window.removeEventListener('scroll', keepTop);
  window.removeEventListener('scroll', onMobileScroll);
}

// ---------- Fin de la intro → carrusel normal ----------
function startCarousel() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  clearInterval(timer);
  cargadas.add(1 % slides.value.length);
  timer = setInterval(() => {
    active.value = (active.value + 1) % slides.value.length;
    cargadas.add((active.value + 1) % slides.value.length);   // la siguiente se va cargando mientras tanto
  }, TRANSICION.carrusel);
}
function finish(pausa = 0) {
  if (phase.value === 'carousel') return;
  if (pausa) setTimeout(unlisten, pausa); else unlisten();
  clearTimeout(safety);
  clearTimeout(delayTimer);
  cancelAnimationFrame(raf); raf = null;
  phase.value = 'carousel';
  active.value = 0;
  startCarousel();
}
function skip() { finish(); }       // botón "Saltar" o Escape: directo al carrusel

function onMissing(cual) {
  if (missing[cual]) return;
  const ruta = cual === 'editada' ? IMAGENES.editada : IMAGENES.lejos;
  console.warn(`[Hero] No se encontró la imagen "${ruta}": se omite la intro.`);
  missing[cual] = true;
  finish();
}

// espera a que la imagen esté cargada y decodificada (evita saltos al mostrarla)
function decodeImg(im) {
  if (!im) return Promise.reject(new Error('sin imagen'));
  if (im.complete && !im.naturalWidth) return Promise.reject(new Error('no cargó'));
  const loaded = im.complete ? Promise.resolve() : new Promise((res, rej) => {
    im.addEventListener('load', res, { once: true });
    im.addEventListener('error', rej, { once: true });
  });
  return loaded.then(() => (im.decode ? im.decode() : undefined));
}

function scrollDown() {
  const hero = root.value;
  window.scrollTo({ top: hero.offsetTop + hero.offsetHeight - 70, behavior: 'smooth' });
}

onMounted(async () => {
  // la intro se muestra cada vez que se abre el inicio, salvo con "reducir movimiento" o ahorro de datos
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const abajo = window.scrollY > window.innerHeight / 2;     // volvió con la página ya bajada
  if (missing.editada || missing.lejos || reduced || saveData || abajo) { finish(); return; }

  auto.value = window.innerWidth < 768;
  phase.value = 'intro';
  if (!auto.value) window.scrollTo(0, 0);
  listen();                                                     // en PC la página queda quieta desde ya

  // las dos fotos, cargadas y decodificadas antes de empezar
  const [ed, le] = await Promise.allSettled([decodeImg(imgIntro.value), decodeImg(imgLejos)]);
  if (ed.status === 'rejected') { onMissing('editada'); return; }
  if (le.status === 'rejected') { onMissing('lejos'); return; }
  if (phase.value !== 'intro') return;                          // saltada mientras cargaba
  apply(0);
  ready = true;
  if (auto.value && window.scrollY > 4) trigger();
});
onBeforeUnmount(() => {
  unlisten();
  cancelAnimationFrame(raf);
  clearTimeout(safety);
  clearTimeout(delayTimer);
  clearInterval(timer);
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
.intro-img.gone { opacity: 0 !important; transition: opacity .8s ease; pointer-events: none }

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

.skip-btn {
  position: absolute; z-index: 3; left: 50%; bottom: 1.4rem; transform: translateX(-50%);
  display: inline-flex; align-items: center; gap: .3rem;
  padding: .45rem .95rem; border-radius: 999px;
  font-size: .82rem; font-weight: 600; color: #fff;
  background: rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.35);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
}
.skip-btn:hover { background: rgba(0,0,0,.5) }
.skip-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px }

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
