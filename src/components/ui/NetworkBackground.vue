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

function createNodes() {
  const count = Math.max(26, Math.min(85, Math.round((width * height) / 26000)));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    r: Math.random() * 1.4 + 1.1
  }));
}

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

  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x <= 0 || n.x >= width) n.vx *= -1;
    if (n.y <= 0 || n.y >= height) n.vy *= -1;
    n.x = Math.min(Math.max(n.x, 0), width);
    n.y = Math.min(Math.max(n.y, 0), height);
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.14;
        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const n of nodes) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${dotColor}, 0.55)`;
    ctx.shadowColor = `rgba(${dotColor}, 0.65)`;
    ctx.shadowBlur = 6;
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

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
});

onBeforeUnmount(() => {
  stop();
  window.removeEventListener('resize', handleResize);
  if (resizeObserver) resizeObserver.disconnect();
  document.removeEventListener('visibilitychange', handleVisibility);
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
