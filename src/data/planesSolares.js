// Planes de energía solar (página /servicios/energia-solar, componente ServicioSolar.vue).
// Para editar un plan, cambia aquí sus textos en español (es) y en inglés (en).
//   capacidad   → se muestra como etiqueta destacada y va en el mensaje de WhatsApp
//   recomendado → true marca la tarjeta con el distintivo "Más elegido"
//   soporta     → equipos que el sistema tiene capacidad de alimentar (la empresa NO entrega esos equipos).
//                 Cada ítem lleva un ícono: camaras, tv, ventilador, internet, nevera, luces, lavadora
export const planesSolares = [
  {
    key: 'basico',
    nombre: { es: 'Plan Básico', en: 'Basic Plan' },
    capacidad: { es: '0 a 2.000 W', en: '0 to 2,000 W' },
    idealPara: { es: 'Necesidades pequeñas', en: 'Small needs' },
    soporta: [
      { icono: 'camaras', texto: { es: 'Unas cámaras', en: 'A few cameras' } },
      { icono: 'tv', texto: { es: 'Un televisor', en: 'One TV' } },
      { icono: 'ventilador', texto: { es: 'Un ventilador', en: 'One fan' } },
      { icono: 'internet', texto: { es: 'Internet', en: 'Internet' } }
    ]
  },
  {
    key: 'medio',
    nombre: { es: 'Plan Medio', en: 'Medium Plan' },
    capacidad: { es: '2.000 a 4.000 W', en: '2,000 to 4,000 W' },
    idealPara: { es: 'Una casa', en: 'A home' },
    recomendado: true,
    soporta: [
      { icono: 'tv', texto: { es: 'Un televisor', en: 'One TV' } },
      { icono: 'nevera', texto: { es: 'Nevera pequeña', en: 'Small fridge' } },
      { icono: 'luces', texto: { es: 'Luces', en: 'Lights' } },
      { icono: 'internet', texto: { es: 'Internet', en: 'Internet' } }
    ]
  },
  {
    key: 'completo',
    nombre: { es: 'Plan Completo', en: 'Complete Plan' },
    capacidad: { es: '4.000 W en adelante', en: '4,000 W and up' },
    idealPara: { es: 'Hogares con mayor consumo', en: 'Homes with higher consumption' },
    soporta: [
      { icono: 'tv', texto: { es: 'Dos televisores o más', en: 'Two or more TVs' } },
      { icono: 'nevera', texto: { es: 'Nevera grande', en: 'Large fridge' } },
      { icono: 'lavadora', texto: { es: 'Lavadora', en: 'Washing machine' } },
      { icono: 'luces', texto: { es: 'Luces', en: 'Lights' } },
      { icono: 'internet', texto: { es: 'Internet', en: 'Internet' } }
    ]
  }
];

// Fotos que se alternan en el encabezado de /servicios/energia-solar (copias de 960×600 en
// public/img/servicios/solar/) y cada cuánto cambian, en milisegundos.
export const fotosSolar = [
  { src: '/img/servicios/solar/solar-1.webp', alt: { es: 'Técnico de Cam Network instalando paneles solares en una casa', en: 'Cam Network technician installing solar panels on a house' } },
  { src: '/img/servicios/solar/solar-2.webp', alt: { es: 'Panel solar instalado en lo alto de un poste', en: 'Solar panel installed on top of a pole' } },
  { src: '/img/servicios/solar/solar-3.webp', alt: { es: 'Técnico instalando un repetidor con panel solar en la montaña', en: 'Technician installing a solar-powered repeater on the mountain' } },
  { src: '/img/servicios/solar/solar-4.webp', alt: { es: 'Panel solar con gotas de lluvia', en: 'Solar panel with raindrops' } },
  { src: '/img/servicios/solar/solar-5.webp', alt: { es: 'Poste con panel solar en zona rural', en: 'Pole with a solar panel in a rural area' } }
];
export const INTERVALO_SOLAR = 1000;
