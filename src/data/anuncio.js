// Barra de anuncio opcional, arriba del menú (componente AnnouncementBar.vue).
//   enabled → false = oculta (por defecto)
//   id      → cámbialo al publicar un anuncio nuevo: así vuelve a mostrarse a quien cerró el anterior
//   text / linkLabel → textos en español e inglés
//   link    → ruta interna ('/pago-en-linea') o enlace externo ('https://…'); null = sin enlace
export const anuncio = {
  enabled: false,
  id: 'anuncio-1',
  text: { es: '', en: '' },
  link: null,
  linkLabel: { es: '', en: '' }
};
