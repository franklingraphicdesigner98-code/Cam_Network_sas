import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

// Dominio final (debe coincidir con SITE_URL en src/composables/useRouteMeta.js)
const SITE_URL = 'https://camnetworksoluciones.com'

// Todas las páginas .html que generó el build (recursivo)
function paginasHtml(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = join(dir, e.name)
    if (e.isDirectory()) return paginasHtml(ruta, base)
    return e.name.endsWith('.html') ? [relative(base, ruta).replace(/\\/g, '/')] : []
  })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  ssgOptions: {
    // Al terminar el build: sitemap.xml con una URL por cada página generada
    onFinished(dir = 'dist') {
      const hoy = new Date().toISOString().slice(0, 10)
      const urls = paginasHtml(dir)
        .filter((f) => !/^(404|docs\/)/.test(f))
        .map((f) => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, '')))
        .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u === '/' ? '/' : u}</loc><lastmod>${hoy}</lastmod></url>`).join('\n')}
</urlset>
`
      writeFileSync(join(dir, 'sitemap.xml'), xml)
      console.log(`[sitemap] ${urls.length} páginas → ${dir}/sitemap.xml`)
    },
  },
})
