<template>
  <footer class="foot container">
    <div class="foot-panel">
      <div class="foot-grid">
        <div class="col brand-col">
          <router-link to="/" class="brand">
            <span class="badge"><img src="/img/Icono-01.svg" alt="" width="30" height="30" /></span>
            <span>Cam Network</span>
          </router-link>
          <p class="tagline">{{ t('footer.tagline') }}</p>
          <p class="follow">{{ t('footer.follow') }}</p>
          <div class="socials">
            <a href="https://www.instagram.com/cam_network" class="ig" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100038899093481" class="fb" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99h-2.5v-2.88h2.5V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.88h-2.33v6.99A10 10 0 0 0 22 12z"/></svg>
            </a>
            <a :href="whatsappLink('asesorias')" class="wa" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
            </a>
          </div>
        </div>

        <div class="col">
          <h3>{{ t('footer.linksTitle') }}</h3>
          <router-link to="/">{{ t('nav.inicio') }}</router-link>
          <router-link to="/empresa/quienes-somos">{{ t('nav.quienesSomos') }}</router-link>
          <router-link to="/cobertura">{{ t('nav.cobertura') }}</router-link>
          <router-link to="/contacto">{{ t('nav.contacto') }}</router-link>
        </div>

        <div class="col">
          <h3>{{ t('footer.legalTitle') }}</h3>
          <router-link to="/legal/politica-tratamiento-datos">{{ t('footer.politicaDatos') }}</router-link>
          <router-link to="/legal/aviso-privacidad">{{ t('footer.avisoPrivacidad') }}</router-link>
          <router-link to="/legal/terminos-condiciones">{{ t('footer.terminos') }}</router-link>
          <router-link to="/normatividad">{{ t('nav.normatividad') }}</router-link>
          <!-- Decreto 1524 de 2002, art. 6 num. 7: enlace de denuncia visible en todo el sitio -->
          <router-link to="/normatividad#proteccion-infantil" class="report-link">{{ t('footer.childReport') }}</router-link>
        </div>

        <div class="col">
          <h3>{{ t('footer.contactTitle') }}</h3>
          <a v-for="(line, key) in LINEAS" :key="key" :href="'tel:+' + line.number" class="phone">
            <span>{{ t('lineas.' + key) }}</span>{{ line.display }}
          </a>
          <a href="mailto:comercial@camnetworksoluciones.com">comercial@camnetworksoluciones.com</a>
        </div>
      </div>

      <div class="bottom-bar">
        <span>© {{ year }} Cam Network Soluciones S.A.S. — {{ t('footer.rights') }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { LINEAS, whatsappLink } from '../../data/contacto.js';

const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<style scoped>
.foot { padding-block: 1rem 1.5rem }
.foot-panel {
  position: relative; overflow: hidden;
  border-radius: var(--r-xl);
  color: rgba(255,255,255,.82);
  background:
    radial-gradient(60% 120% at 100% 0%, rgba(34,197,94,.22) 0%, rgba(34,197,94,0) 60%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--shadow-lg);
  padding: 3rem clamp(1.4rem, 4vw, 3rem) 0;
}
.foot-grid {
  display: grid; grid-template-columns: 1.6fr 1fr 1fr 1.3fr; gap: 2.5rem;
  padding-bottom: 2.5rem;
}
.col { display: flex; flex-direction: column; gap: .7rem; min-width: 0 }
.col h3 { font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #fff; margin: 0 0 .3rem }
.col a { font-size: .9rem; color: rgba(255,255,255,.75); transition: color .2s ease; overflow-wrap: anywhere }
.col a:hover { color: var(--green-3) }
.col a:focus-visible { outline: 2px solid var(--green-3); outline-offset: 2px; border-radius: 3px }
.col a.phone { display: flex; flex-direction: column; line-height: 1.3; color: #fff; font-weight: 600 }
.col a.phone span { font-size: .74rem; font-weight: 500; color: rgba(255,255,255,.6) }

.brand-col .brand { display: flex; align-items: center; gap: .65rem; font-weight: 800; font-size: 1.15rem; color: #fff; text-transform: uppercase; letter-spacing: .01em; margin-bottom: .4rem }
.brand-col .badge {
  display: grid; place-items: center; width: 42px; height: 42px; border-radius: 12px;
  background: #fff; box-shadow: 0 6px 16px rgba(0,0,0,.2);
}
.tagline { font-size: .9rem; color: rgba(255,255,255,.72); max-width: 32ch; margin: 0 }
.follow { margin: .9rem 0 .2rem; font-size: .8rem; font-weight: 600; color: #fff }
.socials { display: flex; gap: .6rem }
.socials a {
  width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; color: #fff;
  box-shadow: 0 6px 14px rgba(0,0,0,.25);
  transition: transform .2s ease;
}
.socials a:hover { transform: translateY(-3px); color: #fff }
.socials .fb { background: #1877f2 }
.socials .ig { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285aeb 90%) }
.socials .wa { background: #25d366 }


.bottom-bar {
  border-top: 1px solid rgba(255,255,255,.12);
  padding: 1.2rem 0; font-size: .8rem; color: rgba(255,255,255,.6);
  text-align: center;
}

@media (max-width: 900px) {
  .foot-grid { grid-template-columns: 1fr 1fr; }
  .brand-col { grid-column: 1 / -1 }
}
@media (max-width: 520px) {
  .foot-grid { grid-template-columns: 1fr; }
}
</style>
