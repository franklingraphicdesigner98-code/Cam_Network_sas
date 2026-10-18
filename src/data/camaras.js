// Cámaras que se muestran en /servicios/camaras-de-seguridad.
//
// TODO: confirmar los modelos que realmente tienen disponibles.
//   key   → clave de los textos (nombre y descripción) en src/locales/*.js → servicios.camaras.products
//   image → foto del producto en /public/img/servicios/ (opcional; sin foto se muestra un ícono)
export const camaras = [
  { key: 'ptz', image: '/img/servicios/camara-ptz.webp' },
  { key: 'bullet', image: null },
  { key: 'dome', image: null }
];
