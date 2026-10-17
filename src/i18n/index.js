import { createI18n } from 'vue-i18n'
import es from '../locales/es.js'
import en from '../locales/en.js'

const STORAGE_KEY = 'cn-lang'
const SUPPORTED = ['es', 'en']

// El HTML se pre-renderiza en español (vite-ssg), así que el idioma arranca
// siempre en 'es' y el del visitante se aplica después de hidratar
// (ver applyPreferredLocale en App.vue) para no romper la hidratación.
export const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: { es, en }
})

function readSaved() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return SUPPORTED.includes(saved) ? saved : null
  } catch {
    return null
  }
}

// Recorre los idiomas preferidos del dispositivo en orden y toma el primero
// que el sitio soporta (p. ej. ['fr-FR', 'en-US'] → 'en'). Si ninguno
// coincide, se queda en español.
function detectDeviceLocale() {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language || '']
  for (const lang of langs) {
    const base = lang.toLowerCase().split('-')[0]
    if (SUPPORTED.includes(base)) return base
  }
  return 'es'
}

function applyLocale(locale) {
  i18n.global.locale.value = locale
  document.documentElement.setAttribute('lang', locale)
}

// Elección manual (botón ES/EN) > idioma del dispositivo > español.
export function applyPreferredLocale() {
  applyLocale(readSaved() || detectDeviceLocale())
}

export function setLocale(locale) {
  applyLocale(locale)
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {}
}
