<template>
  <PageLayout>
    <PageHero :eyebrow="t('pages.usuariosEyebrow')" :title="t('pages.pqrs.title')" :subtitle="t('pages.pqrs.subtitle')" />
    <div class="pqrs-wrap"><ContactSection pqrs /></div>
  </PageLayout>
</template>

<script setup>
import PageLayout from '../../components/landing/PageLayout.vue';
import { useI18n } from 'vue-i18n';
import PageHero from '../../components/ui/PageHero.vue';
import ContactSection from '../../components/home/ContactSection.vue';

const { t } = useI18n();
</script>

<style scoped>
.pqrs-wrap { padding: 1.5rem 0 4rem }
</style>
