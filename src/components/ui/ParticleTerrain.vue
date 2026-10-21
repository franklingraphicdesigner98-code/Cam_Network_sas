<template>
  <div class="pt" :class="stage">
    <img ref="img" :src="src" alt="" class="pt-img" fetchpriority="high" />
    <canvas ref="canvas" class="pt-canvas" aria-hidden="true" />
  </div>
</template>

<script setup>
// Terreno 3D que "nace" de partículas, directamente en su forma y posición final:
//   1. assembling → las partículas vuelan y forman la malla completa
//   2. built      → aparece la imagen de la malla y las partículas se desvanecen
//   3. settled    → el mapa queda estático
// Emite "settle" al llegar al paso 3 (para animar lo que va encima, ej. los pines).
// La posición de la imagen se controla con la variable CSS --obj-pos en el elemento raíz.
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  color: { type: String, default: '22, 163, 74' }   // verde de las partículas (r, g, b)
});
const emit = defineEmits(['settle']);

const img = ref(null);
const canvas = ref(null);
const stage = ref('assembling');

const ASSEMBLE_MS = 1500;   // tiempo en que las partículas forman la malla
const CROSSFADE_MS = 450;   // partículas → imagen
let raf = null;
const timers = [];

function settleNow() {
  stage.value = 'settled';
  emit('settle');
}

// Puntos de la malla: píxeles oscuros (líneas) de la imagen, llevados a coordenadas de pantalla
// según object-fit: cover y object-position.
function sampleTargets(W, H, count) {
  const im = img.value;
  const iw = im.naturalWidth, ih = im.naturalHeight;
  const sw = 700, sh = Math.round((ih / iw) * sw);
  const off = document.createElement('canvas');
  off.width = sw; off.height = sh;
  const octx = off.getContext('2d', { willReadFrequently: true });
  octx.drawImage(im, 0, 0, sw, sh);
  const data = octx.getImageData(0, 0, sw, sh).data;

  const [px, py] = getComputedStyle(im).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
  const s = Math.max(W / iw, H / ih);
  const offX = (W - iw * s) * (isNaN(px) ? 0.5 : px);
  const offY = (H - ih * s) * (isNaN(py) ? 0.5 : py);
  const k = (iw / sw) * s;

  const pts = [];
  for (let y = 0; y < sh; y += 1) {
    for (let x = 0; x < sw; x += 1) {
      const i = (y * sw + x) * 4;
      if (data[i + 3] < 60) continue;
      if (data[i] + data[i + 1] + data[i + 2] > 600) continue;   // relleno claro, no es línea
      const X = offX + x * k, Y = offY + y * k;
      if (X >= 0 && X <= W && Y >= 0 && Y <= H) pts.push([X, Y]);
    }
  }
  // muestra aleatoria
  for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [pts[i], pts[j]] = [pts[j], pts[i]]; }
  return pts.slice(0, count);
}

function run() {
  const cv = canvas.value, root = cv.parentElement;
  const W = root.clientWidth, H = root.clientHeight;
  if (!W || !H) return settleNow();
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  const ctx = cv.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const targets = sampleTargets(W, H, W < 720 ? 1800 : 4500);
  const parts = targets.map(([tx, ty]) => ({
    tx, ty,
    sx: Math.random() * W,
    sy: Math.random() * H * 1.2 - H * 0.1,
    d: Math.random() * 0.45   // retraso relativo
  }));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const t0 = performance.now();

  function frame(now) {
    const p = Math.min(1, (now - t0) / ASSEMBLE_MS);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = `rgb(${props.color})`;
    for (const q of parts) {
      const local = Math.min(1, Math.max(0, (p - q.d) / (1 - q.d)));
      const e = ease(local);
      const x = q.sx + (q.tx - q.sx) * e, y = q.sy + (q.ty - q.sy) * e;
      const size = 1.7 + (1 - e) * 1.8;
      ctx.globalAlpha = 0.45 + 0.55 * local;
      ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;
    if (p < 1) raf = requestAnimationFrame(frame);
    else {
      stage.value = 'built';
      timers.push(setTimeout(settleNow, CROSSFADE_MS));
    }
  }
  raf = requestAnimationFrame(frame);
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return settleNow();
  const im = img.value;
  const go = () => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()).then(run);
  if (im.complete && im.naturalWidth) go();
  else {
    im.addEventListener('load', go, { once: true });
    im.addEventListener('error', settleNow, { once: true });
  }
});
onBeforeUnmount(() => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); });
</script>

<style scoped>
.pt-img, .pt-canvas { position: absolute; inset: 0; width: 100%; height: 100% }
.pt-img { object-fit: cover; object-position: var(--obj-pos, 50% 50%); opacity: 0; transition: opacity .45s ease }
.pt.built .pt-img, .pt.settled .pt-img { opacity: 1 }
.pt-canvas { pointer-events: none; transition: opacity .45s ease }
.pt.built .pt-canvas, .pt.settled .pt-canvas { opacity: 0 }

@media (prefers-reduced-motion: reduce) {
  .pt-img, .pt-canvas { transition: none }
}
</style>
