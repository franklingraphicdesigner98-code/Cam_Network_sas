<template>
  <div class="ig">
    <div class="ig-frame">
      <iframe
        :src="embedUrl" :title="title"
        loading="lazy" scrolling="no" allowtransparency="true"
        allow="encrypted-media; picture-in-picture; clipboard-write"
      />
    </div>
    <a :href="postUrl" target="_blank" rel="noopener" class="ig-link">
      <Instagram :size="16" /> {{ linkLabel }} <ExternalLink :size="14" />
    </a>
  </div>
</template>

<script setup>
// Publicación o reel de Instagram embebido con un iframe nativo (sin librerías ni descargas).
// `post` acepta la URL completa (https://www.instagram.com/p/ID/ o /reel/ID/) o solo el ID.
import { computed } from 'vue';
import { Instagram, ExternalLink } from 'lucide-vue-next';

const props = defineProps({
  post: { type: String, required: true },
  title: { type: String, default: 'Instagram' },
  linkLabel: { type: String, default: 'Ver en Instagram' }
});

const postId = computed(() => {
  const match = props.post.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#]+)/);
  return match ? match[1] : props.post.replace(/\//g, '');
});
const postUrl = computed(() => `https://www.instagram.com/p/${postId.value}/`);
const embedUrl = computed(() => `${postUrl.value}embed`);
</script>

<style scoped>
.ig { width: 100%; max-width: 440px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: .8rem }
.ig-frame {
  position: relative; width: 100%;
  /* Instagram muestra el video recortado a 4:5 dentro del embed (no se puede cambiar desde aquí);
     el alto = video 4:5 + encabezado y pie del embed (~180 px), sin espacio en blanco sobrante */
  height: calc(min(100vw - 32px, 440px) * 1.25 + 182px);
  border-radius: var(--r-lg); overflow: hidden;
  background: #fff; border: 1px solid var(--border); box-shadow: var(--shadow-lg);
}
.ig-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0 }
.ig-link {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .88rem; font-weight: 600; color: var(--green-deep);
}
.ig-link:hover { text-decoration: underline }
</style>
