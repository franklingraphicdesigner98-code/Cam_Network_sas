<template>
  <section ref="root" class="hss" :class="{ 'is-static': isStatic }" :aria-label="ariaLabel">
    <div class="hss-sticky">
      <!-- Primer fotograma como imagen: se ve mientras carga la secuencia y es la versión estática -->
      <img
        v-show="!posterMissing" :src="frameUrl(1)" alt="" class="hss-poster" :class="{ hidden: drawnOnce && !isStatic }"
        @error="posterMissing = true"
        fetchpriority="high" decoding="async"
      />
      <canvas v-show="!isStatic" ref="canvas" class="hss-canvas" aria-hidden="true" />
      <div class="hss-shade" aria-hidden="true" />

      <div class="container hss-inner">
        <!-- Título y texto de la etapa actual (contenido real en el DOM) -->
        <div class="hss-copy glass" aria-live="polite">
          <span class="hss-step-num">{{ String(step + 1).padStart(2, '0') }} / {{ String(steps.length).padStart(2, '0') }}</span>
          <h2>{{ tx(current.title) }}</h2>
          <p>{{ tx(current.text) }}</p>
        </div>

        <!-- Indicador lateral de etapas -->
        <ol class="hss-steps glass">
          <li v-for="(s, i) in steps" :key="i" :class="{ active: i === step, done: i < step }" :aria-current="i === step ? 'step' : undefined">
            <span class="dot" aria-hidden="true" />
            <span class="label">{{ tx(s.label) }}</span>
          </li>
        </ol>
      </div>

      <span v-if="showCounter && !isStatic" class="hss-counter" aria-hidden="true">FRAME {{ String(frame + 1).padStart(3, '0') }}</span>
      <div v-if="!isStatic" class="hss-progress" aria-hidden="true"><span :style="{ transform: `scaleX(${progress})` }" /></div>
    </div>
  </section>
</template>

<script setup>
// Hero con secuencia de fotogramas controlada por el scroll (dibujada en <canvas>).
// - La sección mide ~300vh y su contenido es sticky (100vh); el progreso 0→1 elige el fotograma.
// - Un solo bucle requestAnimationFrame, activo solo mientras la sección está en pantalla.
// - Carga progresiva: primero los primeros fotogramas, el resto en segundo plano.
// - En pantallas < 768px, con "reducir movimiento" o con ahorro de datos: imagen estática.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { FRAME_COUNT, FRAME_PATH, FRAME_EXT, pasos } from '../../data/heroSecuencia.js';

const props = defineProps({
  frameCount: { type: Number, default: FRAME_COUNT },
  steps: { type: Array, default: () => pasos },
  showCounter: { type: Boolean, default: true },
  ariaLabel: { type: String, default: 'Servicios de Cam Network: internet, cámaras de seguridad, energía solar y soporte' },
  priorityFrames: { type: Number, default: 12 }   // cuántos fotogramas se cargan primero
});

const { locale } = useI18n();
const tx = (o) => (typeof o === 'string' ? o : o[locale.value] || o.es);

const root = ref(null);
const canvas = ref(null);
const isStatic = ref(false);
const drawnOnce = ref(false);
const posterMissing = ref(false);   // si aún no están los fotogramas, no se muestra el ícono de imagen rota
const progress = ref(0);
const frame = ref(0);
const step = computed(() => Math.min(props.steps.length - 1, Math.floor(progress.value * props.steps.length)));
const current = computed(() => props.steps[step.value]);

const frameUrl = (n) => `${FRAME_PATH}${String(n).padStart(4, '0')}${FRAME_EXT}`;

let images = [];
let ctx = null, W = 0, H = 0, lastDrawn = -1, raf = null, visible = false, io = null, alive = true;

function shouldBeStatic() {
  const small = window.innerWidth < 768;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  return small || reduced || saveData;
}

// ---------- Carga progresiva ----------
function load(i) {
  return new Promise((res) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => { images[i] = im; res(); };
    im.onerror = () => res();      // si falta un fotograma, se usa el anterior disponible
    im.src = frameUrl(i + 1);
  });
}
async function preload() {
  const n = props.frameCount;
  const first = Math.min(props.priorityFrames, n);
  await Promise.all(Array.from({ length: first }, (_, i) => load(i)));
  // el resto en segundo plano, de a 4 a la vez
  let next = first;
  const worker = async () => { while (alive && next < n) await load(next++); };
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
  idle(() => Promise.all([worker(), worker(), worker(), worker()]));
}

// ---------- Dibujo (cover + devicePixelRatio con límite 2) ----------
function resize() {
  const el = canvas.value;
  if (!el) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = el.clientWidth; H = el.clientHeight;
  el.width = Math.round(W * dpr); el.height = Math.round(H * dpr);
  ctx = el.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  lastDrawn = -1;
}
function nearestLoaded(i) {
  for (let k = i; k >= 0; k--) if (images[k]) return k;
  for (let k = i + 1; k < props.frameCount; k++) if (images[k]) return k;
  return -1;
}
function draw(i) {
  const k = nearestLoaded(i);
  if (k < 0 || !ctx) return;
  if (k === lastDrawn) return;
  const im = images[k];
  const s = Math.max(W / im.naturalWidth, H / im.naturalHeight);
  const w = im.naturalWidth * s, h = im.naturalHeight * s;
  ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
  lastDrawn = k;
  drawnOnce.value = true;
}

// ---------- Un solo rAF, activo solo con la sección visible ----------
function tick() {
  const r = root.value.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  if (p !== progress.value) progress.value = p;
  frame.value = Math.round(p * (props.frameCount - 1));
  draw(frame.value);
  raf = visible ? requestAnimationFrame(tick) : null;
}
function startLoop() { if (!raf) raf = requestAnimationFrame(tick); }

onMounted(() => {
  if (shouldBeStatic()) { isStatic.value = true; return; }
  resize();
  preload().then(() => { lastDrawn = -1; startLoop(); });
  window.addEventListener('resize', resize, { passive: true });
  io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) startLoop(); });
  io.observe(root.value);
});
onBeforeUnmount(() => {
  alive = false;
  cancelAnimationFrame(raf);
  io?.disconnect();
  window.removeEventListener('resize', resize);
});
</script>

<style scoped>
/* 300vh de recorrido; en celular / reducir movimiento la sección es de una sola pantalla.
   (la regla CSS evita que la altura salte al cargar; el JS solo cubre el caso de ahorro de datos) */
.hss { position: relative; height: 300vh; background: var(--forest) }
.hss.is-static { height: auto }
@media (max-width: 767px), (prefers-reduced-motion: reduce) { .hss { height: auto } }

.hss-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden }
.hss.is-static .hss-sticky { position: relative; height: auto; min-height: 100vh; display: flex; align-items: flex-end }
.hss-poster, .hss-canvas { position: absolute; inset: 0; width: 100%; height: 100% }
.hss-poster { object-fit: cover; transition: opacity .4s ease }
.hss-poster.hidden { opacity: 0 }
.hss-shade {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(5,38,19,.85) 0%, rgba(5,38,19,.45) 45%, rgba(5,38,19,.15) 100%),
              linear-gradient(0deg, rgba(5,38,19,.6) 0%, rgba(5,38,19,0) 40%);
}

.hss-inner {
  position: relative; z-index: 1; height: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 2rem;
  padding-top: var(--nav-h);
}
.hss.is-static .hss-inner { height: auto; flex-direction: column; align-items: stretch; padding-block: calc(var(--nav-h) + 2rem) 2rem }

/* interfaz tipo vidrio oscuro */
.glass {
  background: rgba(10, 42, 23, .55);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: var(--r-lg);
  box-shadow: 0 20px 50px rgba(0, 0, 0, .25);
  color: #fff;
}
.hss-copy { max-width: 520px; padding: clamp(1.4rem, 3vw, 2.2rem) }
.hss-step-num { font-size: .78rem; font-weight: 700; letter-spacing: .14em; color: var(--green-3) }
.hss-copy h2 { margin: .6rem 0 .7rem; font-size: clamp(1.8rem, 3.6vw, 2.8rem); font-weight: 800; line-height: 1.1; letter-spacing: -.02em }
.hss-copy p { margin: 0; color: rgba(255,255,255,.85); line-height: 1.6 }

.hss-steps { list-style: none; margin: 0; padding: 1rem 1.1rem; display: flex; flex-direction: column; gap: .9rem }
.hss-steps li { display: flex; align-items: center; gap: .7rem; font-size: .88rem; font-weight: 600; color: rgba(255,255,255,.55); transition: color .3s ease }
.hss-steps .dot {
  width: 10px; height: 10px; border-radius: 50%; flex: none;
  background: rgba(255,255,255,.25); box-shadow: 0 0 0 3px rgba(255,255,255,.06);
  transition: background .3s ease, box-shadow .3s ease;
}
.hss-steps li.done .dot { background: #354d9b }                                   /* azul del logo */
.hss-steps li.active { color: #fff }
.hss-steps li.active .dot { background: var(--green-3); box-shadow: 0 0 0 4px rgba(74,222,128,.25), 0 0 14px rgba(74,222,128,.7) }

.hss-counter {
  position: absolute; left: 1.2rem; bottom: 1.2rem; z-index: 1;   /* a la izquierda: a la derecha está el botón de WhatsApp */
  font: 600 .72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .12em;
  color: rgba(255,255,255,.55);
}
.hss-progress { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: rgba(255,255,255,.1); z-index: 1 }
.hss-progress span { display: block; height: 100%; background: linear-gradient(90deg, var(--green-3), #354d9b); transform-origin: left }

@media (max-width: 960px) {
  .hss-inner { flex-direction: column; justify-content: center; align-items: stretch }
  .hss-steps { flex-direction: row; flex-wrap: wrap; justify-content: center }
}
</style>
