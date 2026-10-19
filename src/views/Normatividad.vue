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

    <!-- Protección infantil — Decreto 1524 de 2002, art. 6 (compilado en el Decreto 1078 de 2015, art. 2.2.10.3.1).
         Enlazada desde el footer con /normatividad#proteccion-infantil -->
    <section id="proteccion-infantil" class="block last">
      <div class="container">
        <div class="report reveal">
          <!-- Numeral 7: título visible en la página; los canales y la información se abren en un modal -->
          <div class="report-head">
            <ShieldAlert :size="22" class="report-icon" aria-hidden="true" />
            <div>
              <h2>{{ t('normatividad.reportTitle') }}</h2>
              <p>{{ t('normatividad.reportText') }}</p>
            </div>
            <button ref="openBtn" type="button" class="btn btn-primary btn-sm report-btn" aria-haspopup="dialog" @click="openModal">
              <ShieldAlert :size="16" aria-hidden="true" /> {{ t('normatividad.reportButton') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de denuncia -->
    <Teleport to="body">
      <div v-if="modalOpen" class="modal-backdrop" @click.self="closeModal">
        <div
          ref="dialog" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"
          tabindex="-1" @keydown.esc="closeModal" @keydown.tab="trapFocus"
        >
          <div class="modal-head">
            <h2 id="modal-title"><ShieldAlert :size="20" aria-hidden="true" /> {{ t('normatividad.reportTitle') }}</h2>
            <button type="button" class="modal-close" :aria-label="t('normatividad.close')" @click="closeModal"><X :size="20" /></button>
          </div>
          <ul class="channels">
            <li v-for="c in channels" :key="c.key" class="channel">
              <div>
                <strong>{{ t(`normatividad.channels.${c.key}.name`) }}</strong>
                <span class="channel-desc">{{ t(`normatividad.channels.${c.key}.desc`) }}</span>
              </div>
              <a v-if="c.tel" :href="'tel:' + c.tel" class="channel-link">
                <Phone :size="13" aria-hidden="true" /> {{ c.tel }}
              </a>
              <a v-else :href="c.url" target="_blank" rel="noopener noreferrer" class="channel-link">
                {{ c.label }} <ExternalLink :size="12" aria-hidden="true" />
                <span class="sr-only">{{ t('normatividad.openNewTab') }}</span>
              </a>
            </li>
          </ul>

          <!-- Numeral 6: información sobre la Ley 679 de 2001 -->
          <div class="report-info">
            <h3>{{ t('normatividad.lawTitle') }}</h3>
            <p>{{ t('normatividad.lawText') }}</p>
          </div>

          <!-- Numeral 4: mecanismos de filtrado -->
          <div class="report-info">
            <h3>{{ t('normatividad.filterTitle') }}</h3>
            <p>{{ t('normatividad.filterText') }}</p>
            <!-- TODO: Cam Network debe entregar la información real sobre los mecanismos de filtrado que ofrece o recomienda a sus usuarios, los criterios de clasificación y cómo se activan en los equipos. No inventar este contenido. -->
          </div>
        </div>
      </div>
    </Teleport>
  </main>
  <AppFooter />
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { FileText, Eye, Download, ShieldAlert, ExternalLink, Phone, X } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
import IconTile from '../components/ui/IconTile.vue';
import { useReveal } from '../composables/useReveal.js';

const { t, te } = useI18n();
const route = useRoute();

// ---------- Modal de denuncia ----------
const modalOpen = ref(false);
const dialog = ref(null);
const openBtn = ref(null);
async function openModal() {
  modalOpen.value = true;
  document.body.style.overflow = 'hidden';
  await nextTick();
  dialog.value?.focus();
}
function closeModal() {
  modalOpen.value = false;
  document.body.style.overflow = '';
  openBtn.value?.focus();
}
// mantiene el foco del teclado dentro del modal
function trapFocus(e) {
  const items = dialog.value.querySelectorAll('a[href], button');
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
// el enlace del footer (/normatividad#proteccion-infantil) abre el modal directamente
onMounted(() => { if (route.hash === '#proteccion-infantil') openModal(); });
onBeforeUnmount(() => { document.body.style.overflow = ''; });

// Canales de denuncia (Decreto 1524 de 2002, art. 6 num. 7)
const channels = [
  { key: 'teprotejo', url: 'https://www.teprotejo.org', label: 'teprotejo.org' },
  { key: 'adenunciar', url: 'https://adenunciar.policia.gov.co/adenunciar/default.aspx', label: 'adenunciar.policia.gov.co' },
  { key: 'icbf', tel: '141' },
  { key: 'cai', url: 'https://caivirtual.policia.gov.co', label: 'caivirtual.policia.gov.co' }
];

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

/* Recuadro discreto: visible pero sin protagonismo en la página */
.report {
  max-width: 900px; margin: 0 auto;
  padding: 1.1rem 1.2rem;
  border-radius: var(--r-md);
  background: #fff; border: 1px solid var(--border);
  font-size: .84rem; color: var(--ink-dim);
}
.report-head { display: flex; flex-wrap: wrap; gap: .6rem; align-items: center }
.report-head > div { flex: 1 1 18rem }
.report-btn { flex: none }
.report-btn:focus-visible { outline: 3px solid var(--green-3); outline-offset: 2px }

.modal-backdrop {
  position: fixed; inset: 0; z-index: 10000;   /* por encima del botón flotante de WhatsApp */
  display: grid; place-items: center; padding: 1rem;
  background: rgba(6, 26, 14, .6); backdrop-filter: blur(3px);
}
.modal {
  width: 100%; max-width: 720px; max-height: calc(100dvh - 2rem); overflow-y: auto;
  padding: 1.2rem 1.3rem 1.4rem; border-radius: var(--r-lg);
  background: #fff; box-shadow: var(--shadow-lg);
  font-size: .86rem; color: var(--ink-dim); outline: none;
}
.modal-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem }
.modal-head h2 { display: flex; align-items: center; gap: .5rem; margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--ink) }
.modal-head h2 :deep(svg) { color: var(--green); flex: none }
.modal-close {
  flex: none; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%;
  color: var(--ink); background: var(--bg-1); border: 1px solid var(--border);
}
.modal-close:hover { background: var(--green-soft) }
.modal-close:focus-visible { outline: 2px solid var(--green); outline-offset: 2px }
.report-icon { flex: none; color: var(--green); margin-top: 1px }
.report h2 { margin: 0 0 .2rem; font-size: .98rem; font-weight: 800; color: var(--ink) }
.report p { margin: 0; line-height: 1.5 }

.channels { list-style: none; margin: .8rem 0 0; padding: 0; display: grid; grid-template-columns: 1fr; gap: .1rem }
.channel {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: .15rem .5rem;
  padding: .45rem 0; border-top: 1px solid var(--bg-2);
}
.channel > div { flex: 1 1 14rem; min-width: 0 }
.channel strong { font-size: .86rem; color: var(--ink) }
.channel-desc { margin-left: .3rem; font-size: .8rem; color: var(--ink-mute) }
.channel-link {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .8rem; font-weight: 700; color: var(--green-deep); overflow-wrap: anywhere;
  text-decoration: underline; text-underline-offset: 2px;
}
.channel-link:hover { color: var(--green) }
.channel-link:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; border-radius: 3px }

.report-info { margin-top: .7rem; padding-top: .7rem; border-top: 1px solid var(--bg-2) }
.report-info h3 { display: inline; margin: 0 .35rem 0 0; font-size: .82rem; font-weight: 800; color: var(--ink) }
.report-info p { display: inline; font-size: .8rem; line-height: 1.55; color: var(--ink-mute) }

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

@media (min-width: 760px) {
  .channels { grid-template-columns: 1fr 1fr; column-gap: 1.5rem }
}

@media (max-width: 760px) {
  .doc { grid-template-columns: auto minmax(0, 1fr); padding: 1.2rem }
  .doc-actions { grid-column: 1 / -1; flex-direction: row; flex-wrap: wrap }
  .doc-actions .btn { flex: 1; justify-content: center }
}
</style>
