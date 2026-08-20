<template>
  <AppNav />
  <main>
    <PageHero eyebrow="Legal" title="Aviso de Privacidad" />
    <section class="s">
      <div class="container legal-doc reveal">
        <!-- TODO: contenido genérico de placeholder — reemplazar por el texto legal definitivo revisado por Cam Network Soluciones S.A.S. -->
        <p class="updated">Última actualización: pendiente de definir</p>

        <h2>1. Identificación del responsable</h2>
        <p>Cam Network Soluciones S.A.S. informa a los usuarios de este sitio web que los datos personales suministrados serán tratados conforme a la normatividad colombiana vigente sobre protección de datos personales.</p>

        <h2>2. Datos recolectados</h2>
        <p>A través de los formularios de este sitio (contacto, PQRS, cotización de servicios) se podrán recolectar datos como nombre, correo electrónico, número de teléfono, dirección y tipo de servicio de interés.</p>

        <h2>3. Tratamiento y transferencia</h2>
        <p>Los datos personales no serán compartidos con terceros, salvo obligación legal o autorización expresa del titular, y serán almacenados con medidas de seguridad razonables para evitar su alteración, pérdida o acceso no autorizado.</p>

        <h2>4. Consulta de la Política de Tratamiento de Datos</h2>
        <p>Para conocer el detalle de las finalidades, derechos y procedimientos de tratamiento de datos personales, consulte nuestra <router-link to="/legal/politica-tratamiento-datos">Política de Tratamiento de Datos Personales</router-link>.</p>
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
.legal-doc :deep(a) { color: var(--green-deep); text-decoration: underline }
</style>
