<template>
  <AppNav />
  <main>
    <header class="norm-hero">
      <NetworkBackground :fixed="false" dot-color="#ffffff" line-color="#ffffff" />
      <div class="container norm-hero-inner">
        <h1 class="display reveal">Normatividad</h1>
        <p class="lead subtitle reveal reveal-1">Normatividad vigente aplicable a nuestros servicios de telecomunicaciones.</p>
      </div>
    </header>

    <section class="s">
      <div class="container">
        <ul class="doc-list">
          <li v-for="(doc, index) in documentos" :key="doc.href" class="doc-item reveal">
            <button type="button" class="doc-main" @click="openDoc(index)">
              <span class="doc-icon"><FileText :size="20" /></span>
              <div class="doc-info">
                <p class="doc-title">{{ doc.title }}</p>
                <p class="doc-desc">{{ doc.description }}</p>
              </div>
            </button>
            <div class="doc-actions">
              <button type="button" class="doc-link" title="Ver documento" @click="openDoc(index)">
                <Eye :size="18" />
              </button>
              <a :href="doc.href" download class="doc-link" title="Descargar PDF" @click.stop>
                <Download :size="18" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="activeIndex !== null" class="doc-viewer" role="dialog" aria-modal="true" @click.self="closeDoc">
          <div class="doc-viewer-panel">
            <header class="doc-viewer-header">
              <div class="doc-viewer-heading">
                <p class="doc-viewer-title">{{ activeDoc.title }}</p>
                <p class="doc-viewer-count">Documento {{ activeIndex + 1 }} de {{ documentos.length }}</p>
              </div>
              <div class="doc-viewer-tools">
                <a :href="activeDoc.href" download class="doc-viewer-btn" title="Descargar">
                  <Download :size="18" />
                </a>
                <button type="button" class="doc-viewer-btn" title="Cerrar" @click="closeDoc">
                  <X :size="20" />
                </button>
              </div>
            </header>

            <div class="doc-viewer-body">
              <button
                type="button"
                class="doc-nav doc-nav-prev"
                title="Documento anterior"
                :disabled="activeIndex === 0"
                @click="prevDoc"
              >
                <ChevronLeft :size="22" />
              </button>

              <iframe :key="activeDoc.href" :src="activeDoc.href" class="doc-frame" :title="activeDoc.title"></iframe>

              <button
                type="button"
                class="doc-nav doc-nav-next"
                title="Documento siguiente"
                :disabled="activeIndex === documentos.length - 1"
                @click="nextDoc"
              >
                <ChevronRight :size="22" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
  <AppFooter />
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { FileText, Eye, Download, X, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import NetworkBackground from '../components/ui/NetworkBackground.vue';
import { useReveal } from '../composables/useReveal.js';

useReveal();

const documentos = [
  {
    title: 'Ley 679 de 2001',
    description: 'Estatuto para prevenir y contrarrestar la explotación, la pornografía y el turismo sexual con menores.',
    href: '/docs/normatividad/ley-679-de-2001.pdf'
  },
  {
    title: 'Ley 1336 de 2009',
    description: 'Adiciona y robustece la Ley 679 de 2001, de lucha contra la explotación, la pornografía y el turismo sexual con niños, niñas y adolescentes.',
    href: '/docs/normatividad/ley-1336-de-2009.pdf'
  },
  {
    title: 'Decreto 1524 de 2002',
    description: 'Reglamenta el artículo 5 de la Ley 679 de 2001, sobre medidas técnicas y administrativas para prevenir el acceso de menores a pornografía en Internet.',
    href: '/docs/normatividad/decreto-1524-de-2002.pdf'
  }
];

const activeIndex = ref(null);
const activeDoc = computed(() => (activeIndex.value !== null ? documentos[activeIndex.value] : null));

function openDoc(index) {
  activeIndex.value = index;
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onKeydown);
}

function closeDoc() {
  activeIndex.value = null;
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKeydown);
}

function prevDoc() {
  if (activeIndex.value > 0) activeIndex.value -= 1;
}

function nextDoc() {
  if (activeIndex.value < documentos.length - 1) activeIndex.value += 1;
}

function onKeydown(e) {
  if (e.key === 'Escape') closeDoc();
  if (e.key === 'ArrowLeft') prevDoc();
  if (e.key === 'ArrowRight') nextDoc();
}

onBeforeUnmount(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.norm-hero {
  position: relative;
  overflow: hidden;
  padding: 9.5rem 0 5rem;
  background: linear-gradient(135deg, #00620f 0%, #003e0c 100%);
  color: #fff;
  text-align: center;
}
.norm-hero-inner { position: relative; z-index: 1 }
.norm-hero .display { color: #fff; font-size: clamp(2.1rem, 4vw, 3rem) }
.norm-hero .subtitle { color: rgba(255,255,255,.88); margin: 1rem auto 0 }

@media (max-width: 720px) { .norm-hero { padding: 7.5rem 0 3.5rem } }

.doc-list {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.doc-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .4rem .8rem .4rem 1.3rem;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  transition: border-color .15s ease, box-shadow .15s ease;
}
.doc-item:hover { border-color: var(--green-2); box-shadow: var(--shadow) }

.doc-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
  padding: .7rem 0;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: inherit;
}
.doc-icon {
  display: grid; place-items: center; flex: none;
  width: 42px; height: 42px; border-radius: 10px; color: #fff;
  background: linear-gradient(135deg, var(--green-2), var(--green-deep));
}
.doc-info { flex: 1; min-width: 0 }
.doc-title { margin: 0 0 .2rem; font-weight: 700; color: var(--ink) }
.doc-desc { margin: 0; font-size: .85rem; color: var(--ink-mute); line-height: 1.5 }
.doc-actions { display: flex; align-items: center; gap: .4rem; flex: none }
.doc-link {
  display: grid; place-items: center;
  width: 38px; height: 38px; border-radius: 9px;
  color: var(--ink-dim);
  background: none;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.doc-link:hover { background: var(--green-deep); border-color: var(--green-deep); color: #fff }

/* Viewer modal */
.doc-viewer {
  position: fixed; inset: 0; z-index: 200;
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
  background: rgba(15, 23, 42, .72);
  backdrop-filter: blur(4px);
}
.doc-viewer-panel {
  display: flex; flex-direction: column;
  width: min(920px, 100%);
  height: min(85vh, 1000px);
  background: var(--bg-0);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.doc-viewer-header {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.3rem;
  border-bottom: 1px solid var(--border);
}
.doc-viewer-title { margin: 0; font-weight: 700; color: var(--ink) }
.doc-viewer-count { margin: .15rem 0 0; font-size: .8rem; color: var(--ink-mute) }
.doc-viewer-tools { display: flex; align-items: center; gap: .5rem; flex: none }
.doc-viewer-btn {
  display: grid; place-items: center;
  width: 38px; height: 38px; border-radius: 9px;
  color: var(--ink-dim);
  border: 1px solid var(--border);
  background: none;
  cursor: pointer;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.doc-viewer-btn:hover { background: var(--green-deep); border-color: var(--green-deep); color: #fff }

.doc-viewer-body {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: stretch;
  background: var(--bg-2);
}
.doc-frame { flex: 1; width: 100%; height: 100%; border: none }

.doc-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  z-index: 1;
  display: grid; place-items: center;
  width: 42px; height: 42px; border-radius: 999px;
  background: var(--bg-0);
  border: 1px solid var(--border);
  color: var(--ink);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: background .15s ease, color .15s ease, opacity .15s ease;
}
.doc-nav:hover:not(:disabled) { background: var(--green-deep); border-color: var(--green-deep); color: #fff }
.doc-nav:disabled { opacity: .35; cursor: default }
.doc-nav-prev { left: 12px }
.doc-nav-next { right: 12px }

.fade-enter-active, .fade-leave-active { transition: opacity .18s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }

@media (max-width: 560px) {
  .doc-item { flex-wrap: wrap; padding-left: 1rem }
  .doc-viewer { padding: 0 }
  .doc-viewer-panel { width: 100%; height: 100%; border-radius: 0 }
  .doc-nav { width: 36px; height: 36px }
}
</style>
