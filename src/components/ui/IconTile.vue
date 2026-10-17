<template>
  <span class="icon-tile" :class="[`is-${shape}`, `is-${tone}`]" :style="{ '--s': size + 'px' }" aria-hidden="true">
    <component :is="icon" :size="Math.round(size * 0.48)" :stroke-width="2.1" />
  </span>
</template>

<script setup>
// Ícono con volumen (degradado + brillo + sombra) que reemplaza las
// ilustraciones 3D del diseño de referencia.
defineProps({
  icon: { type: [Object, Function], required: true },
  size: { type: Number, default: 64 },
  shape: { type: String, default: 'square' }, // square | circle
  tone: { type: String, default: 'solid' }    // solid (verde) | soft (fondo claro)
});
</script>

<style scoped>
.icon-tile {
  position: relative; flex: none;
  display: grid; place-items: center;
  width: var(--s); height: var(--s);
  border-radius: calc(var(--s) * .3);
}
.icon-tile.is-circle { border-radius: 50% }

.icon-tile.is-solid {
  color: #fff;
  background: linear-gradient(150deg, #4ade80 0%, #16a34a 45%, #0f6b32 100%);
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.45),
    inset 0 -4px 10px rgba(0,0,0,.18),
    0 10px 22px rgba(21,128,61,.32);
}
.icon-tile.is-solid::after {
  content: ""; position: absolute; inset: 6% 14% auto; height: 38%;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255,255,255,.4), rgba(255,255,255,0));
  pointer-events: none;
}
.icon-tile.is-solid :deep(svg) { filter: drop-shadow(0 2px 3px rgba(0,0,0,.2)); position: relative; z-index: 1 }

.icon-tile.is-soft {
  color: var(--green-deep);
  background: linear-gradient(150deg, #ffffff 0%, #e6f6eb 100%);
  border: 1px solid rgba(22,163,74,.14);
  box-shadow: inset 0 2px 0 #fff, 0 10px 22px rgba(14,58,32,.1);
}
</style>
