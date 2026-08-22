<template>
  <AppNav />
  <main>
    <PageHero eyebrow="Empresa" title="¿Quiénes Somos?" subtitle="La historia, la misión y los valores de Cam Network Soluciones S.A.S." />

    <section class="s">
      <div class="container intro">
        <p class="lead reveal">
          Cam Network Soluciones S.A.S. es una empresa colombiana dedicada a brindar servicios de internet, cámaras
          de seguridad y sistemas de energía solar, comprometida con llevar tecnología confiable y accesible a los
          hogares y empresas de la región.
        </p>
      </div>
    </section>

    <section class="s mv-section">
      <div class="container mv-grid">
        <div class="mv-card card reveal">
          <span class="mv-icon mv-icon-green"><Target :size="24" /></span>
          <h2>Misión</h2>
          <p>
            Mejorar la calidad de vida de los hogares brindando soluciones tecnológicas a todos los sectores de
            nuestra región, destacándonos por ofrecer a nuestros clientes un servicio oportuno, de alta calidad y
            confiabilidad, a precios asequibles. Buscamos acercarnos cada día más a las comunidades, favoreciendo
            su inclusión digital y comprometiéndonos con el desarrollo de nuestra sociedad.
          </p>
        </div>
        <div class="mv-card card reveal reveal-1">
          <span class="mv-icon mv-icon-blue"><Eye :size="24" /></span>
          <h2>Visión</h2>
          <p>
            Ser la organización líder en la región en proporcionar la mejor experiencia en soluciones tecnológicas,
            supliendo las necesidades y expectativas de nuestros clientes, al consolidarnos como una empresa
            competitiva, eficiente, sólida y rentable, en permanente evolución y crecimiento, que contribuya al
            desarrollo económico y social del departamento y del país.
          </p>
        </div>
      </div>
    </section>

    <section class="s stats-section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow eyebrow-on-dark">Nuestro impacto</span>
          <h2 class="display">Cifras que nos respaldan</h2>
        </div>
        <div class="stats-grid">
          <div class="stat reveal">
            <p class="stat-num"><AnimatedCounter :target="1000" prefix="+" /></p>
            <p class="stat-label">Usuarios activos</p>
          </div>
          <div class="stat reveal reveal-1">
            <p class="stat-num"><AnimatedCounter :target="200" prefix="+" /></p>
            <p class="stat-label">Cámaras instaladas</p>
          </div>
          <div class="stat reveal reveal-2">
            <p class="stat-num"><AnimatedCounter :target="8" /></p>
            <p class="stat-label">Municipios con cobertura</p>
          </div>
          <div class="stat reveal reveal-3">
            <p class="stat-num"><AnimatedCounter :target="10" /></p>
            <p class="stat-label">Puestos de empleo generados</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  <AppFooter />
</template>

<script setup>
import { Target, Eye } from 'lucide-vue-next';
import AppNav from '../../components/landing/AppNav.vue';
import AppFooter from '../../components/landing/AppFooter.vue';
import PageHero from '../../components/ui/PageHero.vue';
import AnimatedCounter from '../../components/ui/AnimatedCounter.vue';
import { useReveal } from '../../composables/useReveal.js';

useReveal();
</script>

<style scoped>
.intro { max-width: 780px; margin: 0 auto; text-align: center }
.intro .lead { margin: 0 auto; font-size: 1.15rem }

.mv-section { padding-top: 0 }
.mv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.75rem }
.mv-card { padding: 2.4rem 2.2rem }
.mv-card h2 { margin: 0 0 .8rem; font-size: 1.35rem; font-weight: 800; color: var(--ink) }
.mv-card p { margin: 0; color: var(--ink-dim); line-height: 1.75 }
.mv-icon {
  display: inline-grid; place-items: center; width: 52px; height: 52px; border-radius: 14px;
  color: #fff; margin-bottom: 1.2rem;
}
.mv-icon-green { background: linear-gradient(135deg, var(--green-2), var(--green-deep)) }
.mv-icon-blue { background: linear-gradient(135deg, var(--blue-2), var(--blue)) }

.stats-section {
  background: linear-gradient(135deg, #00620f 0%, #003e0c 100%);
  color: #fff;
}
.stats-section .display { color: #fff }
.stats-section .eyebrow-on-dark {
  color: #fff; background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.25);
}
.stats-section .eyebrow-on-dark::before { background: #fff; box-shadow: none }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.75rem }
.stat { text-align: center }
.stat-num {
  margin: 0; font-size: clamp(2.1rem, 4vw, 2.8rem); font-weight: 800; line-height: 1;
  background: linear-gradient(135deg, #fff, #bbf7d0);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.stat-label { margin: .6rem 0 0; font-size: .88rem; color: rgba(255,255,255,.8) }

@media (max-width: 860px) {
  .mv-grid { grid-template-columns: 1fr }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2.2rem }
}
</style>
