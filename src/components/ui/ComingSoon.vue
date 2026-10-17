<template>
  <section class="s">
    <div class="container">
      <div class="coming-soon reveal">
        <Construction :size="34" class="icon" />
        <h2>{{ t('comingSoon.title') }}</h2>
        <p class="lead">{{ t('comingSoon.body') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Construction } from 'lucide-vue-next';

const { t } = useI18n();
</script>

<style scoped>
.coming-soon {
  max-width: 520px; margin: 0 auto; text-align: center;
  padding: 3rem 2rem;
  background: #fff;
  border: 1px dashed var(--border);
  border-radius: var(--r-lg);
}
.coming-soon .icon { margin: 0 auto 1rem; color: var(--green) }
.coming-soon h2 { font-size: 1.4rem; font-weight: 700; margin: 0 0 .6rem; color: var(--ink) }
.coming-soon .lead { margin: 0 auto }
</style>
