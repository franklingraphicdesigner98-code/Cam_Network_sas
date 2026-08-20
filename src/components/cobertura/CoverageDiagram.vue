<template>
  <div class="diagram">
    <svg class="diagram-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <circle cx="50" cy="50" r="18" class="ring" />
      <circle cx="50" cy="50" r="30" class="ring" />
      <line
        v-for="n in nodes" :key="'line-' + n.name"
        :x1="50" :y1="50" :x2="n.x" :y2="n.y"
        class="spoke"
      />
      <circle
        v-for="n in nodes" :key="'dot-' + n.name"
        :cx="50 + (n.x - 50) * 0.62" :cy="50 + (n.y - 50) * 0.62"
        r="1.1" class="spoke-dot"
      />
    </svg>

    <div class="hub">
      <img src="/img/ico.png" alt="" class="hub-logo" />
      <span class="hub-text">CAM<br />NETWORK</span>
    </div>

    <div
      v-for="n in nodes" :key="n.name"
      class="node"
      :class="n.y < 50 ? 'label-above' : 'label-below'"
      :style="{ left: n.x + '%', top: n.y + '%' }"
    >
      <span class="node-label">{{ n.name }}</span>
      <span class="node-circle"><Wifi :size="18" /></span>
    </div>
  </div>
</template>

<script setup>
import { Wifi } from 'lucide-vue-next';

const townNames = [
  'Mogotes', 'San Gil', 'Cabrera', 'Barichara', 'Villanueva',
  'Valle de San José', 'Ocamonte', 'Páramo', 'Curití', 'Pinchote'
];

const radius = 38;
const nodes = townNames.map((name, i) => {
  const angle = (-90 + i * 36) * (Math.PI / 180);
  return {
    name,
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle)
  };
});
</script>

<style scoped>
.diagram {
  position: relative;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
}
.diagram-svg { position: absolute; inset: 0; width: 100%; height: 100% }
.ring { fill: none; stroke: rgba(255,255,255,.22); stroke-width: .35; stroke-dasharray: 1.4 1.6 }
.spoke { stroke: rgba(255,255,255,.35); stroke-width: .4; stroke-dasharray: 1.2 1.4 }
.spoke-dot { fill: var(--green-2) }

.hub {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: clamp(84px, 20%, 118px); aspect-ratio: 1/1; border-radius: 50%;
  background: #fff; box-shadow: var(--shadow-lg);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .25rem;
  padding: .5rem;
}
.hub-logo { width: 30%; height: auto }
.hub-text {
  font-size: clamp(.55rem, 1.6vw, .72rem); font-weight: 800; line-height: 1.15;
  color: var(--green-deep); text-align: center; letter-spacing: .02em;
}

.node {
  position: absolute; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: .35rem;
}
.node.label-above { flex-direction: column-reverse }
.node-circle {
  display: grid; place-items: center;
  width: clamp(40px, 9%, 54px); aspect-ratio: 1/1; border-radius: 50%;
  background: #fff; color: var(--green-deep);
  box-shadow: 0 8px 20px rgba(0,0,0,.25);
}
.node-label {
  color: #fff; font-size: clamp(.68rem, 1.5vw, .8rem); font-weight: 600;
  white-space: nowrap; text-shadow: 0 1px 4px rgba(0,0,0,.35);
}

@media (max-width: 560px) {
  .node-label { font-size: .62rem }
}
</style>
