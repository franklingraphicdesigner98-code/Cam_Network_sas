<template>
  <AppNav />
  <main>
    <PageHero :eyebrow="t('pages.empresaEyebrow')" :title="t('pages.nuestroEquipo.title')" :subtitle="t('pages.nuestroEquipo.subtitle')" />

    <!-- Foto del equipo -->
    <section class="block">
      <div class="container">
        <figure class="team-photo reveal">
          <img src="/img/equipo/equipo-oficina-grupo.webp" :alt="t('equipo.photoAlt')" width="1400" height="770" fetchpriority="high" />
        </figure>
      </div>
    </section>

    <!-- Quiénes somos como equipo -->
    <section class="block">
      <div class="container">
        <div class="panel intro reveal">
          <h2>{{ t('equipo.introTitle') }}</h2>
          <p v-for="(p, i) in tm('equipo.intro')" :key="i">{{ rt(p) }}</p>
        </div>
      </div>
    </section>

    <!-- Lo que nos caracteriza -->
    <section class="block last">
      <div class="container">
        <h2 class="values-title reveal">{{ t('equipo.valuesTitle') }}</h2>
        <div class="values">
          <article v-for="(v, i) in tm('equipo.values')" :key="i" class="value card reveal" :class="`reveal-${i + 1}`">
            <IconTile :icon="valueIcons[i]" :size="52" />
            <h3>{{ rt(v.title) }}</h3>
            <p>{{ rt(v.text) }}</p>
          </article>
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { HeartHandshake, Mountain, Wrench, ShieldCheck } from 'lucide-vue-next';
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import IconTile from '../../components/ui/IconTile.vue';
import { useReveal } from '../../composables/useReveal.js';

const { t, tm, rt } = useI18n();
// Mismo orden que equipo.values en src/locales/*.js
const valueIcons = [HeartHandshake, Mountain, Wrench, ShieldCheck];

useReveal();
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.block.last { padding-bottom: 4rem }

.team-photo {
  margin: 0; aspect-ratio: 20 / 11; border-radius: var(--r-xl); overflow: hidden;
  border: 6px solid #fff; box-shadow: var(--shadow-lg); background: var(--bg-2);
}
.team-photo img { width: 100%; height: 100%; object-fit: cover }

.intro { max-width: 860px; margin: 0 auto; padding: clamp(1.6rem, 4vw, 2.6rem) }
.intro h2 { margin: 0 0 1rem; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; letter-spacing: -.02em; color: var(--green-deep) }
.intro p { margin: 0 0 1rem; font-size: 1.05rem; line-height: 1.8; color: var(--ink-dim) }
.intro p:first-of-type { font-size: 1.15rem; font-weight: 500; color: var(--ink) }
.intro p:last-child { margin-bottom: 0 }

.values-title { margin: 0 0 1.2rem; font-size: clamp(1.4rem, 2.6vw, 1.9rem); font-weight: 800; letter-spacing: -.02em; color: var(--green-deep); text-align: center }
.values { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem }
.value { padding: 1.5rem }
.value h3 { margin: 1rem 0 .4rem; font-size: 1.1rem; font-weight: 800; color: var(--ink) }
.value p { margin: 0; font-size: .92rem; line-height: 1.55; color: var(--ink-dim) }

@media (max-width: 960px) { .values { grid-template-columns: 1fr 1fr } }
@media (max-width: 520px) {
  .values { grid-template-columns: 1fr }
  .team-photo { aspect-ratio: 4 / 3 }
  .team-photo img { object-position: 25% 50% }
}
</style>
