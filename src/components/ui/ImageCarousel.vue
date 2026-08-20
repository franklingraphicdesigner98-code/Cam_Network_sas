<template>
  <div
    class="carousel"
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="resume"
  >
    <div class="carousel-frame">
      <img
        v-for="(image, i) in images"
        :key="image.src"
        :src="image.src"
        :alt="image.alt"
        class="carousel-img"
        :class="{ active: i === active }"
        :loading="i === 0 ? 'eager' : 'lazy'"
      />
    </div>

    <button class="nav prev" type="button" aria-label="Anterior" @click="prev">
      <ChevronLeft :size="20" />
    </button>
    <button class="nav next" type="button" aria-label="Siguiente" @click="next">
      <ChevronRight :size="20" />
    </button>

    <div class="dots">
      <button
        v-for="(image, i) in images"
        :key="'dot-' + image.src"
        class="dot"
        :class="{ active: i === active }"
        type="button"
        :aria-label="`Ir a la imagen ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  images: { type: Array, required: true },
  interval: { type: Number, default: 4500 }
});

const active = ref(0);
let timer = null;
let reducedMotion = false;

function next() { active.value = (active.value + 1) % props.images.length; }
function prev() { active.value = (active.value - 1 + props.images.length) % props.images.length; }
function goTo(i) { active.value = i; }

function play() {
  if (reducedMotion || timer) return;
  timer = setInterval(next, props.interval);
}
function pause() {
  clearInterval(timer);
  timer = null;
}
function resume() { play(); }

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  play();
});
onBeforeUnmount(pause);
</script>

<style scoped>
.carousel {
  position: relative;
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: var(--bg-2);
}
.carousel-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3.3;
}
.carousel-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity .7s ease;
}
.carousel-img.active { opacity: 1 }

.nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 38px; height: 38px; border-radius: 50%;
  display: grid; place-items: center;
  background: rgba(15,23,42,.45);
  color: #fff;
  backdrop-filter: blur(2px);
  transition: background .2s ease, transform .2s ease;
}
.nav:hover { background: rgba(15,23,42,.7) }
.nav.prev { left: 14px }
.nav.next { right: 14px }

.dots {
  position: absolute; left: 0; right: 0; bottom: 14px;
  display: flex; justify-content: center; gap: .4rem;
}
.dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(255,255,255,.7);
  transition: background .2s ease, transform .2s ease;
}
.dot.active { background: #fff; transform: scale(1.2) }

@media (max-width: 720px) {
  .carousel-frame { aspect-ratio: 4 / 3 }
  .nav { width: 34px; height: 34px }
}
</style>
