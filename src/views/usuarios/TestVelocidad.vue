<template>
  <AppNav />
  <main>
    <PageHero eyebrow="Usuarios" title="Test de Velocidad" subtitle="Mide la velocidad real de tu conexión a internet." />

    <section class="s">
      <div class="container speedtest">
        <div class="gauge-wrap reveal">
          <div class="gauge" :class="{ pulsing: phase === 'ping' }" :style="{ '--pct': gaugePercent }">
            <div class="gauge-inner">
              <span class="gauge-value">{{ gaugeDisplay }}</span>
              <span class="gauge-unit">{{ gaugeUnit }}</span>
              <span class="gauge-phase">{{ phaseLabel }}</span>
            </div>
          </div>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: progress + '%' }" /></div>
        </div>

        <div class="stats reveal reveal-1">
          <div class="stat-card">
            <span class="stat-icon"><Gauge :size="20" /></span>
            <div>
              <p class="stat-label">Ping</p>
              <p class="stat-value">{{ ping !== null ? `${ping} ms` : '—' }}</p>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon"><Download :size="20" /></span>
            <div>
              <p class="stat-label">Descarga</p>
              <p class="stat-value">{{ downloadMbps !== null ? `${downloadMbps} Mbps` : '—' }}</p>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon"><Upload :size="20" /></span>
            <div>
              <p class="stat-label">Subida</p>
              <p class="stat-value">{{ uploadMbps !== null ? `${uploadMbps} Mbps` : '—' }}</p>
            </div>
          </div>
        </div>

        <div class="actions reveal reveal-2">
          <BaseButton
            v-if="phase === 'idle' || phase === 'done' || phase === 'error'"
            variant="primary"
            @click="start"
          >
            {{ phase === 'idle' ? 'Iniciar prueba' : 'Probar de nuevo' }}
          </BaseButton>
          <BaseButton v-else variant="outline" @click="cancel">Cancelar</BaseButton>
        </div>

        <p v-if="error" class="error-msg"><AlertTriangle :size="16" /> {{ error }}</p>
        <p v-else-if="server" class="server-info">
          Conectado a la red de Cloudflare en {{ server.city }}, {{ server.country }} ({{ server.colo }}) · IP pública: {{ server.ip }}
        </p>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { computed, onUnmounted } from 'vue';
import { Gauge, Download, Upload, AlertTriangle } from 'lucide-vue-next';
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import { useReveal } from '../../composables/useReveal.js';
import { useSpeedTest } from '../../composables/useSpeedTest.js';

useReveal();

const { phase, progress, ping, downloadMbps, uploadMbps, liveMbps, server, error, start, cancel } = useSpeedTest();

const phaseLabel = computed(() => ({
  idle: 'Listo para iniciar',
  ping: 'Midiendo ping...',
  download: 'Midiendo descarga...',
  upload: 'Midiendo subida...',
  done: 'Prueba completada',
  error: 'Error en la prueba'
}[phase.value]));

const gaugeUnit = computed(() => (phase.value === 'ping' ? 'ms' : 'Mbps'));

const gaugeDisplay = computed(() => {
  if (phase.value === 'ping') return ping.value ?? '…';
  if (phase.value === 'idle') return 0;
  const val = phase.value === 'done' ? downloadMbps.value : liveMbps.value;
  return val !== null ? Math.round(val * 10) / 10 : 0;
});

const gaugeMax = computed(() => {
  const v = phase.value === 'done' ? downloadMbps.value : liveMbps.value;
  return Math.max(100, Math.ceil(((v || 0) * 1.3) / 50) * 50);
});

const gaugePercent = computed(() => {
  if (phase.value === 'download' || phase.value === 'upload') {
    return Math.min(100, (liveMbps.value / gaugeMax.value) * 100);
  }
  if (phase.value === 'done') {
    return Math.min(100, (downloadMbps.value / gaugeMax.value) * 100);
  }
  return 0;
});

onUnmounted(cancel);
</script>

<style scoped>
.speedtest {
  display: flex; flex-direction: column; align-items: center; gap: 2rem;
  max-width: 560px;
}

.gauge-wrap { display: flex; flex-direction: column; align-items: center; gap: 1.2rem; width: 100% }
.gauge {
  --pct: 0;
  width: 220px; height: 220px; border-radius: 50%;
  background: conic-gradient(var(--green) calc(var(--pct) * 1%), var(--bg-2) 0);
  display: grid; place-items: center;
  transition: background .25s linear;
}
.gauge.pulsing { animation: pulse 1.1s ease-in-out infinite }
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--green-glow) }
  50% { box-shadow: 0 0 0 14px rgba(22, 163, 74, 0) }
}
.gauge-inner {
  width: 180px; height: 180px; border-radius: 50%; background: #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: var(--shadow);
}
.gauge-value { font-size: 2.4rem; font-weight: 800; color: var(--ink); line-height: 1 }
.gauge-unit { font-size: .85rem; color: var(--ink-mute); margin-top: .2rem }
.gauge-phase { font-size: .78rem; color: var(--ink-dim); margin-top: .6rem; text-align: center; padding: 0 .5rem }

.progress-bar { width: 100%; max-width: 320px; height: 6px; border-radius: 999px; background: var(--bg-2); overflow: hidden }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--green-2), var(--green-deep)); transition: width .2s linear }

.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; width: 100% }
.stat-card {
  display: flex; align-items: center; gap: .7rem;
  padding: 1rem; border-radius: var(--r-md); background: var(--bg-1); border: 1px solid var(--border);
}
.stat-icon {
  display: grid; place-items: center; flex: none; width: 38px; height: 38px; border-radius: 10px;
  background: #fff; color: var(--green-deep); border: 1px solid var(--border);
}
.stat-label { margin: 0; font-size: .75rem; color: var(--ink-mute); text-transform: uppercase; letter-spacing: .04em }
.stat-value { margin: .1rem 0 0; font-size: 1rem; font-weight: 700; color: var(--ink) }

.actions { display: flex }
.error-msg { display: flex; align-items: center; gap: .4rem; color: #dc2626; font-size: .88rem; text-align: center }
.server-info { color: var(--ink-mute); font-size: .8rem; text-align: center }

@media (max-width: 520px) {
  .stats { grid-template-columns: 1fr }
}
</style>
