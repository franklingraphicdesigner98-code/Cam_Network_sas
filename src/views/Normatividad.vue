<template>
  <AppNav />
  <main>
    <PageHero :title="t('pages.normatividad.title')" :subtitle="t('pages.normatividad.subtitle')" />

    <section class="block">
      <div class="container">
        <p class="intro reveal">{{ t('normatividad.intro') }}</p>
        <p v-if="te('normatividad.langNote')" class="lang-note reveal">{{ t('normatividad.langNote') }}</p>

        <!-- PDFs en public/docs/normatividad/ — para agregar uno nuevo, súmalo a "docs" y a los textos en src/locales -->
        <div class="docs">
          <article v-for="(doc, i) in docs" :key="doc.key" class="doc card reveal" :class="`reveal-${i + 1}`">
            <div class="doc-icon">
              <IconTile :icon="FileText" :size="58" />
              <span class="doc-badge">PDF</span>
            </div>
            <div class="doc-body">
              <span class="doc-year">{{ doc.year }}</span>
              <h2>{{ t(`normatividad.docs.${doc.key}.title`) }}</h2>
              <p>{{ t(`normatividad.docs.${doc.key}.desc`) }}</p>
              <span class="doc-meta">{{ t('normatividad.pages', { n: doc.pages }) }} · {{ doc.size }}</span>
            </div>
            <div class="doc-actions">
              <a :href="doc.file" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
                <Eye :size="16" /> {{ t('normatividad.view') }}
              </a>
              <a :href="doc.file" :download="doc.file.split('/').pop()" class="btn btn-outline btn-sm">
                <Download :size="16" /> {{ t('normatividad.download') }}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Decreto 1524 de 2002, art. 6 num. 7: enlaces visibles para denunciar -->
    <section class="block last">
      <div class="container">
        <div class="report reveal">
          <ShieldAlert :size="40" class="report-icon" />
          <div>
            <h2>{{ t('normatividad.reportTitle') }}</h2>
            <p>{{ t('normatividad.reportText') }}</p>
            <ul>
              <li><a href="https://www.teprotejo.org" target="_blank" rel="noopener noreferrer">{{ t('normatividad.reportLinks.teprotejo') }} <ExternalLink :size="14" /></a></li>
              <li><a href="tel:141">{{ t('normatividad.reportLinks.icbf') }} <Phone :size="14" /></a></li>
              <li><a href="https://caivirtual.policia.gov.co" target="_blank" rel="noopener noreferrer">{{ t('normatividad.reportLinks.cai') }} <ExternalLink :size="14" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { FileText, Eye, Download, ShieldAlert, ExternalLink, Phone } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import IconTile from '../components/ui/IconTile.vue';
import { useReveal } from '../composables/useReveal.js';

const { t, te } = useI18n();

const docs = [
  { key: 'ley679', year: '2001', pages: 16, size: '216 KB', file: '/docs/normatividad/ley-679-de-2001.pdf' },
  { key: 'decreto1524', year: '2002', pages: 5, size: '294 KB', file: '/docs/normatividad/decreto-1524-de-2002.pdf' },
  { key: 'ley1336', year: '2009', pages: 12, size: '598 KB', file: '/docs/normatividad/ley-1336-de-2009.pdf' }
];

useReveal();
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.block.last { padding-bottom: 4rem }

.intro {
  max-width: 70ch; margin: 0 auto 1.8rem; text-align: center;
  font-size: 1.05rem; line-height: 1.7; color: var(--ink-dim);
}
.lang-note { margin: -1rem auto 1.8rem; text-align: center; font-size: .85rem; color: var(--ink-mute) }

.docs { display: flex; flex-direction: column; gap: 1rem }
.doc {
  display: grid; grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center; gap: 1.4rem;
  padding: 1.4rem 1.6rem;
}
.doc-icon { position: relative }
.doc-badge {
  position: absolute; right: -8px; bottom: -6px;
  padding: .1rem .4rem; border-radius: 6px;
  font-size: .62rem; font-weight: 800; letter-spacing: .04em;
  color: #fff; background: #dc2626; box-shadow: 0 3px 8px rgba(220,38,38,.35);
}
.doc-year {
  display: inline-block; margin-bottom: .35rem;
  font-size: .72rem; font-weight: 700; letter-spacing: .1em; color: var(--green);
}
.doc h2 { margin: 0; font-size: 1.2rem; font-weight: 800; color: var(--ink); letter-spacing: -.01em }
.doc p { margin: .4rem 0 .5rem; font-size: .9rem; line-height: 1.55; color: var(--ink-dim) }
.doc-meta { font-size: .78rem; color: var(--ink-mute) }
.doc-actions { display: flex; flex-direction: column; gap: .55rem }
.doc-actions .btn { justify-content: flex-start; white-space: nowrap }

.report {
  display: flex; align-items: flex-start; gap: 1.2rem;
  padding: clamp(1.4rem, 3vw, 2.2rem);
  border-radius: var(--r-lg); color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, rgba(34,197,94,.28) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
}
.report-icon { flex: none; color: var(--green-3) }
.report h2 { margin: 0 0 .5rem; font-size: 1.3rem; font-weight: 800 }
.report p { margin: 0 0 1rem; color: rgba(255,255,255,.85); line-height: 1.6 }
.report ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .6rem }
.report a {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .5rem .9rem; border-radius: 999px;
  font-size: .85rem; font-weight: 600; color: #fff;
  background: rgba(255,255,255,.08); border: 1px solid rgba(74,222,128,.4);
  transition: background .2s ease, border-color .2s ease;
}
.report a:hover { background: rgba(74,222,128,.16); border-color: var(--green-3) }

@media (max-width: 760px) {
  .doc { grid-template-columns: auto minmax(0, 1fr); padding: 1.2rem }
  .doc-actions { grid-column: 1 / -1; flex-direction: row; flex-wrap: wrap }
  .doc-actions .btn { flex: 1; justify-content: center }
  .report { flex-direction: column }
}
</style>
