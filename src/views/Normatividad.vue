<template>
  <AppNav />
  <main>
    <PageHero title="Normatividad" subtitle="Normatividad vigente aplicable a nuestros servicios de telecomunicaciones." />

    <section class="s">
      <div class="container">
        <ul class="doc-list">
          <li v-for="doc in documentos" :key="doc.href" class="doc-item reveal">
            <span class="doc-icon"><FileText :size="20" /></span>
            <div class="doc-info">
              <p class="doc-title">{{ doc.title }}</p>
              <p class="doc-desc">{{ doc.description }}</p>
            </div>
            <div class="doc-actions">
              <a :href="doc.href" target="_blank" rel="noopener noreferrer" class="doc-link" title="Ver PDF">
                <Eye :size="18" />
              </a>
              <a :href="doc.href" download class="doc-link" title="Descargar PDF">
                <Download :size="18" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { FileText, Eye, Download } from 'lucide-vue-next';
import AppNav from '../components/landing/AppNav.vue';
import AppFooter from '../components/landing/AppFooter.vue';
import PageHero from '../components/ui/PageHero.vue';
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
</script>

<style scoped>
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
  padding: 1.1rem 1.3rem;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
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
  border: 1px solid var(--border);
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.doc-link:hover { background: var(--green-deep); border-color: var(--green-deep); color: #fff }

@media (max-width: 560px) {
  .doc-item { flex-wrap: wrap }
  .doc-actions { margin-left: calc(42px + 1rem) }
}
</style>
