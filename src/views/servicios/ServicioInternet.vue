<template>
  <ServiceLayout
    service-key="internet" :icon="Wifi"
    :title="t('servicios.internet.title')" :subtitle="t('servicios.internet.subtitle')" :stat="t('servicios.internet.stat')"
    :images="encabezado" image-ratio="16 / 10" :interval="INTERVALO_FOTOS"
  >
    <!-- Tipos de internet; cada tarjeta incluye sus propios planes -->
    <section class="svc-block">
      <div class="container">
        <h2 class="svc-heading reveal">{{ t('servicios.internet.typesTitle') }}</h2>
        <p class="svc-sub reveal">{{ t('servicios.internet.typesSub') }}</p>
        <div class="types">
          <article v-for="(type, i) in types" :key="type.key" class="type card reveal" :class="`reveal-${i + 1}`">
            <!-- urbano y rural: fotos que se alternan con fundido (src/data/planes.js → fotosInternet); corporativo: fija -->
            <figure class="type-photo" :class="{ rotating: type.photos }">
              <template v-if="type.photos">
                <img
                  v-for="(src, k) in type.photos" :key="src" :src="src"
                  :alt="k === activePhoto(type) ? t(`servicios.internet.${type.key}.imageAlt`) : ''"
                  :class="{ active: k === activePhoto(type) }" width="800" height="450"
                />
              </template>
              <img v-else :src="type.image" :alt="t(`servicios.internet.${type.key}.imageAlt`)" loading="lazy" width="800" height="450" />
            </figure>
            <IconTile :icon="type.icon" :size="56" class="type-icon" />
            <h3>{{ t(`servicios.internet.${type.key}.title`) }}</h3>
            <p>{{ t(`servicios.internet.${type.key}.text`) }}</p>
            <ul class="points">
              <li v-for="(point, j) in tm(`servicios.internet.${type.key}.points`)" :key="j">
                <Check :size="17" />{{ rt(point) }}
              </li>
            </ul>

            <!-- rural: fibra óptica "en camino" con barra de progreso (se llena al entrar la tarjeta en pantalla) -->
            <div v-if="type.key === 'rural'" class="on-way">
              <span class="on-way-tag"><Truck :size="18" aria-hidden="true" />{{ t('servicios.internet.rural.onWay') }}</span>
              <div class="progress" role="img" :aria-label="t('servicios.internet.rural.onWayText')"><span class="progress-fill" /></div>
              <p class="on-way-text">{{ t('servicios.internet.rural.onWayText') }}</p>
            </div>

            <!-- Planes urbanos / rurales (datos en src/data/planes.js) -->
            <div v-if="type.zone" class="type-plans">
              <span class="plans-label">{{ t('servicios.internet.plansLabel') }}</span>
              <div v-for="plan in planes[type.zone]" :key="plan.id" class="plan" :class="{ featured: plan.featured }">
                <div class="plan-info">
                  <span class="plan-name">{{ plan.name }}</span>
                  <span class="plan-speed">{{ speedRange(plan) }}</span>
                </div>
                <a :href="planLink(plan, type)" target="_blank" rel="noopener noreferrer" class="btn btn-sm" :class="plan.featured ? 'btn-primary' : 'btn-outline'">
                  {{ t('servicios.internet.choose') }}
                </a>
              </div>
            </div>

            <!-- Corporativo: cotización a la medida -->
            <div v-else class="type-plans corporate">
              <span class="plans-label">{{ t('servicios.internet.corporateForLabel') }}</span>
              <div v-for="(item, j) in tm('servicios.internet.corporateFor')" :key="j" class="plan">
                <span class="for-icon"><component :is="corporateIcons[j]" :size="18" /></span>
                <div class="plan-info">
                  <span class="plan-name">{{ rt(item.title) }}</span>
                  <span class="plan-price">{{ rt(item.text) }}</span>
                </div>
              </div>
              <a :href="corporateLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm corporate-cta">
                {{ t('servicios.internet.corporateCta') }}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Municipios -->
    <section class="svc-block">
      <div class="container">
        <div class="panel towns reveal">
          <div class="towns-copy">
            <h2 class="svc-heading">{{ t('servicios.internet.townsTitle') }}</h2>
            <p class="svc-sub">{{ t('servicios.internet.townsText') }}</p>
            <router-link :to="{ name: 'cobertura' }" class="pill-link">
              {{ t('servicios.internet.townsCta') }} <ChevronRight :size="14" />
            </router-link>
          </div>
          <ul class="town-list">
            <li v-for="lugar in lugares" :key="lugar.name"><MapPin :size="16" />{{ lugar.name }}</li>
          </ul>
        </div>
      </div>
    </section>
  </ServiceLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useRotacion } from '../../composables/useRotacion.js';
import { useI18n } from 'vue-i18n';
import { Wifi, Building2, Trees, Briefcase, Check, MapPin, ChevronRight, School, Store, Truck } from 'lucide-vue-next';
import ServiceLayout from '../../components/services/ServiceLayout.vue';
import IconTile from '../../components/ui/IconTile.vue';
import { planes, fotosInternet, fotosEncabezadoInternet, INTERVALO_FOTOS } from '../../data/planes.js';
import { useTx } from '../../composables/useTx.js';
import { lugares } from '../../data/cobertura.js';
import { whatsappLink } from '../../data/contacto.js';

const { t, tm, rt } = useI18n();
const tx = useTx();
// encabezado: antenas y equipo instalando (src/data/planes.js → fotosEncabezadoInternet)
const encabezado = computed(() => fotosEncabezadoInternet.map((f) => ({ src: f.src, alt: tx(f.alt) })));

// zone = clave de los planes en src/data/planes.js (el corporativo se cotiza a la medida)
const types = [
  { key: 'urban', icon: Building2, zone: 'urbano', label: 'urbanPlans', photos: fotosInternet.urbano },
  { key: 'rural', icon: Trees, zone: 'rural', label: 'ruralPlans', photos: fotosInternet.rural },
  { key: 'corporate', icon: Briefcase, image: '/img/servicios/internet/corporativo.webp' }   // de Internet_corporativo.png
];

// rango de velocidad del plan; sin datos se muestra "— a — Mbps"
const speedRange = (plan) => (plan.speedMin && plan.speedMax
  ? t('servicios.internet.speedRange', { min: plan.speedMin, max: plan.speedMax })
  : t('servicios.internet.speedPending'));

// ---------- Fotos que se alternan (urbano y rural); el tiempo está en src/data/planes.js ----------
const { paso: tick } = useRotacion(INTERVALO_FOTOS, { precargar: [...fotosInternet.urbano, ...fotosInternet.rural] });
const activePhoto = (type) => tick.value % type.photos.length;
// Mismo orden que servicios.internet.corporateFor en src/locales/*.js
const corporateIcons = [Building2, School, Store];
const corporateLink = computed(() => whatsappLink('asesorias', t('servicios.internet.corporateMsg')));
const planLink = (plan, type) => {
  const msg = t('servicios.internet.planMsg', { plan: plan.name, zona: t(`servicios.internet.${type.label}`) });
  return whatsappLink('asesorias', msg);
};
</script>

<style scoped>
/* ---------- Tipos con sus planes ---------- */
.types { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; align-items: stretch }
.type { display: flex; flex-direction: column; min-width: 0; padding: clamp(1.2rem, 3vw, 1.8rem); overflow: hidden }
/* foto de cabecera a sangre dentro de la tarjeta; el ícono queda montado sobre su borde inferior */
.type-photo {
  margin: calc(-1 * clamp(1.2rem, 3vw, 1.8rem)) calc(-1 * clamp(1.2rem, 3vw, 1.8rem)) 0;
  aspect-ratio: 16 / 9; overflow: hidden; background: var(--bg-2);
}
.type-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease }
/* fotos que se alternan: apiladas, solo la activa es visible (fundido suave) */
.type-photo.rotating { position: relative }

/* "En camino": la barra crece cuando la tarjeta aparece (clase .in de las animaciones de entrada) */
.on-way { margin: .2rem 0 1rem; padding: 1rem 1.1rem; border-radius: var(--r-md); background: #fbfdfa; box-shadow: var(--neu-lite-inset) }
.on-way-tag {
  display: inline-flex; align-items: center; gap: .45rem; padding: .4rem .95rem; border-radius: 999px;
  font-size: 1.05rem; font-weight: 800; color: #fff;
  background: linear-gradient(135deg, var(--green) 0%, var(--green-deep) 100%); box-shadow: 0 6px 16px rgba(22,163,74,.3);
}
.progress { position: relative; height: 10px; margin: .9rem 0 .55rem; border-radius: 999px; overflow: hidden; background: rgba(22,163,74,.14) }
.progress-fill {
  position: absolute; inset: 0; transform: scaleX(0); transform-origin: left; border-radius: inherit;
  background: linear-gradient(90deg, var(--green-3) 0%, var(--green) 60%, var(--green-deep) 100%);
  transition: transform 2.4s cubic-bezier(.2,.7,.2,1) .4s;
}
.type.in .progress-fill { transform: scaleX(1) }
/* brillo que recorre la barra */
.progress-fill::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
  animation: shine 2.2s ease-in-out 3s infinite; transform: translateX(-100%);
}
@keyframes shine { to { transform: translateX(100%) } }
.on-way-text { margin: 0; font-size: .9rem; font-weight: 600; line-height: 1.45; color: var(--green-deep) }
@media (prefers-reduced-motion: reduce) {
  .progress-fill { transform: none; transition: none }
  .progress-fill::after { animation: none; display: none }
}
.type-photo.rotating img { position: absolute; inset: 0; opacity: 0; transition: opacity .45s ease, transform .6s ease }
.type-photo.rotating img.active { opacity: 1 }
.type:hover .type-photo img { transform: scale(1.05) }
.type-icon { margin-top: -28px; position: relative; border: 3px solid #fff; box-sizing: content-box }
.type h3 { margin: 1rem 0 .5rem; font-size: 1.3rem; font-weight: 800; color: var(--ink) }
.type > p { margin: 0 0 1rem; color: var(--ink-dim); line-height: 1.65 }
.points { list-style: none; margin: 0 0 1.4rem; padding: 0; display: flex; flex-direction: column; gap: .5rem }
.points li { display: flex; gap: .5rem; align-items: flex-start; font-size: .92rem; color: var(--ink) }
.points li :deep(svg) { flex: none; color: var(--green); margin-top: 2px }

.type-plans {
  margin-top: auto; padding-top: 1.2rem; border-top: 1px dashed var(--border);
  display: flex; flex-direction: column; gap: .6rem;
}
.plans-label { font-size: .75rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--green) }
.plan {
  display: flex; align-items: center; justify-content: space-between; gap: .8rem;
  padding: .8rem .9rem; border-radius: 12px;
  background: var(--bg-1); border: 1px solid var(--border);
}
.plan.featured { background: var(--green-soft); border-color: rgba(22,163,74,.4) }
.plan-info { display: flex; flex-direction: column; min-width: 0; overflow-wrap: anywhere }
.plan-name { font-size: .9rem; font-weight: 800; color: var(--ink) }
.plan-speed { font-size: 1.15rem; font-weight: 800; letter-spacing: -.02em; color: var(--green-deep) }
.plan-price { font-size: .78rem; font-weight: 600; color: var(--ink-mute) }
.plan .btn { flex: none }

.corporate .plan { justify-content: flex-start }
.for-icon {
  flex: none; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 10px;
  color: var(--green-deep); background: #fff; border: 1px solid var(--border);
}
.corporate-cta { align-self: center; margin-top: .4rem }

/* ---------- Municipios ---------- */
.towns { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 1.5rem; padding: clamp(1.4rem, 3vw, 2rem); align-items: center }
.towns .svc-sub { margin-bottom: 1.2rem }
.town-list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .5rem }
.town-list li {
  display: inline-flex; align-items: center; gap: .35rem;
  padding: .45rem .85rem; border-radius: 999px;
  font-size: .88rem; font-weight: 600; color: var(--green-deep);
  background: var(--green-soft); border: 1px solid rgba(22,163,74,.2);
}

@media (max-width: 360px) {
  .plan { flex-wrap: wrap }
  .plan .btn { width: 100% }
}
@media (max-width: 1000px) {
  .types { grid-template-columns: 1fr; max-width: 640px; margin: 0 auto }
  .towns { grid-template-columns: 1fr }
}

/* neumorfismo luminoso (tokens --neu-lite-* en src/assets/tokens.css) */
.type { background: var(--neu-lite-bg); border: 0; box-shadow: var(--neu-lite-raised) }
.type:hover { box-shadow: var(--neu-lite-hover) }
/* filas de planes: "hundidas" en la tarjeta */
.plan { background: #fbfdfa; border: 0; box-shadow: var(--neu-lite-inset) }
.plan.featured { background: var(--green-soft); box-shadow: var(--neu-lite-inset), 0 0 0 1px rgba(22,163,74,.35) }
</style>
