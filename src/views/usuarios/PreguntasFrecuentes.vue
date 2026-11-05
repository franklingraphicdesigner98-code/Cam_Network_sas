<template>
  <PageLayout>
    <PageHero :eyebrow="t('pages.usuariosEyebrow')" :title="t('pages.preguntasFrecuentes.title')" :subtitle="t('pages.preguntasFrecuentes.subtitle')" />

    <!-- Preguntas (textos en src/locales/*.js → faq.items; "lineas: true" muestra las líneas de atención) -->
    <section class="block">
      <div class="container faq">
        <details v-for="(item, i) in tm('faq.items')" :key="i" class="faq-item reveal" :open="i === 0">
          <summary>
            <span>{{ rt(item.q) }}</span>
            <ChevronDown :size="20" class="chev" aria-hidden="true" />
          </summary>
          <div class="answer">
            <p>{{ rt(item.a) }}</p>
            <ul v-if="item.lineas" class="faq-lines">
              <li v-for="l in lineas" :key="l.key">
                <span class="faq-line-label">{{ t(`lineas.${l.key}`) }}</span>
                <a :href="`tel:+${l.number}`" class="faq-line-num"><Phone :size="16" /> {{ l.display }}</a>
                <a :href="whatsappLink(l.key)" target="_blank" rel="noopener noreferrer" class="faq-line-wa"><MessageCircle :size="16" /> WhatsApp</a>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </section>
  </PageLayout>
</template>

<script setup>
import PageLayout from '../../components/landing/PageLayout.vue';
import { useI18n } from 'vue-i18n';
import { ChevronDown, Phone, MessageCircle } from 'lucide-vue-next';
import PageHero from '../../components/ui/PageHero.vue';
import { lineasAtencion as lineas, whatsappLink } from '../../data/contacto.js';

const { t, tm, rt } = useI18n();
</script>

<style scoped>
.block { padding: 1.25rem 0 4rem }
.faq { max-width: 860px; display: flex; flex-direction: column; gap: 1rem }
.faq-item { border-radius: var(--r-lg); background: var(--neu-lite-bg); box-shadow: var(--neu-lite-raised) }
summary {
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 1.2rem 1.4rem; cursor: pointer; list-style: none;
  font-size: 1.05rem; font-weight: 800; color: var(--ink);
}
summary::-webkit-details-marker { display: none }
summary:focus-visible { outline: 3px solid var(--green); outline-offset: 2px; border-radius: var(--r-lg) }
.chev { flex: none; color: var(--green); transition: transform .25s ease }
.faq-item[open] .chev { transform: rotate(180deg) }
.answer { padding: 0 1.4rem 1.3rem }
.answer p { margin: 0; line-height: 1.7; color: var(--ink-dim) }
.faq-lines { list-style: none; margin: 1rem 0 0; padding: 0; display: flex; flex-direction: column; gap: .6rem }
.faq-lines li { display: flex; align-items: center; flex-wrap: wrap; gap: .5rem 1rem; padding: .7rem 1rem; border-radius: var(--r-md); background: #fbfdfa; box-shadow: var(--neu-lite-inset) }
.faq-line-label { flex: 1 1 10rem; font-weight: 700; color: var(--ink) }
.faq-line-num, .faq-line-wa { display: inline-flex; align-items: center; gap: .35rem; min-height: 40px; padding: 0 .9rem; border-radius: 999px; font-weight: 700; font-size: .9rem }
.faq-line-num { color: var(--green-deep); background: var(--green-soft) }
.faq-line-wa { color: #fff; background: #22c55e }
.faq-line-num:focus-visible, .faq-line-wa:focus-visible { outline: 3px solid var(--green-deep); outline-offset: 2px }
</style>
