<template>
  <div
    v-for="(p, i) in pins" :key="p.name"
    class="pin" :style="{ left: p.x + '%', top: p.y + '%', animationDelay: (i * -0.6) + 's' }"
  >
    <!-- con "intro", cada pin cae en su lugar uno tras otro -->
    <span class="pin-inner" :class="{ drop: intro }" :style="intro ? { animationDelay: (introDelay + i * 0.12) + 's' } : null">
      <span class="pin-label">{{ p.name }}</span>
      <MapPin :size="size" :stroke-width="1.8" class="pin-icon" />
      <span class="pin-shadow" />
    </span>
  </div>
</template>

<script setup>
// Pines flotantes con nombre (mapas de Cobertura). x / y en % del contenedor,
// que debe tener position: relative.
import { MapPin } from 'lucide-vue-next';

defineProps({
  pins: { type: Array, required: true },   // [{ name, x, y }]
  size: { type: Number, default: 38 },
  intro: { type: Boolean, default: false },      // animación de entrada al cargar
  introDelay: { type: Number, default: 0 }       // segundos antes del primer pin
});
</script>

<style scoped>
.pin {
  position: absolute; z-index: 2;
  display: flex; flex-direction: column; align-items: center;
  transform: translate(-50%, -100%);
  animation: bob 3.2s ease-in-out infinite;
}
.pin-icon {
  color: #fff; fill: var(--green);
  filter: drop-shadow(0 6px 8px rgba(21,128,61,.4));
}
.pin-label {
  margin-bottom: .2rem; padding: .15rem .5rem; border-radius: 999px;
  font-size: .68rem; font-weight: 700; color: var(--green-deep);
  background: rgba(255,255,255,.9); box-shadow: 0 2px 8px rgba(14,58,32,.12);
  white-space: nowrap;
}
.pin-shadow {
  width: 18px; height: 6px; border-radius: 50%; margin-top: -4px;
  background: rgba(14,58,32,.25); filter: blur(1px);
}
.pin-inner { display: flex; flex-direction: column; align-items: center }
.pin-inner.drop { opacity: 0; animation: pin-drop .7s cubic-bezier(.3, 1.6, .5, 1) both }
@keyframes pin-drop {
  0% { opacity: 0; transform: translateY(-60px) scale(.4) }
  60% { opacity: 1 }
  100% { opacity: 1; transform: none }
}
@keyframes bob { 0%, 100% { transform: translate(-50%, -100%) } 50% { transform: translate(-50%, calc(-100% - 6px)) } }

@media (prefers-reduced-motion: reduce) { .pin, .pin-inner.drop { animation: none; opacity: 1 } }
</style>
