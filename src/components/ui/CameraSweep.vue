<template>
  <!-- Cámara que barre de lado a lado (fotogramas en un canvas) con resplandores rojo y azul detrás -->
  <div
    ref="root" class="cam-sweep" :class="{ still, ready }"
    role="img" :aria-label="label" :style="{ '--glow-base': INTENSIDAD_LUCES }"
  >
    <div ref="glows" class="glows" aria-hidden="true">
      <span class="halo red" />
      <span class="halo blue" />
      <span class="glow red" />
      <span class="glow blue" />
    </div>
    <canvas ref="canvas" class="cam" aria-hidden="true" />
  </div>
</template>

<script setup>
// ================= Ajustes =================
// Copias livianas en WebP (700 px) de las fotos de public/img/Rotacion/
const CARPETA = '/img/Rotacion/webp/';
// Orden del barrido (de un extremo al otro). 'cam_front' es opcional.
const SECUENCIA = [
  'cam_izq_60', 'cam_izq_50', 'cam_izq_40', 'cam_izq_30', 'cam_izq_20', 'cam_izq_10',
  'cam_front',
  'cam_der_10', 'cam_der_20', 'cam_der_30', 'cam_der_40', 'cam_der_50', 'cam_der_60'
];
const OPCIONALES = ['cam_front'];
const BARRIDO_MS = 3000;          // lo que tarda en ir de un extremo al otro
const PAUSA_MS = 400;             // pausa en cada extremo
const DESPLAZAMIENTO_LUCES = 9;   // cuánto se corren los resplandores con la mirada (% del ancho del visual)
const LUCES_SIGUEN_LENTE = 1;     // 1: siguen al lente (en cam_izq_* mira hacia la derecha); -1: al revés
const INTENSIDAD_LUCES = 1;       // 0 a 1 (en celular se reduce un 25%)
// ===========================================

import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps({
  label: { type: String, default: 'Cámara de seguridad monitoreando' }
});

const root = ref(null);
const canvas = ref(null);
const glows = ref(null);
const still = ref(false);
const ready = ref(false);

let frames = [];           // imágenes ya decodificadas, en orden
let ctx = null, raf = null, io = null, visible = false, alive = true;
let elapsed = 0, lastNow = 0, lastIdx = -1;
const CICLO = 2 * (BARRIDO_MS + PAUSA_MS);
const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;

// posición 0 → 1 → 0 (ida y vuelta) con pausa en los extremos
function posicion(ms) {
  const t = ms % CICLO;
  if (t < BARRIDO_MS) return easeInOutSine(t / BARRIDO_MS);
  if (t < BARRIDO_MS + PAUSA_MS) return 1;
  const v = t - BARRIDO_MS - PAUSA_MS;
  return v < BARRIDO_MS ? 1 - easeInOutSine(v / BARRIDO_MS) : 0;
}

// ---------- Carga (con decode) ----------
function cargar(src) {
  const im = new Image();
  im.decoding = 'async';
  im.src = src;
  return im.decode().then(() => im);
}
function cargarFotograma(nombre) {
  return cargar(`${CARPETA}${nombre}.webp`).catch(() => null);
}

// ---------- Dibujo ----------
function ajustarCanvas() {
  const el = canvas.value;
  if (!el) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  el.width = Math.round(el.clientWidth * dpr);
  el.height = Math.round(el.clientHeight * dpr);
  ctx = el.getContext('2d');
  lastIdx = -1;
}
function dibujar(i) {
  if (i === lastIdx || !ctx || !frames[i]) return;    // no se redibuja si el fotograma no cambió
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.drawImage(frames[i], 0, 0, canvas.value.width, canvas.value.height);
  lastIdx = i;
}
function moverLuces(u) {
  // u = 0 (primer fotograma) … 1 (último); en el centro quedan centradas
  const x = LUCES_SIGUEN_LENTE * (1 - 2 * u) * DESPLAZAMIENTO_LUCES;
  glows.value.style.transform = `translateX(${x.toFixed(2)}%)`;
}

// ---------- Un solo rAF, solo con el visual en pantalla ----------
function tick(now) {
  elapsed += Math.min(now - lastNow, 100);    // al volver a la pestaña no da un salto
  lastNow = now;
  const u = posicion(elapsed);
  dibujar(Math.round(u * (frames.length - 1)));
  moverLuces(u);
  raf = visible ? requestAnimationFrame(tick) : null;
}
function arrancar() {
  if (raf || still.value || frames.length < 2) return;
  lastNow = performance.now();
  raf = requestAnimationFrame(tick);
}
const onResize = () => { const i = lastIdx; ajustarCanvas(); dibujar(Math.max(i, 0)); };

onMounted(async () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  still.value = reduced || saveData;
  ajustarCanvas();
  window.addEventListener('resize', onResize, { passive: true });

  if (still.value) {
    // fija: la frontal, o cam_izq_10 si no hay frontal
    const im = (await cargarFotograma('cam_front')) || (await cargarFotograma('cam_izq_10'));
    if (!alive || !im) return;
    frames = [im];
    dibujar(0);
    ready.value = true;
    return;
  }

  // en celular solo los fotogramas pares (más liviano)
  const nombres = window.innerWidth < 768 ? SECUENCIA.filter((_, i) => i % 2 === 0) : SECUENCIA;
  const cargados = await Promise.all(nombres.map(cargarFotograma));
  if (!alive) return;
  const faltan = nombres.filter((_, i) => !cargados[i]);
  faltan.filter((n) => OPCIONALES.includes(n)).forEach((n) =>
    console.warn(`[CameraSweep] No se encontró "${n}" (opcional): el barrido se arma sin ella.`));
  const obligatorias = faltan.filter((n) => !OPCIONALES.includes(n));
  if (obligatorias.length) console.warn(`[CameraSweep] Faltan fotogramas: ${obligatorias.join(', ')}. Se usan los que hay.`);
  frames = cargados.filter(Boolean);
  if (!frames.length) return;

  // primer cuadro según la posición inicial, y a animar cuando se vea
  dibujar(0);
  moverLuces(0);
  ready.value = true;
  io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) arrancar();
  });
  io.observe(root.value);
});
onBeforeUnmount(() => {
  alive = false;
  cancelAnimationFrame(raf);
  io?.disconnect();
  window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
.cam-sweep {
  position: relative;
  width: min(100%, 340px); aspect-ratio: 880 / 1254;   /* proporción de las fotos */
  margin: 0 auto; justify-self: center;
  --glow: var(--glow-base, 1);
}
/* la cámara: solo cambia de fotograma + una respiración muy leve */
.cam {
  position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%;
  opacity: 0; transition: opacity .5s ease;
  animation: breathe 4s ease-in-out infinite;
}
.ready .cam { opacity: 1 }

/* luces de vigilancia detrás de la cámara: rojo y azul se alternan como una baliza */
.glows { position: absolute; inset: -12%; z-index: 0; pointer-events: none; will-change: transform }
/* halo amplio: tiñe la zona alrededor de la cámara */
.halo {
  position: absolute; top: 48%; width: 100%; aspect-ratio: 1; border-radius: 50%;
  translate: -50% -50%; filter: blur(36px);
  animation: beacon 2.4s ease-in-out infinite;
}
.halo.red { left: 36%; background: radial-gradient(circle, rgba(239, 68, 68, calc(.75 * var(--glow))) 0%, rgba(239, 68, 68, 0) 70%) }
.halo.blue { left: 64%; background: radial-gradient(circle, rgba(37, 99, 235, calc(.75 * var(--glow))) 0%, rgba(37, 99, 235, 0) 70%); animation-delay: -1.2s }
/* núcleo más intenso a la altura de los LED del domo */
.glow {
  position: absolute; top: 72%; width: 62%; aspect-ratio: 1; border-radius: 50%;
  translate: -50% -50%; filter: blur(22px);
  animation: beacon 2.4s ease-in-out infinite;
}
.glow.red { left: 42%; background: radial-gradient(circle, rgba(248, 56, 56, var(--glow)) 0%, rgba(248, 56, 56, 0) 66%) }
.glow.blue { left: 58%; background: radial-gradient(circle, rgba(59, 130, 246, var(--glow)) 0%, rgba(59, 130, 246, 0) 66%); animation-delay: -1.2s }

@keyframes beacon {
  0%, 100% { opacity: .45; transform: scale(.92) }
  50% { opacity: 1; transform: scale(1.1) }
}
@keyframes breathe {
  0%, 100% { transform: scale(1) }
  50% { transform: scale(1.01) }
}

/* sin movimiento: cámara fija y luces quietas y tenues */
.still .cam { animation: none }
.still .glow, .still .halo { animation: none; opacity: .5 }

@media (max-width: 767px) {
  .cam-sweep { width: min(62vw, 240px); --glow: calc(var(--glow-base, 1) * .75) }
  .halo { filter: blur(30px) }
  .glow { filter: blur(18px) }
}
@media (prefers-reduced-motion: reduce) {
  .cam, .glow, .halo { animation: none }
}
</style>
