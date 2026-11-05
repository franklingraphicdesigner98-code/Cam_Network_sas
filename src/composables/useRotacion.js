import { ref, onMounted, onBeforeUnmount } from 'vue';

// Carga y decodifica una lista de imágenes (resuelve aunque alguna falle).
export function precargarImagenes(srcs) {
  return Promise.all(srcs.map((src) => {
    const im = new Image();
    im.src = src;
    return im.decode().catch(() => {});
  }));
}

// Espera a que un <img> ya puesto en la página esté cargado y decodificado (evita saltos al mostrarlo).
export function decodificar(im) {
  if (!im) return Promise.reject(new Error('sin imagen'));
  if (im.complete && !im.naturalWidth) return Promise.reject(new Error('no cargó'));
  const cargada = im.complete ? Promise.resolve() : new Promise((res, rej) => {
    im.addEventListener('load', res, { once: true });
    im.addEventListener('error', rej, { once: true });
  });
  return cargada.then(() => (im.decode ? im.decode() : undefined));
}

// Contador que avanza solo cada `intervalo` ms (para carruseles de fotos con fundido).
//   precargar → rutas que se cargan antes de empezar (opcional)
//   auto      → false para arrancarlo a mano con iniciar()
// Con "reducir movimiento" no avanza: se queda en la primera foto.
export function useRotacion(intervalo, { precargar = [], auto = true } = {}) {
  const paso = ref(0);
  let timer = null;
  async function iniciar() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (precargar.length) await precargarImagenes(precargar);
    clearInterval(timer);
    timer = setInterval(() => { paso.value++; }, intervalo);
  }
  if (auto) onMounted(iniciar);
  onBeforeUnmount(() => clearInterval(timer));
  return { paso, iniciar };
}
