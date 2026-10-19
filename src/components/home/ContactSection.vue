<template>
  <section :id="pqrs ? 'pqrs' : 'contacto'" class="block">
    <div class="container">
      <div class="panel contact reveal">
        <div class="contact-intro">
          <h2 class="section-title">{{ pqrs ? t('home.pqrsForm.title') : t('home.contact.title') }}</h2>
          <p class="section-sub">{{ pqrs ? t('home.pqrsForm.sub') : t('home.contact.sub') }}</p>
          <div class="art" aria-hidden="true">
            <span class="art-glow" />
            <IconTile :icon="Mail" :size="92" tone="soft" class="art-mail" />
            <IconTile :icon="MessageCircleMore" :size="64" tone="soft" class="art-chat" />
            <IconTile :icon="Phone" :size="84" shape="circle" class="art-phone" />
          </div>
        </div>

        <form class="form" @submit.prevent="send">
          <label class="field">
            <User :size="17" class="field-icon" />
            <input v-model.trim="form.name" type="text" required autocomplete="name" :placeholder="t('home.contact.name')" :aria-label="t('home.contact.name')" />
          </label>
          <label class="field">
            <Mail :size="17" class="field-icon" />
            <input v-model.trim="form.email" type="email" required autocomplete="email" :placeholder="t('home.contact.email')" :aria-label="t('home.contact.email')" />
          </label>
          <label class="field">
            <PenLine :size="17" class="field-icon" />
            <input v-model.trim="form.subject" type="text" :placeholder="t('home.contact.subject')" :aria-label="t('home.contact.subject')" />
          </label>
          <label class="field field-select">
            <span class="select-label">{{ pqrs ? t('home.pqrsForm.type') : t('home.contact.service') }}</span>
            <!-- PQRS: tipo de solicitud -->
            <select v-if="pqrs" v-model="form.service" required>
              <option value="" disabled>{{ t('home.contact.choose') }}</option>
              <option v-for="key in pqrsTypes" :key="key" :value="key">{{ t(`home.pqrsForm.types.${key}`) }}</option>
            </select>
            <select v-else v-model="form.service" required>
              <option value="" disabled>{{ t('home.contact.choose') }}</option>
              <option v-for="key in serviceKeys" :key="key" :value="key">{{ t(`home.services.items.${key}`) }}</option>
              <option value="otro">{{ t('home.contact.other') }}</option>
            </select>
            <ChevronDown :size="17" class="select-chev" />
          </label>
          <label class="field field-area">
            <MessageSquare :size="17" class="field-icon" />
            <textarea v-model.trim="form.message" rows="4" required :placeholder="t('home.contact.message')" :aria-label="t('home.contact.message')" />
          </label>
          <div class="form-foot">
            <p class="note">{{ t('home.contact.note') }}</p>
            <button type="submit" class="btn btn-primary">
              {{ pqrs ? t('home.pqrsForm.send') : t('home.contact.send') }} <Send :size="17" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { Mail, MessageCircleMore, Phone, User, PenLine, MessageSquare, ChevronDown, Send } from 'lucide-vue-next';
import IconTile from '../ui/IconTile.vue';
import { whatsappLink } from '../../data/contacto.js';

// pqrs = true → mismo formulario como "Radica tu PQRS" (página /usuarios/pqrs)
const props = defineProps({
  pqrs: { type: Boolean, default: false }
});

const { t } = useI18n();
const pqrsTypes = ['peticion', 'queja', 'reclamo', 'sugerencia'];
const route = useRoute();

const serviceKeys = ['internet', 'solar', 'camaras', 'instalacion'];
const form = reactive({ name: '', email: '', subject: '', service: '', message: '' });

// Los botones "Información" de Servicios llegan con ?servicio=<clave>
watch(() => route.query.servicio, (s) => {
  if (!props.pqrs && serviceKeys.includes(s)) form.service = s;
}, { immediate: true });

function send() {
  const service = props.pqrs
    ? t(`home.pqrsForm.types.${form.service}`)
    : form.service === 'otro' ? t('home.contact.other') : t(`home.services.items.${form.service}`);
  const lines = [
    props.pqrs ? t('home.pqrsForm.waIntro') : t('home.contact.waIntro'),
    '',
    `*${t('home.contact.name')}:* ${form.name}`,
    `*${t('home.contact.email')}:* ${form.email}`,
    form.subject ? `*${t('home.contact.subject')}:* ${form.subject}` : null,
    `*${props.pqrs ? t('home.pqrsForm.type') : t('home.contact.service')}:* ${service}`,
    '',
    form.message
  ].filter((l) => l !== null);
  const url = whatsappLink('asesorias', lines.join('\n'));
  window.open(url, '_blank', 'noopener');
}
</script>

<style scoped>
.block { padding: 1.25rem 0 }
.contact {
  display: grid; grid-template-columns: minmax(0, .75fr) minmax(0, 1.6fr); gap: 1.5rem;
  padding: 2rem 1.8rem;
}
.contact-intro { display: flex; flex-direction: column }

.art { position: relative; flex: 1; min-height: 190px; margin-top: 1rem }
.art-glow {
  position: absolute; left: 10%; right: 0; bottom: 4%; height: 60%;
  border-radius: 50%; background: radial-gradient(closest-side, rgba(74,222,128,.35), rgba(74,222,128,0));
}
.art :deep(.icon-tile) { position: absolute }
.art-mail { left: 4%; bottom: 14% }
.art-chat { left: 38%; bottom: 6% }
.art-phone { left: 52%; bottom: 38%; transform: rotate(-12deg) }

.form {
  display: grid; grid-template-columns: 1fr 1fr; gap: .9rem;
  padding: 1.2rem; border-radius: var(--r-md);
  background: var(--bg-1);
}
.field {
  position: relative; display: flex; align-items: center;
  background: #fff; border: 1px solid var(--border); border-radius: 12px;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.field:focus-within { border-color: var(--green); box-shadow: 0 0 0 4px rgba(22,163,74,.12) }
.field-icon { position: absolute; left: .95rem; top: 1rem; color: var(--ink-mute); pointer-events: none }
.field input, .field textarea, .field select {
  width: 100%; border: 0; outline: 0; background: transparent;
  font: inherit; font-size: .9rem; color: var(--ink);
}
.field input, .field textarea { padding: .85rem 1rem .85rem 2.75rem }
.field textarea { resize: vertical; min-height: 120px }
.field input::placeholder, .field textarea::placeholder { color: var(--ink-mute) }

.field-select { flex-direction: column; align-items: stretch; padding: .45rem 1rem .4rem }
.select-label { font-size: .7rem; color: var(--ink-mute) }
.field select { appearance: none; -webkit-appearance: none; padding: .1rem 1.6rem .1rem 0; font-weight: 500; cursor: pointer }
.select-chev { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--ink); pointer-events: none }

.field-area { grid-column: 1 / -1; align-items: flex-start }
.form-foot { grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap }
.note { margin: 0; font-size: .78rem; color: var(--ink-mute) }
.form-foot .btn { margin-left: auto }

@media (max-width: 900px) {
  .contact { grid-template-columns: 1fr }
  .art { display: none }
}
@media (max-width: 560px) {
  .contact { padding: 1.4rem }
  .form { grid-template-columns: 1fr; padding: .9rem }
  .form-foot .btn { width: 100%; margin-left: 0 }
}
</style>
