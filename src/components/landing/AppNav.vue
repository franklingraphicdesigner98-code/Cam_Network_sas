<template>
  <nav :class="['nav', { scrolled: isScrolled, hidden: navHidden }]">
    <div class="inner container">
      <router-link to="/" class="brand" @click="closeAll">
        <span class="badge"><img src="/img/ico.png" alt="Cam Network" /></span>
        <span class="b1">Cam Network</span>
      </router-link>

      <div class="nav-links">
        <template v-for="item in menu" :key="item.label">
          <div v-if="item.children" class="dropdown" @mouseenter="openDesktop(item.label)" @mouseleave="closeDesktop">
            <button
              class="nav-link has-children"
              :class="{ open: desktopOpen === item.label }"
              @click="toggleDesktop(item.label)"
            >
              {{ item.label }}
              <ChevronDown :size="15" class="chev" :class="{ rotated: desktopOpen === item.label }" />
            </button>
            <div v-show="desktopOpen === item.label" class="dropdown-menu">
              <router-link
                v-for="child in item.children" :key="child.to"
                :to="child.to" class="dropdown-item" @click="closeAll"
              >
                {{ child.label }}
              </router-link>
            </div>
          </div>
          <router-link v-else :to="item.to" class="nav-link">{{ item.label }}</router-link>
        </template>
      </div>

      <div class="nav-right">
        <BaseButton href="https://api.whatsapp.com/send/?phone=%2B573104697936&text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios" variant="primary" class="cta-desktop">{{ t('nav.contactanos') }}</BaseButton>
        <button class="hamburger" @click="menuOpen = !menuOpen" aria-label="Menú">
          <X v-if="menuOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="mobile-menu">
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
      <BaseButton href="https://api.whatsapp.com/send/?phone=%2B573104697936&text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios" variant="primary" class="cta-mobile" @click="closeAll">{{ t('nav.contactanos') }}</BaseButton>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Menu, X, ChevronDown } from 'lucide-vue-next';
import BaseButton from '../ui/BaseButton.vue';

const { t } = useI18n();
const route = useRoute();

const menu = computed(() => [
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
const navHidden = ref(false);
const lastScrollY = ref(0);
const menuOpen = ref(false);
const desktopOpen = ref(null);
const mobileOpen = ref(null);

const onScroll = () => {
  const currentY = window.scrollY;
  isScrolled.value = currentY > 12;

  if (menuOpen.value || currentY <= 80) {
    navHidden.value = false;
  } else if (currentY > lastScrollY.value) {
    navHidden.value = true; // scrolling down -> hide
  } else {
    navHidden.value = false; // scrolling up -> show
  }
  lastScrollY.value = currentY;
};

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
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 80;
  background: #fff;
  border-bottom: 1px solid transparent;
  transition: box-shadow .25s ease, border-color .25s ease, transform .3s ease;
}
.nav.scrolled { box-shadow: 0 4px 20px rgba(15,23,42,.08); border-color: var(--border) }
.inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 76px; gap: 1.5rem;
}
.brand { display: flex; align-items: center; gap: .55rem; font-weight: 700; font-size: 1.05rem; white-space: nowrap }
.brand .badge {
  display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; overflow: hidden;
}
.brand .badge img { width: 100%; height: 100%; object-fit: contain }
.brand .b1 { color: var(--green-deep) }
.brand .b2 { color: var(--ink) }

.nav-links { display: flex; align-items: center; gap: .4rem; flex: 1; justify-content: center }
.nav-link {
  padding: .6rem .85rem; border-radius: 8px;
  font-size: .92rem; font-weight: 500; color: var(--ink-dim);
  display: inline-flex; align-items: center; gap: .3rem;
  transition: color .2s ease, background .2s ease;
}
.nav-link:hover, .nav-link.router-link-active { color: var(--green-deep); background: var(--bg-1) }
.chev { transition: transform .2s ease }
.chev.rotated { transform: rotate(180deg) }

.dropdown { position: relative }
.dropdown-menu {
  position: absolute; top: calc(100% + 6px); left: 0; min-width: 230px;
  background: #fff; border: 1px solid var(--border); border-radius: var(--r-md);
  box-shadow: var(--shadow-lg); padding: .5rem; display: flex; flex-direction: column; gap: .15rem;
}
.dropdown-menu::before {
  content: ''; position: absolute; top: -6px; left: 0; right: 0; height: 6px;
}
.dropdown-item {
  padding: .65rem .8rem; border-radius: 8px; font-size: .9rem; color: var(--ink-dim);
  transition: background .2s ease, color .2s ease;
}
.dropdown-item:hover { background: var(--bg-1); color: var(--green-deep) }

.nav-right { display: flex; align-items: center; gap: 1.1rem }
.hamburger { display: none; color: var(--ink) }

.mobile-menu {
  display: none;
  position: fixed; top: 76px; left: 0; right: 0; bottom: 0;
  background: #fff; overflow-y: auto;
  padding: .5rem 0 2rem;
  border-top: 1px solid var(--border);
}
.mobile-menu > a, .mobile-parent {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 1rem 1.5rem; font-size: 1rem; font-weight: 500; color: var(--ink);
  border-bottom: 1px solid var(--bg-2);
}
.mobile-children { display: flex; flex-direction: column; background: var(--bg-1) }
.mobile-children a { padding: .85rem 2.2rem; font-size: .92rem; color: var(--ink-dim); border-bottom: 1px solid var(--border) }
.cta-mobile { margin: .5rem 1.5rem; width: calc(100% - 3rem) }

@media (max-width: 860px) {
  .nav-links, .cta-desktop { display: none }
  .hamburger { display: flex }
  .mobile-menu { display: block }
}

@media (min-width: 861px) {
  .nav.hidden { transform: translateY(-100%) }
}
</style>
