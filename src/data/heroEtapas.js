// Portada del inicio (HeroSection.vue).
// Intro (cada vez que se abre el inicio): carga con la foto editada con brillos verdes; al primer scroll
// espera "pausa" y se vuelve transparente hasta dejar ver la foto normal. Luego sigue el carrusel normal:
// "Lejos" como primera diapositiva + las 5 fotos de siempre.
//
// Fotos en public/img/hero/. Si falta alguna, se avisa en la consola y no se usa reemplazo.
export const IMAGENES = {
  // copias livianas en WebP de "Editada verde.png" y "Lejos.jpg" (los originales siguen en la carpeta)
  editada: '/img/hero/editada-verde.webp',      // foto inicial (con brillos verdes)
  editadaMovil: '/img/hero/editada-verde-960.webp',
  lejos: '/img/hero/lejos.webp',                // foto de destino (sin edición)
  lejosMovil: '/img/hero/lejos-960.webp'
};

// Tiempos de la transición (en milisegundos)
export const TRANSICION = {
  pausa: 200,              // la foto editada sigue quieta después del primer scroll
  duracion: 600,            // lo que tarda en volverse transparente
  carrusel: 3500            // cada cuánto cambia la foto del carrusel (y su etapa): 1 s de fundido + 2,5 s visible
};

// Textos por etapa (editables) y nombre corto para el indicador lateral.
export const etapas = [
  {
    paso: { es: 'Conexión', en: 'Connection' },
    title: { es: 'Conectamos tu hogar y tu negocio', en: 'We connect your home and your business' },
    text: { es: 'Internet por fibra óptica, cámaras de seguridad, energía solar y soluciones tecnológicas de confianza.', en: 'Fiber optic internet, security cameras, solar energy and technology solutions you can trust.' }
  },
  {
    paso: { es: 'Señal', en: 'Signal' },
    title: { es: 'Llevamos la señal hasta donde estés', en: 'We bring the signal wherever you are' },
    text: { es: 'Desde nuestras torres conectamos la ciudad, las fincas y las veredas de la región.', en: 'From our towers we connect towns, farms and rural areas across the region.' }
  },
  {
    paso: { es: 'Energía', en: 'Energy' },
    title: { es: 'Energía solar y seguridad para tu casa', en: 'Solar energy and security for your home' },
    text: { es: 'Paneles solares y cámaras de seguridad instalados por nuestro equipo técnico.', en: 'Solar panels and security cameras installed by our technical team.' }
  },
  {
    paso: { es: 'Cobertura', en: 'Coverage' },
    title: { es: 'Presentes en 13 municipios', en: 'Present in 13 towns' },
    text: { es: 'Cerca de ti, con atención y soporte técnico en toda la región.', en: 'Close to you, with service and technical support across the region.' }
  }
];

// Etapa (índice en "etapas") que acompaña a cada diapositiva del carrusel.
export const etapaPorFoto = {
  lejos: 0,
  'montanas-antena': 1,
  'instalacion-solar': 2,
  'paneles-torre': 2,
  valle: 3,
  panorama: 3
};
