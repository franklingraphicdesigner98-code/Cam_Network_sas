<template>
  <div v-if="visible" ref="bar" class="announce" role="region" :aria-label="t('anuncio.region')">
    <p class="announce-text">
      {{ text }}
      <template v-if="anuncio.link && linkLabel">
        <a v-if="isExternal" :href="anuncio.link" target="_blank" rel="noopener noreferrer">{{ linkLabel }}</a>
        <router-link v-else :to="anuncio.link">{{ linkLabel }}</router-link>
      </template>
    </p>
    <button type="button" class="announce-close" :aria-label="t('anuncio.close')" @click="dismiss">
      <X :size="16" />
    </button>
  </div>
</template>

<script setup>
// Barra de anuncio descartable (configuración en src/data/anuncio.js; oculta por defecto).
// Publica su altura en la variable CSS --announce-h para que el menú fijo quede debajo.
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { X } from 'lucide-vue-next';
import { anuncio } from '../../data/anuncio.js';

const { t, locale } = useI18n();
const bar = ref(null);
const dismissed = ref(true);   // se decide al montar (sessionStorage solo existe en el navegador)
const key = `cn-anuncio-cerrado:${anuncio.id}`;

const lang = computed(() => (locale.value === 'en' ? 'en' : 'es'));
const text = computed(() => anuncio.text[lang.value] || anuncio.text.es);
const linkLabel = computed(() => anuncio.linkLabel[lang.value] || anuncio.linkLabel.es);
const isExternal = computed(() => /^https?:\/\//.test(anuncio.link || ''));
const visible = computed(() => anuncio.enabled && !!text.value && !dismissed.value);

let ro = null;
function setHeight(h) { document.documentElement.style.setProperty('--announce-h', `${h}px`); }

function dismiss() {
  dismissed.value = true;
  try { sessionStorage.setItem(key, '1'); } catch {}
}

watch(visible, async (v) => {
  ro?.disconnect();
  if (!v) return setHeight(0);
  await nextTick();
  setHeight(bar.value.offsetHeight);
  ro = new ResizeObserver(() => setHeight(bar.value?.offsetHeight || 0));
  ro.observe(bar.value);
});

onMounted(() => {
  let closed = false;
  try { closed = sessionStorage.getItem(key) === '1'; } catch {}
  dismissed.value = closed;
});
onBeforeUnmount(() => { ro?.disconnect(); setHeight(0); });
</script>

<style scoped>
.announce {
  position: fixed; top: 0; left: 0; right: 0; z-index: 90;
  display: flex; align-items: center; justify-content: center; gap: .8rem;
  padding: .55rem 3rem .55rem 1rem;
  background: var(--forest); color: #fff;
  font-size: .86rem; line-height: 1.4; text-align: center;
}
.announce-text { margin: 0 }
.announce-text a { margin-left: .4rem; color: var(--green-3); font-weight: 700; text-decoration: underline; text-underline-offset: 2px }
.announce-close {
  position: absolute; right: .6rem; top: 50%; transform: translateY(-50%);
  display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%;
  color: #fff; background: rgba(255, 255, 255, .1);
}
.announce-close:hover { background: rgba(255, 255, 255, .2) }
.announce-close:focus-visible, .announce-text a:focus-visible { outline: 2px solid var(--green-3); outline-offset: 2px }
</style>
