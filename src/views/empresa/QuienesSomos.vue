<template>
  <AppNav />
  <main>
    <PageHero :eyebrow="t('pages.empresaEyebrow')" :title="t('pages.quienesSomos.title')" :subtitle="t('pages.quienesSomos.subtitle')" />

    <!-- Presentación -->
    <section class="block">
      <div class="container intro">
        <p class="intro-text reveal">{{ t('about.intro') }}</p>
        <figure class="intro-photo reveal reveal-2">
          <img src="/img/cobertura-zona-rural.jpeg" :alt="t('about.photoAlt')" loading="lazy" />
        </figure>
      </div>
    </section>

    <!-- Nuestra historia -->
    <section class="block">
      <div class="container">
        <div class="panel history reveal">
          <div class="history-head">
            <span class="eyebrow">{{ t('about.historyEyebrow') }}</span>
            <h2 class="history-title">{{ t('about.historyTitle') }}</h2>
            <p>{{ t('about.history1') }}</p>
          </div>
          <div class="history-body">
            <blockquote class="quote">
              <Quote :size="34" class="quote-mark" />
              <p>{{ t('about.quote') }}</p>
            </blockquote>
            <p>{{ t('about.history2') }}</p>
            <p>{{ t('about.history3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Misión y visión -->
    <section class="block last">
      <div class="container mv-grid">
        <article class="mv mission reveal">
          <IconTile :icon="Target" :size="58" />
          <h2>{{ t('about.missionTitle') }}</h2>
          <p>{{ t('about.mission') }}</p>
        </article>
        <article class="mv vision panel reveal reveal-2">
          <IconTile :icon="Eye" :size="58" />
          <h2>{{ t('about.visionTitle') }}</h2>
          <p>{{ t('about.vision') }}</p>
        </article>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Quote, Target, Eye } from 'lucide-vue-next';
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import IconTile from '../../components/ui/IconTile.vue';
import { useReveal } from '../../composables/useReveal.js';

const { t } = useI18n();
useReveal();
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.block.last { padding-bottom: 4rem }

/* ---------- Presentación ---------- */
.intro {
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center; gap: clamp(1.5rem, 4vw, 3.5rem);
}
.intro-text {
  margin: 0; font-size: clamp(1.15rem, 2vw, 1.45rem); line-height: 1.6; font-weight: 500;
  color: var(--ink); text-wrap: pretty;
  padding-left: 1.4rem; border-left: 4px solid var(--green);
}
.intro-photo {
  margin: 0; aspect-ratio: 4 / 3; border-radius: var(--r-xl); overflow: hidden;
  border: 6px solid #fff; box-shadow: var(--shadow-lg);
}
.intro-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 55% }

/* ---------- Historia ---------- */
.history {
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  padding: clamp(1.5rem, 4vw, 3rem);
}
.history-title {
  margin: 1rem 0 1.2rem;
  font-size: clamp(1.6rem, 3vw, 2.3rem); font-weight: 800; line-height: 1.15; letter-spacing: -.02em;
  color: var(--green-deep);
}
.history p { margin: 0 0 1rem; color: var(--ink-dim); line-height: 1.75 }
.history p:last-child { margin-bottom: 0 }

.quote {
  position: relative; margin: 0 0 1.5rem;
  padding: 1.6rem 1.6rem 1.6rem 4.2rem;
  border-radius: var(--r-md);
  background: linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.quote-mark { position: absolute; left: 1.2rem; top: 1.3rem; color: var(--green-3); fill: rgba(74,222,128,.25) }
.history .quote p {
  margin: 0; color: #fff; font-size: 1.15rem; font-weight: 700; font-style: italic; line-height: 1.45;
}

/* ---------- Misión / Visión ---------- */
.mv-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem }
.mv { padding: clamp(1.5rem, 3vw, 2.4rem); border-radius: var(--r-lg) }
.mv h2 { margin: 1.2rem 0 .8rem; font-size: 1.6rem; font-weight: 800; letter-spacing: -.02em }
.mv p { margin: 0; line-height: 1.75 }

.mission {
  color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, rgba(34,197,94,.3) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.mission h2 { color: var(--green-3) }
.mission p { color: rgba(255,255,255,.88) }
.vision h2 { color: var(--green-deep) }
.vision p { color: var(--ink-dim) }

@media (max-width: 900px) {
  .intro, .history, .mv-grid { grid-template-columns: 1fr }
}
@media (max-width: 480px) {
  .quote { padding: 1.3rem 1.2rem 1.3rem 3.4rem }
  .quote-mark { left: .9rem; top: 1.1rem }
}
</style>
