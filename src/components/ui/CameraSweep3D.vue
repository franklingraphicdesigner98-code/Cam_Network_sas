<template>
  <!-- Cámara 3D (public/img/Rotacion/Camara.glb) que barre de lado a lado, con resplandores rojo y azul detrás.
       De momento NO se usa (la página usa CameraSweep.vue con las fotos); para probarla, cámbiala en ServicioCamaras.vue -->
  <div
    ref="root" class="cam-sweep" :class="{ still, ready }"
    role="img" :aria-label="label" :style="{ '--glow-base': INTENSIDAD_LUCES }"
  >
    <div ref="glows" class="glows" aria-hidden="true">
      <span class="glow red" />
      <span class="glow blue" />
    </div>
    <canvas ref="canvas" class="cam" aria-hidden="true" />
  </div>
</template>

<script setup>
// ================= Ajustes =================
const MODELO = '/img/Rotacion/Camara.glb';
// El archivo trae una segunda copia incompleta de la cámara a un lado: estas piezas no se muestran
const PIEZAS_OCULTAS = ['Cube002', 'Cube003', 'Cube005'];
const GIRO_MAX = 55;              // grados hacia cada lado desde el frente
const BARRIDO_MS = 3000;          // lo que tarda en ir de un extremo al otro
const PAUSA_MS = 400;             // pausa en cada extremo
const DESPLAZAMIENTO_LUCES = 9;   // cuánto se corren los resplandores con la mirada (% del ancho del visual)
const INTENSIDAD_LUCES = 0.85;    // 0 a 1 (en celular se reduce un 30%)
const COLOR_CUERPO = 0xe8eae6;    // blanco del cuerpo (el modelo no trae color propio)
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

let THREE = null, renderer = null, scene = null, camera = null, model = null, envTex = null;
let raf = null, io = null, visible = false, alive = true;
let elapsed = 0, lastNow = 0, lastAngle = null;
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

// ---------- Escena 3D ----------
function ajustarTamano() {
  if (!renderer) return;
  const w = canvas.value.clientWidth, h = canvas.value.clientHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2));
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  lastAngle = null;
}
function render(angle) {
  if (angle === lastAngle) return;              // no se redibuja si la cámara no giró (p. ej. en las pausas)
  model.rotation.y = angle;
  renderer.render(scene, camera);
  lastAngle = angle;
}
function moverLuces(u) {
  // u = 0 (girada a la izquierda) … 1 (a la derecha); al pasar por el frente quedan centradas
  const x = (2 * u - 1) * DESPLAZAMIENTO_LUCES;
  glows.value.style.transform = `translateX(${x.toFixed(2)}%)`;
}
const anguloDe = (u) => THREE.MathUtils.degToRad((2 * u - 1) * GIRO_MAX);

async function montarEscena() {
  const [three, { GLTFLoader }, { RoomEnvironment }] = await Promise.all([
    import('three'),
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/environments/RoomEnvironment.js')
  ]);
  THREE = three;
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;   // evita que el blanco se "queme" y se pierdan las caras
  renderer.toneMappingExposure = 0.95;
  scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;   // luz de estudio suave
  pmrem.dispose();
  scene.environment = envTex;
  scene.environmentIntensity = 0.7;
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 6, 5);
  scene.add(key);

  const gltf = await new GLTFLoader().loadAsync(MODELO);
  model = gltf.scene;
  PIEZAS_OCULTAS.forEach((n) => model.getObjectByName(n)?.removeFromParent());
  const cuerpo = new THREE.MeshStandardMaterial({ color: COLOR_CUERPO, roughness: 0.45, metalness: 0 });
  model.traverse((o) => {
    // las piezas sin material propio salen como metal gris: se pasan a plástico blanco
    if (o.isMesh && !o.material.name) o.material = cuerpo;
  });
  // centrar el modelo en su eje de giro y encuadrarlo
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
  const pivot = new THREE.Group();
  pivot.add(model);
  model = pivot;
  scene.add(model);
  const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
  camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const dist = radius / Math.sin(THREE.MathUtils.degToRad(15)) * 0.98;
  camera.position.set(0, radius * 0.35, dist);
  camera.lookAt(0, -radius * 0.05, 0);
  ajustarTamano();
}

// ---------- Un solo rAF, solo con el visual en pantalla ----------
function tick(now) {
  elapsed += Math.min(now - lastNow, 100);    // al volver a la pestaña no da un salto
  lastNow = now;
  const u = posicion(elapsed);
  render(anguloDe(u));
  moverLuces(u);
  raf = visible ? requestAnimationFrame(tick) : null;
}
function arrancar() {
  if (raf || still.value || !model) return;
  lastNow = performance.now();
  raf = requestAnimationFrame(tick);
}
const onResize = () => { if (!renderer) return; ajustarTamano(); render(model.rotation.y); };

onMounted(async () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  still.value = reduced || saveData;

  try {
    await montarEscena();
  } catch (e) {
    console.warn(`[CameraSweep] No se pudo mostrar el modelo 3D (${MODELO}):`, e);
    return;
  }
  if (!alive) { liberar(); return; }
  window.addEventListener('resize', onResize, { passive: true });

  // sin movimiento: de frente y quieta; si no, empieza girada a un lado y anima al verse
  const u0 = still.value ? 0.5 : 0;
  render(anguloDe(u0));
  moverLuces(u0);
  ready.value = true;
  if (still.value) return;
  io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) arrancar();
  });
  io.observe(root.value);
});

function liberar() {
  scene?.traverse((o) => {
    if (o.isMesh) {
      o.geometry.dispose();
      [].concat(o.material).forEach((m) => m.dispose());
    }
  });
  envTex?.dispose();
  renderer?.dispose();
}
onBeforeUnmount(() => {
  alive = false;
  cancelAnimationFrame(raf);
  io?.disconnect();
  window.removeEventListener('resize', onResize);
  liberar();
});
</script>

<style scoped>
.cam-sweep {
  position: relative;
  width: min(100%, 400px); aspect-ratio: 1 / 1;
  margin: 0 auto; justify-self: center;
  --glow: var(--glow-base, .85);
}
/* la cámara: solo gira (en el canvas) + una respiración muy leve */
.cam {
  position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%;
  opacity: 0; transition: opacity .6s ease;
  animation: breathe 4s ease-in-out infinite;
}
.ready .cam { opacity: 1 }

/* resplandores detrás del domo */
.glows { position: absolute; inset: 0; z-index: 0; pointer-events: none; will-change: transform }
.glow {
  position: absolute; top: 66%; width: 70%; aspect-ratio: 1; border-radius: 50%;
  translate: -50% -50%; filter: blur(28px);
  animation: pulse 2.5s ease-in-out infinite;
}
.glow.red { left: 40%; background: radial-gradient(circle, rgba(239, 68, 68, calc(.6 * var(--glow))) 0%, rgba(239, 68, 68, 0) 68%) }
.glow.blue { left: 60%; background: radial-gradient(circle, rgba(59, 130, 246, calc(.6 * var(--glow))) 0%, rgba(59, 130, 246, 0) 68%); animation-delay: -1.25s }

@keyframes pulse {
  0%, 100% { opacity: .5; transform: scale(.92) }
  50% { opacity: 1; transform: scale(1.06) }
}
@keyframes breathe {
  0%, 100% { transform: scale(1) }
  50% { transform: scale(1.01) }
}

/* sin movimiento: cámara fija y luces quietas y tenues */
.still .cam { animation: none }
.still .glow { animation: none; opacity: .45 }

@media (max-width: 767px) {
  .cam-sweep { width: min(66vw, 260px); --glow: calc(var(--glow-base, .85) * .7) }
  .glow { filter: blur(22px) }
}
@media (prefers-reduced-motion: reduce) {
  .cam, .glow { animation: none }
}
</style>
