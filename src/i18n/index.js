import { createI18n } from 'vue-i18n'
import es from '../locales/es.js'
import en from '../locales/en.js'

const STORAGE_KEY = 'cn-lang'

function detectLocale() {
  if (typeof window === 'undefined') return 'es'

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved

  const browserLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase()
  return browserLang.startsWith('en') ? 'en' : 'es'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'es',
  messages: { es, en }
})

export function setLocale(locale) {
  i18n.global.locale.value = locale
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.setAttribute('lang', locale)
}

if (typeof window !== 'undefined') {
  document.documentElement.setAttribute('lang', i18n.global.locale.value)
}
