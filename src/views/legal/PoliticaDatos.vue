<template>
  <AppNav />
  <main>
    <PageHero eyebrow="Legal" title="Política de Tratamiento de Datos Personales" subtitle="Ley 1581 de 2012 y Decreto 1377 de 2013" />
    <section class="s">
      <div class="container legal-doc reveal">
        <!-- TODO: contenido genérico de placeholder — reemplazar por el texto legal definitivo revisado por Cam Network Soluciones S.A.S. -->
        <p class="updated">Última actualización: pendiente de definir</p>

        <h2>1. Responsable del tratamiento</h2>
        <p>Cam Network Soluciones S.A.S., identificada con NIT [pendiente], con domicilio en Colombia, es responsable del tratamiento de los datos personales que sus usuarios y clientes suministran a través de este sitio web y de los demás canales de atención.</p>

        <h2>2. Finalidad del tratamiento</h2>
        <p>Los datos personales recolectados serán utilizados para la gestión comercial y contractual de los servicios de internet, cámaras de seguridad y sistemas de energía solar, la atención de solicitudes, peticiones, quejas y reclamos (PQRS), el envío de información sobre productos y servicios, y el cumplimiento de obligaciones legales y regulatorias.</p>

        <h2>3. Derechos del titular</h2>
        <p>De acuerdo con la Ley 1581 de 2012, el titular de los datos tiene derecho a conocer, actualizar, rectificar y suprimir su información personal, así como a revocar la autorización otorgada para su tratamiento, salvo las excepciones previstas por la ley.</p>

        <h2>4. Procedimiento para ejercer sus derechos</h2>
        <p>El titular podrá ejercer sus derechos a través del canal de PQRS disponible en este sitio web o mediante los datos de contacto que se encuentran en el pie de página.</p>

        <h2>5. Vigencia</h2>
        <p>La presente política rige a partir de su publicación y permanecerá vigente mientras se mantenga el tratamiento de los datos personales conforme a las finalidades aquí descritas.</p>
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
