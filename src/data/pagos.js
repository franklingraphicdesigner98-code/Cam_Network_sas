// Medios de pago que se muestran en /pago-en-linea (textos en src/locales/*.js → pago.methods).
//   video  → video explicativo en /public/video/pagos/ (null = sin video)
//   ratio  → proporción del video: '9 / 16' vertical, '16 / 9' horizontal
//   logo   → logo del medio en /public/img/pagos/
//   number → número de convenio, cuenta o celular para pagar (null = no se muestra)
//            TODO: faltan los de Daviplata, Davivienda y ePayco.
//   ref    → true si además se paga con la cédula del cliente como referencia
//   link   → enlace para pagar directamente en línea (se muestra como botón)
// En este orden se muestran en /pago-en-linea y en el acceso rápido del inicio
export const mediosDePago = [
  { key: 'epayco', logo: '/img/pagos/epayco.webp', video: '/video/pagos/epayco.mp4', poster: '/video/pagos/epayco-portada.webp', ratio: '9 / 16', number: null, link: 'https://cnetwork1559111.epayco.me/recaudo/camnetworksolucionessas' },
  { key: 'efecty', logo: '/img/pagos/efecty.webp', video: null, number: '113425', ref: true },
  { key: 'davivienda', logo: '/img/pagos/davivienda.webp', video: '/video/pagos/davivienda.mp4', poster: '/video/pagos/davivienda-portada.webp', ratio: '9 / 16', number: null },
  { key: 'daviplata', logo: '/img/pagos/daviplata.webp', video: '/video/pagos/daviplata.mp4', poster: '/video/pagos/daviplata-portada.webp', ratio: '9 / 16', number: null },
  { key: 'bancolombia', logo: '/img/pagos/bancolombia.webp', video: '/video/pagos/bancolombia.mp4', poster: '/video/pagos/bancolombia-portada.webp', ratio: '16 / 9', number: '93441', ref: true }
];
