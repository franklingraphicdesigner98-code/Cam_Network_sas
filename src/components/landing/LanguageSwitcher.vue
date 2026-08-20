<template>
  <div class="lang-switch">
    <button :class="{ active: locale === 'es' }" @click="setLocale('es')">ES</button>
    <span class="sep">/</span>
    <button :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { setLocale } from '../../i18n';

const { locale } = useI18n();
</script>

<style scoped>
.lang-switch {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .72rem; font-weight: 600; letter-spacing: .04em;
}
.lang-switch button {
  color: var(--ink-mute); padding: .2rem .35rem; border-radius: 4px;
  transition: color .2s ease;
}
.lang-switch button:hover { color: var(--ink-dim) }
.lang-switch button.active { color: var(--green-deep) }
.lang-switch .sep { color: var(--border) }
</style>
