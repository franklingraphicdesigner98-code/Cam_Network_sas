<template>
  <!-- Líneas de atención bien visibles (ocupa el lugar que tenían las cifras de clientes).
       Números en src/data/contacto.js; nombres de cada línea en src/locales/*.js → lineas -->
  <section class="block">
    <div class="container">
      <div class="lines reveal">
        <h2>{{ t('contactLines.title') }}</h2>
        <p class="lines-sub">{{ t('contactLines.sub') }}</p>
        <ul class="lines-list">
          <li v-for="l in lineas" :key="l.key" class="line">
            <span class="line-icon" aria-hidden="true"><component :is="l.icon" :size="22" /></span>
            <div class="line-info">
              <span class="line-label">{{ t(`lineas.${l.key}`) }}</span>
              <a :href="`tel:+${l.number}`" class="line-number">{{ l.display }}</a>
            </div>
            <div class="line-actions">
              <a :href="`tel:+${l.number}`" class="line-btn call" :aria-label="t('contactLines.callAria', { linea: t(`lineas.${l.key}`), numero: l.display })">
                <Phone :size="18" /><span>{{ t('contactLines.call') }}</span>
              </a>
              <a :href="whatsappLink(l.key)" target="_blank" rel="noopener noreferrer" class="line-btn wa" :aria-label="t('contactLines.waAria', { linea: t(`lineas.${l.key}`) })">
                <MessageCircle :size="18" /><span>WhatsApp</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Phone, MessageCircle, Headset, Receipt, Wrench } from 'lucide-vue-next';
import { lineasAtencion, whatsappLink } from '../../data/contacto.js';

const { t } = useI18n();
const iconos = { soporte: Wrench, asesorias: Headset, facturacion: Receipt };
const lineas = lineasAtencion.map((l) => ({ ...l, icon: iconos[l.key] }));
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.lines {
  height: 100%; padding: clamp(1.6rem, 4vw, 2.4rem); border-radius: var(--r-lg); color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, rgba(34,197,94,.3) 0%, rgba(34,197,94,0) 65%),
    linear-gradient(140deg, var(--forest-2) 0%, var(--forest) 100%);
  box-shadow: var(--neu-dark-raised);
}
.lines h2 { margin: 0; font-size: clamp(1.3rem, 2.4vw, 1.7rem); font-weight: 800; letter-spacing: -.02em }
.lines-sub { margin: .4rem 0 1.4rem; color: rgba(255,255,255,.78); font-size: .95rem }
.lines-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .9rem }
.line {
  display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
  padding: 1rem 1.1rem; border-radius: var(--r-md);
  background: rgba(255,255,255,.06); box-shadow: var(--neu-dark-chip);
}
.line-icon {
  flex: none; display: grid; place-items: center; width: 46px; height: 46px; border-radius: 14px;
  color: #fff; background: linear-gradient(135deg, var(--green) 0%, var(--green-deep) 100%);
}
.line-info { display: flex; flex-direction: column; min-width: 0; flex: 1 1 9rem }
.line-label { font-size: .85rem; font-weight: 600; color: var(--green-3) }
.line-number { font-size: clamp(1.45rem, 2.6vw, 1.75rem); font-weight: 800; letter-spacing: -.01em; color: #fff; white-space: nowrap }
.line-number:hover { text-decoration: underline }
.line-actions { display: flex; gap: .5rem; width: 100% }
/* botones grandes: fáciles de tocar en celular (mínimo 44 px de alto) */
.line-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .4rem;
  min-height: 44px; padding: 0 1rem; border-radius: 999px; font-size: .88rem; font-weight: 700; color: #fff;
  transition: background .2s ease, transform .2s ease;
}
.line-btn:hover { transform: translateY(-1px) }
.line-btn { flex: 1 }
.line-btn.call { background: rgba(255,255,255,.12); border: 1.5px solid rgba(255,255,255,.35) }
.line-btn.call:hover { background: rgba(255,255,255,.2) }
.line-btn.wa { background: #22c55e }
.line-btn.wa:hover { background: #16a34a }
.line-btn:focus-visible, .line-number:focus-visible { outline: 3px solid #fff; outline-offset: 3px }

</style>
