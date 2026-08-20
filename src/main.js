import { ViteSSG } from 'vite-ssg'
import './assets/tokens.css'
import './style.css'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { MotionPlugin } from '@vueuse/motion'  // ← AGREGAR
import { i18n } from './i18n'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app, router, isClient }) => {
    app.use(MotionPlugin)  // ← AGREGAR
    app.use(i18n)

    // Safety net: some views lock body scroll while a modal is open
    // (document.body.style.overflow = 'hidden'). If the user navigates away
    // without closing the modal (e.g. clicking the fixed "Volver" button,
    // which sits above the modal overlay), that lock would otherwise persist
    // forever and freeze scrolling on every page after. Client-only: document
    // doesn't exist during the static-generation render pass.
    if (isClient) {
      router.afterEach(() => {
        document.body.style.overflow = ''
      })
    }
  }
)
