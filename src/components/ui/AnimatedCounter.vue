<template>
  <span ref="el">{{ prefix }}{{ formatted }}{{ suffix }}</span>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  target: { type: Number, required: true },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 1800 }
});

const el = ref(null);
const display = ref(0);
const formatted = computed(() => new Intl.NumberFormat('es-CO').format(display.value));

let observer = null;
let rafId = null;
let started = false;

function animate() {
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / props.duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    display.value = Math.round(props.target * eased);
    if (progress < 1) rafId = requestAnimationFrame(step);
  }
  rafId = requestAnimationFrame(step);
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        animate();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  if (el.value) observer.observe(el.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (rafId) cancelAnimationFrame(rafId);
});
</script>
