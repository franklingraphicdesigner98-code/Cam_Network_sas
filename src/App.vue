<template>
  <NetworkBackground />
  <AnnouncementBar />
  <!-- fundido al cambiar de página; el div es necesario porque cada página tiene varios elementos raíz -->
  <router-view v-slot="{ Component, route }">
    <transition name="page" mode="out-in">
      <div :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
  <a
    :href="whatsappLink('asesorias', t('whatsapp.message'))"
    target="_blank"
    rel="noopener noreferrer"
    class="wa-fab"
    aria-label="WhatsApp"
  >
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  </a>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouteMeta } from './composables/useRouteMeta.js'
import { applyPreferredLocale } from './i18n'
import { whatsappLink } from './data/contacto.js'
import NetworkBackground from './components/ui/NetworkBackground.vue'
import AnnouncementBar from './components/landing/AnnouncementBar.vue'

const { t } = useI18n()

useRouteMeta()
onMounted(applyPreferredLocale)
</script>

<style>
.wa-fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 6px 24px rgba(37,211,102,.45), 0 2px 8px rgba(0,0,0,.25);
  transition: transform .25s ease, box-shadow .25s ease;
}
.wa-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 32px rgba(37,211,102,.6), 0 4px 12px rgba(0,0,0,.3);
}
@media (max-width: 480px) {
  .wa-fab { width: 48px; height: 48px; bottom: 18px; right: 16px }
}
</style>