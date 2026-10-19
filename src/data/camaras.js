// Cámaras que se muestran en /servicios/camaras-de-seguridad (encabezado y "Algunas de nuestras cámaras").
//   key   → clave de los textos (nombre y descripción) en src/locales/*.js → servicios.camaras.products
//   image → ficha del producto en /public/img/camaras/ (720×880 px)
// Para agregar una cámara: pon su imagen en esa carpeta, súmala aquí y agrega sus textos en ambos idiomas.
export const camaras = [
  { key: 'cruiserSc', image: '/img/camaras/cruiser-sc.webp' },
  { key: 'titanPro', image: '/img/camaras/titan-pro-aurora.webp' },
  { key: 'cruiserDual', image: '/img/camaras/cruiser-dual-2.webp' },
  { key: 'ranger2Pro', image: '/img/camaras/ranger-2-pro.webp' },
  { key: 'ranger', image: '/img/camaras/ranger.webp' },
  { key: 'rex', image: '/img/camaras/rex-4mp.webp' }
];
