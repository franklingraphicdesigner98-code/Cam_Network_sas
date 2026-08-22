import { createI18n } from 'vue-i18n'
import es from '../locales/es.js'
import en from '../locales/en.js'

function detectLocale() {
  if (typeof window === 'undefined') return 'es'

  const browserLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase()
  return browserLang.startsWith('en') ? 'en' : 'es'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'es',
  messages: { es, en }
})

if (typeof window !== 'undefined') {
  document.documentElement.setAttribute('lang', i18n.global.locale.value)
}
