<template>
  <ServiceLayout
    service-key="internet" :icon="Wifi"
    :title="t('servicios.internet.title')" :subtitle="t('servicios.internet.subtitle')" :stat="t('servicios.internet.stat')"
    image="/img/hero/montanas-antena-960.webp" :image-alt="t('servicios.internet.imageAlt')"
  >
    <!-- Tipos de internet; cada tarjeta incluye sus propios planes -->
    <section class="svc-block">
      <div class="container">
        <h2 class="svc-heading reveal">{{ t('servicios.internet.typesTitle') }}</h2>
        <p class="svc-sub reveal">{{ t('servicios.internet.typesSub') }}</p>
        <div class="types">
          <article v-for="(type, i) in types" :key="type.key" class="type card reveal" :class="`reveal-${i + 1}`">
            <IconTile :icon="type.icon" :size="56" />
            <h3>{{ t(`servicios.internet.${type.key}.title`) }}</h3>
            <p>{{ t(`servicios.internet.${type.key}.text`) }}</p>
            <ul class="points">
              <li v-for="(point, j) in tm(`servicios.internet.${type.key}.points`)" :key="j">
                <Check :size="17" />{{ rt(point) }}
              </li>
            </ul>

            <!-- Planes urbanos / rurales (datos en src/data/planes.js) -->
            <div v-if="type.zone" class="type-plans">
              <span class="plans-label">{{ t('servicios.internet.plansLabel') }}</span>
              <div v-for="plan in planes[type.zone]" :key="plan.id" class="plan" :class="{ featured: plan.featured }">
                <div class="plan-info">
                  <span class="plan-name">{{ plan.name }}</span>
                  <span class="plan-speed">
                    <template v-if="plan.speed">{{ plan.speed }} Mbps</template>
                    <template v-else>{{ t('servicios.internet.speedPending') }}</template>
                  </span>
                  <span class="plan-price">
                    <template v-if="plan.price">{{ formatCOP(plan.price) }} {{ t('servicios.internet.perMonth') }}</template>
                    <template v-else>{{ t('servicios.internet.pricePending') }}</template>
                  </span>
                </div>
                <a :href="planLink(plan, type)" target="_blank" rel="noopener noreferrer" class="btn btn-sm" :class="plan.featured ? 'btn-primary' : 'btn-outline'">
                  {{ t('servicios.internet.choose') }}
                </a>
              </div>
            </div>

            <!-- Corporativo: cotización a la medida -->
            <div v-else class="type-plans corporate">
              <strong>{{ t('servicios.internet.corporateCardTitle') }}</strong>
              <p>{{ t('servicios.internet.corporateCardText') }}</p>
              <a :href="corporateLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
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
            <li v-for="town in municipios" :key="town"><MapPin :size="16" />{{ town }}</li>
          </ul>
        </div>
      </div>
    </section>
  </ServiceLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Wifi, Building2, Trees, Briefcase, Check, MapPin, ChevronRight } from 'lucide-vue-next';
import ServiceLayout from '../../components/services/ServiceLayout.vue';
import IconTile from '../../components/ui/IconTile.vue';
import { planes, municipios } from '../../data/planes.js';
import { whatsappLink } from '../../data/contacto.js';

const { t, tm, rt, locale } = useI18n();

// zone = clave de los planes en src/data/planes.js (el corporativo se cotiza a la medida)
const types = [
  { key: 'urban', icon: Building2, zone: 'urbano', label: 'urbanPlans' },
  { key: 'rural', icon: Trees, zone: 'rural', label: 'ruralPlans' },
  { key: 'corporate', icon: Briefcase }
];

const formatCOP = (n) => new Intl.NumberFormat(locale.value === 'en' ? 'en-US' : 'es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0
}).format(n);
const corporateLink = computed(() => whatsappLink('asesorias', t('servicios.internet.corporateMsg')));
const planLink = (plan, type) => {
  const msg = t('servicios.internet.planMsg', { plan: plan.name, zona: t(`servicios.internet.${type.label}`) });
  return whatsappLink('asesorias', msg);
};
</script>

<style scoped>
/* ---------- Tipos con sus planes ---------- */
.types { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; align-items: stretch }
.type { display: flex; flex-direction: column; min-width: 0; padding: clamp(1.2rem, 3vw, 1.8rem) }
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

.corporate { align-items: flex-start }
.corporate strong { font-size: 1rem; color: var(--ink) }
.corporate p { margin: 0 0 .4rem; font-size: .9rem; line-height: 1.55; color: var(--ink-dim) }

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
</style>
