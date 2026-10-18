<template>
  <section class="block">
    <div class="container">
      <div class="stats reveal">
        <h2>{{ t('stats.title') }}</h2>
        <div class="stats-grid">
          <router-link v-for="s in stats" :key="s.key" :to="s.to" class="stat">
            <IconTile :icon="s.icon" :size="60" />
            <div>
              <h3>{{ t(`stats.items.${s.key}.title`) }}</h3>
              <p class="stat-sub">{{ t(`stats.items.${s.key}.sub`) }}</p>
            </div>
            <p class="stat-value">
              <CountUp :value="Number(tm(`stats.items.${s.key}.value`))" prefix="+" />
              <span class="stat-label">{{ t(`stats.items.${s.key}.label`) }}</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Cifras de clientes (textos y valores en src/locales/*.js → stats)
import { useI18n } from 'vue-i18n';
import { Wifi, Cctv } from 'lucide-vue-next';
import IconTile from '../ui/IconTile.vue';
import CountUp from '../ui/CountUp.vue';

const { t, tm } = useI18n();
const stats = [
  { key: 'internet', icon: Wifi, to: { name: 'servicio-internet' } },
  { key: 'camaras', icon: Cctv, to: { name: 'servicio-camaras' } }
];
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.stats {
  padding: clamp(1.6rem, 4vw, 2.4rem); border-radius: var(--r-lg); color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, rgba(34,197,94,.3) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.stats h2 { margin: 0 0 1.4rem; font-size: clamp(1.3rem, 2.4vw, 1.7rem); font-weight: 800; letter-spacing: -.02em }
.stats-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem }
.stat { min-width: 0 }
.stat {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.3rem 1.4rem; border-radius: var(--r-md);
  background: rgba(255,255,255,.06); border: 1px solid rgba(74,222,128,.25);
  transition: background .2s ease, border-color .2s ease;
}
.stat:hover { background: rgba(74,222,128,.12); border-color: rgba(74,222,128,.5) }
.stat h3 { margin: 0; font-size: 1.15rem; font-weight: 800 }
.stat-sub { margin: .2rem 0 0; font-size: .88rem; color: var(--green-3) }
.stat-value {
  margin: 0 0 0 auto; text-align: right; line-height: 1;
  font-size: clamp(2.6rem, 5.5vw, 3.8rem); font-weight: 800; letter-spacing: -.03em;
  font-variant-numeric: tabular-nums; min-width: 5.2ch;
}
.stat-label { display: block; margin-top: .3rem; font-size: .95rem; font-weight: 600; letter-spacing: 0; color: rgba(255,255,255,.75) }

/* en pantallas medianas y pequeñas el número va debajo del título para que no se salga */
@media (max-width: 1100px) {
  .stat { flex-wrap: wrap }
  .stat-value { margin-left: 0; text-align: left; width: 100%; min-width: 0 }
}
@media (max-width: 760px) {
  .stats-grid { grid-template-columns: 1fr }
}
</style>
