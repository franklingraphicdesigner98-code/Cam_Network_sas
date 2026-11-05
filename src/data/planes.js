// Planes de internet que se muestran en /servicios/internet (sin precios: solo rango de velocidad).
//
// TODO: poner los Mbps reales. Para cada plan:
//   name      → nombre del plan (se muestra tal cual)
//   speedMin  → velocidad mínima del rango en Mbps (número). null = se muestra "— a — Mbps"
//   speedMax  → velocidad máxima del rango en Mbps (número)
//   featured  → true para destacar el plan recomendado
// Se pueden agregar o quitar planes; las tarjetas se generan solas.
export const planes = {
  urbano: [
    { id: 'urbano-basico', name: 'Plan Básico', speedMin: null, speedMax: null },     // TODO: __ a __ Mbps
    { id: 'urbano-medio', name: 'Plan Medio', speedMin: null, speedMax: null, featured: true },   // TODO: __ a __ Mbps
    { id: 'urbano-completo', name: 'Plan Completo', speedMin: null, speedMax: null }  // TODO: __ a __ Mbps
  ],
  rural: [
    { id: 'rural-basico', name: 'Plan Básico', speedMin: null, speedMax: null },      // TODO: __ a __ Mbps
    { id: 'rural-medio', name: 'Plan Medio', speedMin: null, speedMax: null, featured: true },    // TODO: __ a __ Mbps
    { id: 'rural-completo', name: 'Plan Completo', speedMin: null, speedMax: null }   // TODO: __ a __ Mbps
  ]
};

// Fotos que se alternan en las tarjetas de Internet urbano y rural.
// Copias livianas de 800×450 en public/img/servicios/internet/. Para cambiar una, reemplaza el archivo
// o agrega su ruta aquí. El corporativo tiene foto fija.
// Urbano: solo fotos de casco urbano. Rural: solo fotos de campo.
// TODO (urbano): falta 1 foto urbana para llegar a 5.
export const fotosInternet = {
  urbano: [
    '/img/servicios/internet/urbano-1.webp',   // vista de San Gil (servicios/internet-urbano.webp)
    '/img/servicios/internet/urbano-2.webp',   // calle de la oficina (oficina-cam-network.jpeg)
    '/img/servicios/internet/urbano-3.webp',   // equipo de camisa verde con carrete de fibra (WhatsApp Image 2026-11-04 at 12.37.45.jpeg)
    '/img/servicios/internet/urbano-4.webp'    // técnico con escalera junto a una casa (WhatsApp Image 2026-09-15 at 17.51.47 (2).jpeg)
  ],
  rural: [
    '/img/servicios/internet/rural-1.webp',    // camioneta frente al valle (internet-rural-01.jpeg)
    '/img/servicios/internet/rural-2.webp',    // camioneta junto a la torre en la finca (internet-rural-10.jpeg)
    '/img/servicios/internet/rural-3.webp',    // camioneta junto a la cascada (internet-rural-16.jpeg)
    '/img/servicios/internet/rural-4.webp',    // antena sobre la finca (internet-rural-28.jpeg)
    '/img/servicios/internet/rural-5.webp'     // técnico a caballo (internet-rural-31.jpeg)
  ]
};

// Cuánto tiempo se ve cada foto antes de pasar a la siguiente (milisegundos)
export const INTERVALO_FOTOS = 2000;


// Fotos que se alternan en el encabezado de /servicios/internet (antenas y equipo instalando).
// Copias de 960×600 en public/img/servicios/internet/encabezado/. Cambian cada INTERVALO_FOTOS.
export const fotosEncabezadoInternet = [
  { src: '/img/servicios/internet/encabezado/internet-1.webp', alt: { es: 'Antena de Cam Network en lo alto de una montaña', en: 'Cam Network antenna on a mountaintop' } },
  { src: '/img/servicios/internet/encabezado/internet-2.webp', alt: { es: 'Técnico subiendo a una torre de telecomunicaciones', en: 'Technician climbing a telecommunications tower' } },
  { src: '/img/servicios/internet/encabezado/internet-3.webp', alt: { es: 'Torre con antenas de enlace', en: 'Tower with link antennas' } },
  { src: '/img/servicios/internet/encabezado/internet-4.webp', alt: { es: 'Equipo de Cam Network instalando fibra óptica', en: 'Cam Network team installing fiber optics' } },
  { src: '/img/servicios/internet/encabezado/internet-5.webp', alt: { es: 'Técnico instalando una torre junto a la camioneta de Cam Network', en: 'Technician installing a tower next to the Cam Network truck' } }
];
