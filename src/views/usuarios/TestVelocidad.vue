<template>
  <AppNav />
  <main>
    <PageHero :eyebrow="t('pages.usuariosEyebrow')" :title="t('pages.testVelocidad.title')" :subtitle="t('pages.testVelocidad.subtitle')" />

    <section class="block">
      <div class="container">
        <div class="panel tester reveal">
          <!-- Velocímetro -->
          <div class="gauge-wrap">
            <svg class="gauge" viewBox="-6 -8 252 218" aria-hidden="true">
              <defs>
                <linearGradient id="gauge-grad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stop-color="#4ade80" />
                  <stop offset="100%" stop-color="#15803d" />
                </linearGradient>
              </defs>
              <path :d="arcPath" class="track" />
              <path
                :d="arcPath" class="fill" :class="phase"
                :stroke-dasharray="`${ARC_LEN * fraction(display)} ${ARC_LEN}`"
              />
              <g v-for="tick in ticks" :key="tick.v">
                <line :x1="tick.x1" :y1="tick.y1" :x2="tick.x2" :y2="tick.y2" class="tick" />
                <text :x="tick.tx" :y="tick.ty" class="tick-label">{{ tick.v }}</text>
              </g>
              <g v-if="phase !== 'idle'" :transform="`rotate(${needleAngle} ${CX} ${CY})`">
                <line :x1="CX" :y1="CY" :x2="CX + R - 18" :y2="CY" class="needle" />
              </g>
              <circle v-if="phase !== 'idle'" :cx="CX" :cy="CY" r="7" class="hub" />
            </svg>

            <button v-if="phase === 'idle'" type="button" class="go" @click="start">
              {{ t('speed.start') }}
            </button>
            <div v-else class="readout" aria-live="polite">
              <span class="readout-value">{{ formatMbps(display) }}</span>
              <span class="readout-unit">Mbps</span>
            </div>
          </div>

          <p class="phase-label" :class="{ error: phase === 'error' }">
            <span v-if="running" class="pulse" />{{ t(`speed.phases.${phase}`) }}
          </p>
          <p v-if="phase === 'error'" class="error-text">{{ t('speed.errorText') }}</p>
          <button v-if="phase === 'done' || phase === 'error'" type="button" class="btn btn-primary btn-sm again" @click="start">
            <RotateCcw :size="16" /> {{ t('speed.again') }}
          </button>

          <!-- Resultados -->
          <div class="results">
            <div v-for="m in metrics" :key="m.key" class="metric" :class="{ active: m.active }">
              <span class="metric-icon"><component :is="m.icon" :size="18" /></span>
              <span class="metric-label">{{ t(`speed.${m.key}`) }}</span>
              <span class="metric-value">
                {{ m.value ?? '—' }}<small v-if="m.value != null">{{ m.unit }}</small>
              </span>
            </div>
          </div>

          <p class="note"><Info :size="14" /> {{ t('speed.note') }}</p>
        </div>
      </div>
    </section>

    <section class="block last">
      <div class="container side-grid">
        <div class="panel tips reveal">
          <h2>{{ t('speed.tipsTitle') }}</h2>
          <ul>
            <li v-for="(tip, i) in tm('speed.tips')" :key="i"><Check :size="18" />{{ rt(tip) }}</li>
          </ul>
        </div>
        <div class="help reveal reveal-2">
          <h2>{{ t('speed.helpTitle') }}</h2>
          <p>{{ t('speed.helpText') }}</p>
          <div class="help-actions">
            <BaseButton :to="{ name: 'pqrs' }" variant="glass" class="btn-sm">{{ t('speed.ctaPqrs') }}</BaseButton>
            <BaseButton :to="{ name: 'contacto' }" variant="primary" class="btn-sm">{{ t('speed.ctaContact') }}</BaseButton>
          </div>
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowDown, ArrowUp, Activity, Waves, Check, Info, RotateCcw } from 'lucide-vue-next';
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import { useReveal } from '../../composables/useReveal.js';

const { t, tm, rt } = useI18n();

// ---------- Geometría del velocímetro (arco de 270°, escala logarítmica 0–1000 Mbps) ----------
const CX = 120, CY = 118, R = 96;
const START = 135, SWEEP = 270, MAX_MBPS = 1000;
const ARC_LEN = (2 * Math.PI * R) * (SWEEP / 360);
const rad = (deg) => (deg * Math.PI) / 180;
const point = (deg, r = R) => [CX + r * Math.cos(rad(deg)), CY + r * Math.sin(rad(deg))];
const [sx, sy] = point(START), [ex, ey] = point(START + SWEEP);
const arcPath = `M ${sx} ${sy} A ${R} ${R} 0 1 1 ${ex} ${ey}`;
const fraction = (mbps) => Math.min(1, Math.log10(1 + Math.max(0, mbps)) / Math.log10(1 + MAX_MBPS));
const ticks = [0, 5, 10, 50, 100, 250, 500, 1000].map((v) => {
  const a = START + SWEEP * fraction(v);
  const [x1, y1] = point(a, R - 13), [x2, y2] = point(a, R - 7), [tx, ty] = point(a, R + 19);
  return { v, x1, y1, x2, y2, tx, ty: ty + 3 };
});

// ---------- Estado de la prueba ----------
const phase = ref('idle');            // idle | latency | download | upload | done | error
const target = ref(0);                // Mbps hacia donde se mueve la aguja
const display = ref(0);               // valor animado que se muestra
const download = ref(null), upload = ref(null), ping = ref(null), jitter = ref(null);
const running = computed(() => ['latency', 'download', 'upload'].includes(phase.value));
const needleAngle = computed(() => START + SWEEP * fraction(display.value));

const formatMbps = (v) => (v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2));
const metrics = computed(() => [
  { key: 'download', icon: ArrowDown, unit: ' Mbps', value: download.value != null ? formatMbps(download.value) : null, active: phase.value === 'download' },
  { key: 'upload', icon: ArrowUp, unit: ' Mbps', value: upload.value != null ? formatMbps(upload.value) : null, active: phase.value === 'upload' },
  { key: 'ping', icon: Activity, unit: ' ms', value: ping.value != null ? Math.round(ping.value) : null, active: phase.value === 'latency' },
  { key: 'jitter', icon: Waves, unit: ' ms', value: jitter.value != null ? jitter.value.toFixed(1) : null, active: phase.value === 'latency' }
]);
// Animación suave de la aguja
let raf = null;
function animate() {
  display.value += (target.value - display.value) * 0.12;
  if (Math.abs(target.value - display.value) < 0.01) display.value = target.value;
  raf = requestAnimationFrame(animate);
}

// ---------- Motor de medición (@cloudflare/speedtest, solo en el navegador) ----------
let engine = null;
const lastBps = (points) => (points.length ? points[points.length - 1].bps / 1e6 : 0);

async function start() {
  engine?.pause();
  download.value = upload.value = ping.value = jitter.value = null;
  target.value = 0;
  phase.value = 'latency';
  if (!raf) animate();

  const { default: SpeedTest } = await import('@cloudflare/speedtest');
  engine = new SpeedTest({
    autoStart: false,
    logAimApiUrl: null, // no enviar resultados a Cloudflare
    // Configuración por defecto sin pérdida de paquetes (requiere TURN) ni descargas de 100 MB
    measurements: [
      { type: 'latency', numPackets: 1 },
      { type: 'download', bytes: 1e5, count: 1, bypassMinDuration: true },
      { type: 'latency', numPackets: 20 },
      { type: 'download', bytes: 1e5, count: 9 },
      { type: 'download', bytes: 1e6, count: 8 },
      { type: 'upload', bytes: 1e5, count: 8 },
      { type: 'upload', bytes: 1e6, count: 6 },
      { type: 'download', bytes: 1e7, count: 6 },
      { type: 'upload', bytes: 1e7, count: 4 },
      { type: 'download', bytes: 2.5e7, count: 4 },
      { type: 'upload', bytes: 2.5e7, count: 4 }
    ]
  });
  const results = () => engine.results;

  engine.onPhaseChange = ({ measurement }) => {
    if (['latency', 'download', 'upload'].includes(measurement.type)) phase.value = measurement.type;
    if (measurement.type === 'latency') target.value = 0;
  };
  engine.onResultsChange = ({ type }) => {
    const r = results();
    if (type === 'download') {
      target.value = lastBps(r.getDownloadBandwidthPoints());
      const bw = r.getDownloadBandwidth(); if (bw) download.value = bw / 1e6;
    } else if (type === 'upload') {
      target.value = lastBps(r.getUploadBandwidthPoints());
      const bw = r.getUploadBandwidth(); if (bw) upload.value = bw / 1e6;
    } else if (type === 'latency') {
      ping.value = r.getUnloadedLatency() ?? ping.value;
      jitter.value = r.getUnloadedJitter() ?? jitter.value;
    }
  };
  engine.onFinish = (r) => {
    const d = r.getDownloadBandwidth(), u = r.getUploadBandwidth();
    if (d) download.value = d / 1e6;
    if (u) upload.value = u / 1e6;
    ping.value = r.getUnloadedLatency() ?? ping.value;
    jitter.value = r.getUnloadedJitter() ?? jitter.value;
    target.value = download.value ?? 0;
    phase.value = 'done';
  };
  engine.onError = () => {
    engine?.pause();
    // si ya se midieron descarga y subida, mostrar esos resultados en vez de un error
    const complete = download.value != null && upload.value != null;
    target.value = complete ? download.value : 0;
    phase.value = complete ? 'done' : 'error';
  };
  engine.play();
}

onBeforeUnmount(() => {
  engine?.pause();
  cancelAnimationFrame(raf);
});

useReveal();
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.block.last { padding-bottom: 4rem }

.tester {
  max-width: 820px; margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2.6rem);
  display: flex; flex-direction: column; align-items: center; text-align: center;
}

/* ---------- Velocímetro ---------- */
.gauge-wrap { position: relative; width: min(100%, 420px) }
.gauge { width: 100%; height: auto; display: block; overflow: visible }
.track { fill: none; stroke: var(--bg-2); stroke-width: 16; stroke-linecap: round }
.fill {
  fill: none; stroke: url(#gauge-grad); stroke-width: 16; stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(34,197,94,.45));
}
.fill.upload { stroke: #22c55e }
.tick { stroke: #b7c9bd; stroke-width: 1.5 }
.tick-label { font-size: 9px; font-weight: 600; fill: var(--ink-mute); text-anchor: middle }
.needle { stroke: var(--forest); stroke-width: 4; stroke-linecap: round }
.hub { fill: var(--forest); stroke: #fff; stroke-width: 3 }

.go {
  position: absolute; left: 50%; top: 56%; transform: translate(-50%, -50%);
  width: 42%; aspect-ratio: 1; border-radius: 50%;
  font-size: clamp(1.1rem, 3.4vw, 1.5rem); font-weight: 800; letter-spacing: .06em; text-transform: uppercase;
  color: #fff;
  background: linear-gradient(150deg, #4ade80 0%, #16a34a 45%, #0f6b32 100%);
  box-shadow: inset 0 3px 0 rgba(255,255,255,.4), 0 0 0 10px rgba(22,163,74,.12), 0 18px 40px rgba(21,128,61,.4);
  transition: transform .2s ease, box-shadow .2s ease;
}
.go:hover { transform: translate(-50%, -50%) scale(1.05); box-shadow: inset 0 3px 0 rgba(255,255,255,.4), 0 0 0 16px rgba(22,163,74,.14), 0 22px 46px rgba(21,128,61,.45) }

.readout {
  position: absolute; left: 50%; top: 84%; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; line-height: 1;
}
.readout-value { font-size: clamp(2.2rem, 7vw, 3.2rem); font-weight: 800; letter-spacing: -.03em; color: var(--ink); font-variant-numeric: tabular-nums }
.readout-unit { margin-top: .3rem; font-size: .85rem; font-weight: 600; color: var(--ink-mute) }

.phase-label {
  display: inline-flex; align-items: center; gap: .5rem;
  margin: 1.6rem 0 0; font-weight: 700; color: var(--green-deep);
}
.phase-label.error { color: #b91c1c }
.pulse { width: 9px; height: 9px; border-radius: 50%; background: var(--green); animation: pulse 1.2s ease-in-out infinite }
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: .35; transform: scale(.7) } }
.error-text { margin: .4rem 0 0; color: var(--ink-dim); font-size: .9rem }
.again { margin-top: 1rem }

/* ---------- Resultados ---------- */
.results {
  width: 100%; margin-top: 1.8rem;
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .8rem;
}
.metric {
  display: flex; flex-direction: column; align-items: center; gap: .35rem;
  padding: 1rem .6rem; border-radius: var(--r-md);
  background: var(--bg-1); border: 1px solid var(--border);
  transition: border-color .25s ease, background .25s ease, box-shadow .25s ease;
}
.metric.active { border-color: rgba(22,163,74,.45); background: var(--green-soft); box-shadow: 0 0 0 4px rgba(22,163,74,.08) }
.metric-icon {
  display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px;
  color: #fff; background: linear-gradient(150deg, #4ade80 0%, #16a34a 50%, #0f6b32 100%);
}
.metric-label { font-size: .78rem; font-weight: 600; color: var(--ink-dim) }
.metric-value { font-size: 1.35rem; font-weight: 800; color: var(--ink); font-variant-numeric: tabular-nums }
.metric-value small { font-size: .75rem; font-weight: 600; color: var(--ink-mute) }

.note {
  display: inline-flex; align-items: center; gap: .4rem;
  margin: 1.6rem 0 0; font-size: .78rem; color: var(--ink-mute);
}

/* ---------- Consejos / ayuda ---------- */
.side-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 1.25rem; max-width: 820px }
.tips { padding: 1.6rem 1.8rem }
.tips h2, .help h2 { margin: 0 0 .9rem; font-size: 1.15rem; font-weight: 800 }
.tips h2 { color: var(--green-deep) }
.tips ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .6rem }
.tips li { display: flex; gap: .55rem; font-size: .9rem; line-height: 1.45; color: var(--ink-dim) }
.tips li :deep(svg) { flex: none; color: var(--green); margin-top: 1px }
.help {
  padding: 1.6rem 1.8rem; border-radius: var(--r-lg); color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, rgba(34,197,94,.28) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.help p { margin: 0 0 1.2rem; color: rgba(255,255,255,.85); line-height: 1.55 }
.help-actions { display: flex; flex-wrap: wrap; gap: .6rem }

@media (max-width: 720px) {
  .results { grid-template-columns: repeat(2, minmax(0, 1fr)) }
  .side-grid { grid-template-columns: 1fr }
}
</style>
