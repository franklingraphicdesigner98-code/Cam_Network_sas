<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    :type="!to && !href ? (type || 'button') : undefined"
    class="btn"
    :class="`btn-${variant}`"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' } // primary | secondary | outline
});

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'));
</script>
