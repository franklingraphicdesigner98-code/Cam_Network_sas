// Configuración de la secuencia de fotogramas (componente HeroScrollSequence.vue).
// Los fotogramas van en /public/frames/ con nombres f_0001.webp … f_0NNN.webp.
export const FRAME_COUNT = 120;            // TODO: poner el número real de fotogramas
export const FRAME_PATH = '/frames/f_';    // prefijo; se completa con el número (4 dígitos) y la extensión
export const FRAME_EXT = '.webp';

// Etapas (3 a 5) que cambian con el progreso del scroll. Textos editables en español e inglés.
export const pasos = [
  {
    label: { es: 'Conexión', en: 'Connection' },
    title: { es: 'Conectamos tu hogar y tu negocio', en: 'We connect your home and business' },
    text: { es: 'Internet por fibra óptica en la ciudad y conexión inalámbrica en el campo.', en: 'Fiber optic internet in town and wireless connection in the countryside.' }
  },
  {
    label: { es: 'Seguridad', en: 'Security' },
    title: { es: 'Vigila lo que más te importa', en: 'Watch over what matters most' },
    text: { es: 'Cámaras de seguridad que ves desde tu celular.', en: 'Security cameras you can watch from your phone.' }
  },
  {
    label: { es: 'Energía', en: 'Energy' },
    title: { es: 'Energía solar para tu casa o finca', en: 'Solar energy for your home or farm' },
    text: { es: 'Genera tu propia energía y ahorra en tu factura.', en: 'Generate your own energy and save on your bill.' }
  },
  {
    label: { es: 'Soporte', en: 'Support' },
    title: { es: 'Siempre cerca de ti', en: 'Always close to you' },
    text: { es: 'Instalación y soporte técnico en 13 municipios de la región.', en: 'Installation and technical support in 13 towns in the region.' }
  }
];
