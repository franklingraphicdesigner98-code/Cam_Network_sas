<template>
  <PageLayout>
    <PageHero :eyebrow="t('pages.usuariosEyebrow')" :title="t('pages.opiniones.title')" :subtitle="t('pages.opiniones.subtitle')" />
    <ComingSoon />
  </PageLayout>
</template>

<script setup>
import PageLayout from '../../components/landing/PageLayout.vue';
import { useI18n } from 'vue-i18n';
import PageHero from '../../components/ui/PageHero.vue';
import ComingSoon from '../../components/ui/ComingSoon.vue';

const { t } = useI18n();
</script>
