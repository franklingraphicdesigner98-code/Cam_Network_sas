<template>
  <component
    :is="tag"
    v-bind="linkAttrs"
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

// Solo los atributos que aplican a cada caso: si a RouterLink se le pasa href=null,
// el <a> se genera sin href (no se puede enfocar con teclado ni lo sigue Google).
const linkAttrs = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' };
  return { type: props.type || 'button' };
});
</script>
