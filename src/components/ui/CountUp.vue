<template>
  <span ref="el">{{ prefix }}{{ formatted }}</span>
</template>

<script setup>
// Número que sube desde 0 hasta `value` cuando entra en pantalla y se detiene ahí.
// En el HTML generado (y para lectores de pantalla) ya aparece el valor final.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  value: { type: Number, required: true },
  prefix: { type: String, default: '' },
  duration: { type: Number, default: 1800 }   // ms
});

const { locale } = useI18n();
const el = ref(null);
const current = ref(props.value);
const formatted = computed(() =>
  Math.round(current.value).toLocaleString(locale.value === 'en' ? 'en-US' : 'es-CO')
);

let io = null, raf = null;
function run() {
  const start = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - start) / props.duration);
    current.value = props.value * (1 - Math.pow(1 - p, 3));   // arranca rápido y frena al final
    if (p < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  current.value = 0;
  io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { run(); io.disconnect(); }
  }, { threshold: 0.6 });
  io.observe(el.value);
});
onBeforeUnmount(() => { io?.disconnect(); cancelAnimationFrame(raf); });
</script>
