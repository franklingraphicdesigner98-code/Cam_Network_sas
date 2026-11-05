<template>
  <PageLayout>
    <PageHero :title="t('pages.contacto.title')" :subtitle="t('pages.contacto.subtitle')" />
    <div class="contact-wrap"><ContactSection /></div>
  </PageLayout>
</template>

<script setup>
import PageLayout from '../components/landing/PageLayout.vue';
import { useI18n } from 'vue-i18n';
import PageHero from '../components/ui/PageHero.vue';
import ContactSection from '../components/home/ContactSection.vue';

const { t } = useI18n();
</script>

<style scoped>
.contact-wrap { padding: 1.5rem 0 4rem }
</style>
