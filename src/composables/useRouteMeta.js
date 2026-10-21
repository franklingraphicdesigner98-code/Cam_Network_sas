import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { negocioJsonLd } from '../data/negocio.js'

const DEFAULT_TITLE = 'Cam Network Soluciones S.A.S.'
const DEFAULT_DESCRIPTION = 'Cam Network Soluciones S.A.S. — Internet, cámaras de seguridad y energía solar para hogares y empresas en Colombia.'
// Dirección pública del sitio (despliegue de Vercel). TODO: cambiarla por el dominio propio cuando esté definido
const SITE_URL = 'https://cam-network-sas.vercel.app'

// Aplica el title/description de la ruta como <title> y <meta name="description">
// reales en el <head>, en el idioma activo. Cada ruta define meta.i18n en
// src/router/index.js y sus textos viven en src/locales/*.js → meta.<clave>.title /
// .description — para agregar una página nueva, basta con añadir esa clave en ambos
// idiomas; no hace falta tocar este archivo.
export function useRouteMeta() {
  const route = useRoute()
  const { t, te, locale } = useI18n()

  const title = () => {
    const key = route.meta.i18n
    if (!key || !te(`meta.${key}.title`)) return DEFAULT_TITLE
    const page = t(`meta.${key}.title`)
    return route.meta.siteFirst ? `${DEFAULT_TITLE} | ${page}` : `${page} | ${DEFAULT_TITLE}`
  }
  const description = () => {
    const key = route.meta.i18n
    return key && te(`meta.${key}.description`) ? t(`meta.${key}.description`) : DEFAULT_DESCRIPTION
  }

  useHead({
    title,
    htmlAttrs: { lang: () => locale.value },
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: () => `${SITE_URL}${route.path}` },
      { property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'canonical', href: () => `${SITE_URL}${route.path}` }
    ],
    // datos del negocio para Google y las IA (src/data/negocio.js)
    script: [
      { key: 'negocio', type: 'application/ld+json', innerHTML: JSON.stringify(negocioJsonLd(SITE_URL)) }
    ]
  })
}
