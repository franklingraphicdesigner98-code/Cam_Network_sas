<template>
  <AppNav />
  <main>
    <PageHero eyebrow="Legal" title="Términos y Condiciones" />
    <section class="s">
      <div class="container legal-doc reveal">
        <!-- TODO: contenido genérico de placeholder — reemplazar por el texto legal definitivo revisado por Cam Network Soluciones S.A.S. -->
        <p class="updated">Última actualización: pendiente de definir</p>

        <h2>1. Aceptación de los términos</h2>
        <p>El acceso y uso de este sitio web implica la aceptación plena de los presentes términos y condiciones por parte del usuario.</p>

        <h2>2. Servicios ofrecidos</h2>
        <p>Cam Network Soluciones S.A.S. ofrece servicios de internet, cámaras de seguridad, sistemas de energía solar e instalación y mantenimiento, sujetos a disponibilidad de cobertura y a las condiciones comerciales vigentes al momento de la contratación.</p>

        <h2>3. Uso del sitio web</h2>
        <p>El usuario se compromete a hacer un uso adecuado del sitio y de los formularios disponibles, y a suministrar información veraz en los canales de contacto, PQRS y cotización.</p>

        <h2>4. Propiedad intelectual</h2>
        <p>Los contenidos, marcas, logotipos e imágenes publicados en este sitio son propiedad de Cam Network Soluciones S.A.S. y no podrán ser reproducidos sin autorización previa.</p>

        <h2>5. Modificaciones</h2>
        <p>Cam Network Soluciones S.A.S. podrá modificar estos términos y condiciones en cualquier momento, publicando la versión actualizada en este mismo sitio web.</p>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import { useReveal } from '../../composables/useReveal.js';

useReveal();
</script>

<style scoped>
.legal-doc { max-width: 760px }
.legal-doc .updated { color: var(--ink-mute); font-size: .85rem; margin-bottom: 2rem }
.legal-doc h2 { font-size: 1.15rem; font-weight: 700; color: var(--ink); margin: 2rem 0 .75rem }
.legal-doc p { color: var(--ink-dim); line-height: 1.75 }
</style>
