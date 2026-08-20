import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const DEFAULT_TITLE = 'Cam Network Soluciones S.A.S.'
const DEFAULT_DESCRIPTION = 'Cam Network Soluciones S.A.S. — Diseño gráfico, identidad corporativa y desarrollo de software a medida.'
// TODO: actualizar SITE_URL con el dominio real de Cam Network Soluciones cuando esté definido
const SITE_URL = 'https://franklinsc.vercel.app'

// Aplica el title/description de route.meta como <title> y <meta name="description">
// reales en el <head>. Cada ruta define su propio meta.title / meta.description en
// src/router/index.js — para agregar una página nueva, solo hay que añadir esos dos
// campos ahí; no hace falta tocar este archivo.
export function useRouteMeta() {
  const route = useRoute()

  useHead({
    title: () => route.meta.title || DEFAULT_TITLE,
    meta: [
      { name: 'description', content: () => route.meta.description || DEFAULT_DESCRIPTION },
      { property: 'og:title', content: () => route.meta.title || DEFAULT_TITLE },
      { property: 'og:description', content: () => route.meta.description || DEFAULT_DESCRIPTION },
      { property: 'og:url', content: () => `${SITE_URL}${route.path}` },
      { property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'canonical', href: () => `${SITE_URL}${route.path}` }
    ]
  })
}
