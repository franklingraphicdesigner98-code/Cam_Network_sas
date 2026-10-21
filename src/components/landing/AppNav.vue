<template>
  <!-- Al bajar, la barra se vuelve flotante (píldora centrada); con el menú móvil abierto vuelve a ancho completo -->
  <nav :class="['nav', { floating: isScrolled && !menuOpen, 'menu-open': menuOpen }]" @keydown.esc="closeAll">
    <div class="inner container">
      <router-link to="/" class="brand" @click="closeAll">
        <img src="/img/logotipo-horizontal.png" alt="Cam Network Soluciones S.A.S." class="logo" width="352" height="132" />
      </router-link>

      <div class="nav-links">
        <template v-for="item in menu" :key="item.label">
          <div v-if="item.children" class="dropdown" @mouseenter="openDesktop(item.label)" @mouseleave="closeDesktop">
            <button
              class="nav-link has-children"
              :class="{ open: desktopOpen === item.label, active: isGroupActive(item) }"
              :aria-expanded="desktopOpen === item.label"
              @click="toggleDesktop(item.label)"
            >
              {{ item.label }}
              <ChevronDown :size="15" class="chev" :class="{ rotated: desktopOpen === item.label }" />
            </button>
            <transition name="drop">
              <div v-show="desktopOpen === item.label" class="dropdown-menu">
                <router-link
                  v-for="child in item.children" :key="child.to"
                  :to="child.to" class="dropdown-item" @click="closeAll"
                >
                  {{ child.label }}
                </router-link>
              </div>
            </transition>
          </div>
          <router-link v-else :to="item.to" class="nav-link" exact-active-class="active">{{ item.label }}</router-link>
        </template>
      </div>

      <div class="nav-right">
        <LanguageSwitcher class="lang-desktop" />
        <BaseButton :to="{ name: 'contacto' }" variant="primary" class="btn-sm cta-desktop">{{ t('nav.contacto') }}</BaseButton>
        <button class="hamburger" @click="menuOpen = !menuOpen" :aria-label="t('nav.menu')" :aria-expanded="menuOpen" aria-controls="menu-movil">
          <X v-if="menuOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" id="menu-movil" class="mobile-menu">
      <template v-for="item in menu" :key="'m-'+item.label">
        <div v-if="item.children" class="mobile-group">
          <button class="mobile-parent" @click="toggleMobileGroup(item.label)">
            {{ item.label }}
            <ChevronDown :size="16" class="chev" :class="{ rotated: mobileOpen === item.label }" />
          </button>
          <div v-show="mobileOpen === item.label" class="mobile-children">
            <router-link v-for="child in item.children" :key="child.to" :to="child.to" @click="closeAll">
              {{ child.label }}
            </router-link>
          </div>
        </div>
        <router-link v-else :to="item.to" @click="closeAll">{{ item.label }}</router-link>
      </template>
      <div class="mobile-lang"><LanguageSwitcher /></div>
      <BaseButton :to="{ name: 'contacto' }" variant="primary" class="cta-mobile" @click="closeAll">{{ t('nav.contactanos') }}</BaseButton>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Menu, X, ChevronDown } from 'lucide-vue-next';
import LanguageSwitcher from './LanguageSwitcher.vue';
import BaseButton from '../ui/BaseButton.vue';

const { t } = useI18n();
const route = useRoute();

const menu = computed(() => [
  { label: t('nav.inicio'), to: '/' },
  {
    label: t('nav.empresa'),
    children: [
      { label: t('nav.quienesSomos'), to: '/empresa/quienes-somos' },
      { label: t('nav.nuestroEquipo'), to: '/empresa/nuestro-equipo' }
    ]
  },
  { label: t('nav.cobertura'), to: '/cobertura' },
  { label: t('nav.normatividad'), to: '/normatividad' },
  {
    label: t('nav.usuarios'),
    children: [
      { label: t('nav.pqrs'), to: '/usuarios/pqrs' },
      { label: t('nav.testVelocidad'), to: '/usuarios/test-velocidad' },
      { label: t('nav.preguntasFrecuentes'), to: '/usuarios/preguntas-frecuentes' },
      { label: t('nav.opiniones'), to: '/usuarios/opiniones' }
    ]
  }
]);

const isScrolled = ref(false);
const menuOpen = ref(false);
const desktopOpen = ref(null);
const mobileOpen = ref(null);

// umbral del estado flotante (listener pasivo: solo compara un número)
const onScroll = () => { isScrolled.value = window.scrollY >= 24; };

function isGroupActive(item) { return item.children.some((c) => route.path === c.to); }
function openDesktop(label) { desktopOpen.value = label; }
function closeDesktop() { desktopOpen.value = null; }
function toggleDesktop(label) { desktopOpen.value = desktopOpen.value === label ? null : label; }
function toggleMobileGroup(label) { mobileOpen.value = mobileOpen.value === label ? null : label; }
function closeAll() { menuOpen.value = false; desktopOpen.value = null; mobileOpen.value = null; }

watch(() => route.fullPath, closeAll);

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
/* Estado inicial: barra blanca de ancho completo pegada arriba.
   Estado flotante: píldora centrada, semitransparente con desenfoque.
   La barra es fixed y las páginas ya reservan su altura (--nav-h), así que el contenido no salta. */
.nav {
  position: fixed; top: var(--announce-h, 0px); left: 0; right: 0; z-index: 80;
  max-width: 100%; margin: 0 auto;
  background: #fff; border-radius: 0; box-shadow: none;
  transition: max-width .25s ease, margin-top .25s ease, border-radius .25s ease,
    background-color .25s ease, box-shadow .25s ease, padding .25s ease;
}
.nav.floating {
  max-width: min(1180px, calc(100% - 24px)); margin-top: 12px; border-radius: 999px;
  background: rgba(255, 255, 255, .82);
  backdrop-filter: saturate(160%) blur(14px);
  -webkit-backdrop-filter: saturate(160%) blur(14px);
  box-shadow: 0 10px 30px rgba(14, 58, 32, .12), 0 0 0 1px rgba(14, 58, 32, .05);
}
.nav.menu-open { box-shadow: 0 6px 24px rgba(14, 58, 32, .07) }
.inner {
  display: flex; align-items: center; justify-content: space-between;
  height: var(--nav-h); gap: 1.5rem;
  transition: height .25s ease, padding .25s ease;
}
.nav.floating .inner { height: 64px; padding-inline: 1.6rem }
.brand { display: flex; align-items: center; flex: none; border-radius: 10px }
.brand .logo { height: 58px; width: auto; transition: height .25s ease }
.nav.floating .brand .logo { height: 44px }

/* foco visible para navegar con teclado */
.brand:focus-visible, .nav-link:focus-visible, .dropdown-item:focus-visible, .hamburger:focus-visible,
.mobile-menu a:focus-visible, .mobile-parent:focus-visible {
  outline: 2px solid var(--green); outline-offset: 3px; border-radius: 8px;
}

.nav-links { display: flex; align-items: center; gap: .25rem; flex: 1; justify-content: center }
.nav-link {
  position: relative;
  padding: .6rem .8rem;
  font-size: .9rem; font-weight: 500; color: var(--ink);
  display: inline-flex; align-items: center; gap: .3rem;
  transition: color .2s ease;
}
.nav-link::after {
  content: ""; position: absolute; left: .8rem; right: .8rem; bottom: .1rem; height: 2.5px;
  border-radius: 2px; background: var(--green);
  transform: scaleX(0); transition: transform .25s ease;
}
.nav-link:hover, .nav-link.open { color: var(--green-deep) }
.nav-link.active { color: var(--green-deep); font-weight: 600 }
.nav-link.active::after { transform: scaleX(1) }
.has-children.active::after { right: 1.9rem }
.chev { transition: transform .2s ease }
.chev.rotated { transform: rotate(180deg) }

.dropdown { position: relative }
/* puente invisible para que el hover no se pierda entre botón y menú */
.dropdown::before { content: ""; position: absolute; left: 0; right: 0; top: 100%; height: 14px }
.dropdown-menu {
  position: absolute; top: calc(100% + 12px); left: 0; min-width: 220px;
  background: #fff; border: 1px solid var(--border); border-radius: var(--r-md);
  box-shadow: var(--shadow-lg); padding: .55rem; display: flex; flex-direction: column; gap: .1rem;
}
.dropdown-item {
  padding: .6rem .85rem; border-radius: 10px; font-size: .88rem; color: var(--ink);
  transition: background .2s ease, color .2s ease;
}
.dropdown-item:hover, .dropdown-item.router-link-exact-active { background: var(--green-soft); color: var(--green-deep) }
.drop-enter-active, .drop-leave-active { transition: opacity .18s ease, transform .18s ease }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px) }

.nav-right { display: flex; align-items: center; gap: 1rem }
.hamburger { display: none; color: var(--ink) }

.mobile-menu {
  display: none;
  /* justo debajo de la barra, ocupando el resto de la pantalla */
  position: absolute; top: 100%; left: 0; right: 0;
  height: calc(100vh - var(--nav-h) - var(--announce-h, 0px));
  height: calc(100dvh - var(--nav-h) - var(--announce-h, 0px));
  background: #fff; overflow-y: auto;
  padding: .5rem 0 2rem;
  border-top: 1px solid var(--border);
}
.mobile-menu > a, .mobile-parent {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 1rem 1.5rem; font-size: 1rem; font-weight: 500; color: var(--ink);
  border-bottom: 1px solid var(--bg-2);
}
.mobile-menu > a.router-link-exact-active { color: var(--green-deep); font-weight: 600 }
.mobile-children { display: flex; flex-direction: column; background: var(--bg-1) }
.mobile-children a { padding: .85rem 2.2rem; font-size: .92rem; color: var(--ink-dim); border-bottom: 1px solid var(--border) }
.mobile-lang { padding: 1.2rem 1.5rem }
.cta-mobile { margin: .5rem 1.5rem; width: calc(100% - 3rem) }

@media (max-width: 480px) {
  .brand .logo { height: 42px }
}
@media (prefers-reduced-motion: reduce) {
  .nav, .inner, .brand .logo { transition: none }
}
@media (max-width: 960px) {
  .nav.floating .inner { padding-inline: 1.1rem }
  .nav-links, .cta-desktop, .lang-desktop { display: none }
  .hamburger { display: flex }
  .mobile-menu { display: block }
}
</style>
