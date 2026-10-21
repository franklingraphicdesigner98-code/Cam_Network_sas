<template>
  <canvas ref="canvasRef" class="network-bg" :class="{ 'is-absolute': !fixed }" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  fixed: { type: Boolean, default: true },
  dotColor: { type: String, default: '' },
  lineColor: { type: String, default: '' }
});

const canvasRef = ref(null);

let ctx = null;
let nodes = [];
let width = 0;
let height = 0;
let dpr = 1;
let raf = null;
let running = false;
let reducedMotion = false;
let resizeTimer = null;
let resizeObserver = null;

let dotColor = '74, 222, 128';
let lineColor = '22, 163, 74';

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

function readTokens() {
  if (props.dotColor) {
    dotColor = hexToRgb(props.dotColor);
  } else {
    const green2 = getComputedStyle(document.documentElement).getPropertyValue('--green-2').trim();
    if (green2) dotColor = hexToRgb(green2);
  }
  if (props.lineColor) {
    lineColor = hexToRgb(props.lineColor);
  } else {
    const green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim();
    if (green) lineColor = hexToRgb(green);
  }
}

// Cantidad según el área de pantalla (más en PC, menos en celular para cuidar el rendimiento)
function createNodes() {
  const max = width < 720 ? 70 : 150;
  const count = Math.max(40, Math.min(max, Math.round((width * height) / 11000)));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 1.6 + 1
  }));
}

// Posición del mouse: las partículas cercanas se conectan con él y se apartan suavemente
const mouse = { x: -9999, y: -9999 };
function handleMouse(e) {
  const rect = canvasRef.value.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}
function handleMouseLeave() { mouse.x = mouse.y = -9999; }

function resize() {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;
  if (props.fixed) {
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
  }
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createNodes();
}

function step() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const maxDist = Math.min(150, Math.max(95, width / 9));

  const mouseRadius = 160;
  for (const n of nodes) {
    // empujón suave lejos del cursor
    const mx = n.x - mouse.x, my = n.y - mouse.y;
    const md = Math.sqrt(mx * mx + my * my);
    if (md < mouseRadius && md > 0) {
      const force = (1 - md / mouseRadius) * 0.6;
      n.x += (mx / md) * force;
      n.y += (my / md) * force;
    }
    n.x += n.vx;
    n.y += n.vy;
    if (n.x <= 0 || n.x >= width) n.vx *= -1;
    if (n.y <= 0 || n.y >= height) n.vy *= -1;
    n.x = Math.min(Math.max(n.x, 0), width);
    n.y = Math.min(Math.max(n.y, 0), height);
  }

  // Líneas agrupadas por intensidad: pocos trazos por cuadro en vez de uno por línea
  const BUCKETS = 5;
  const paths = Array.from({ length: BUCKETS }, () => new Path2D());
  const maxD2 = maxDist * maxDist;
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < maxD2) {
        const k = Math.min(BUCKETS - 1, Math.floor((d2 / maxD2) * BUCKETS));
        paths[k].moveTo(a.x, a.y);
        paths[k].lineTo(b.x, b.y);
      }
    }
  }
  ctx.lineWidth = 1;
  for (let k = 0; k < BUCKETS; k++) {
    ctx.strokeStyle = `rgba(${lineColor}, ${(1 - (k + .5) / BUCKETS) * 0.16})`;
    ctx.stroke(paths[k]);
  }

  // líneas hacia el cursor
  const mouseLines = new Path2D();
  const mr2 = mouseRadius * mouseRadius;
  for (const n of nodes) {
    const dx = n.x - mouse.x, dy = n.y - mouse.y;
    if (dx * dx + dy * dy < mr2) { mouseLines.moveTo(n.x, n.y); mouseLines.lineTo(mouse.x, mouse.y); }
  }
  ctx.strokeStyle = `rgba(${lineColor}, .22)`;
  ctx.stroke(mouseLines);

  // puntos: un solo trazo para los halos y otro para los centros
  const halos = new Path2D(), cores = new Path2D();
  for (const n of nodes) {
    halos.moveTo(n.x + n.r * 2.4, n.y); halos.arc(n.x, n.y, n.r * 2.4, 0, Math.PI * 2);
    cores.moveTo(n.x + n.r, n.y); cores.arc(n.x, n.y, n.r, 0, Math.PI * 2);
  }
  ctx.fillStyle = `rgba(${dotColor}, 0.18)`;
  ctx.fill(halos);
  ctx.fillStyle = `rgba(${dotColor}, 0.6)`;
  ctx.fill(cores);

  if (running) raf = requestAnimationFrame(step);
}

function start() {
  if (running || reducedMotion) return;
  running = true;
  raf = requestAnimationFrame(step);
}

function stop() {
  running = false;
  if (raf) cancelAnimationFrame(raf);
  raf = null;
}

function handleVisibility() {
  if (document.hidden) stop();
  else start();
}

function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resize, 200);
}

onMounted(() => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  readTokens();
  resize();

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    step();
  } else {
    start();
  }

  if (props.fixed) {
    window.addEventListener('resize', handleResize);
  } else if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.parentElement);
  }
  document.addEventListener('visibilitychange', handleVisibility);
  window.addEventListener('mousemove', handleMouse, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave);
});

onBeforeUnmount(() => {
  stop();
  window.removeEventListener('resize', handleResize);
  if (resizeObserver) resizeObserver.disconnect();
  document.removeEventListener('visibilitychange', handleVisibility);
  window.removeEventListener('mousemove', handleMouse);
  document.removeEventListener('mouseleave', handleMouseLeave);
  clearTimeout(resizeTimer);
});
</script>

<style scoped>
.network-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
.network-bg.is-absolute {
  position: absolute;
  z-index: 0;
}
</style>
