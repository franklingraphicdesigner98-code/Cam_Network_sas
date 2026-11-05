// ÚNICA lista de lugares con cobertura. Todo el sitio la usa:
//   - mapa de /cobertura (los pines)            - lista de la página de Internet
//   - datos del negocio para Google (negocio.js) - descripción de /cobertura para Google
//   - el número de municipios en los textos ("Cobertura en {total} municipios")
// Para agregar o quitar un lugar, hazlo solo aquí.
//   name → como se muestra
//   x, y → posición del pin en el mapa de /cobertura, en % (x: oeste → este, y: norte → sur)
export const lugares = [
  { name: 'San Gil', x: 34, y: 56 },
  { name: 'Barichara', x: 13, y: 39 },
  { name: 'Villanueva', x: 26, y: 30 },
  { name: 'Cabrera', x: 5, y: 50 },
  { name: 'Curití', x: 46, y: 43 },
  { name: 'Pinchote', x: 19, y: 63 },
  { name: 'Mogotes', x: 60, y: 68 },
  { name: 'Pitiguao (Mogotes)', x: 70, y: 55 },
  { name: 'Valle de San José', x: 36, y: 75 },
  { name: 'Páramo', x: 17, y: 83 },
  { name: 'Ocamonte', x: 36, y: 95 },
  { name: 'San Joaquín', x: 80, y: 82 },
  { name: 'El Socorro', x: 6, y: 72 },
  { name: 'San Miguel (San Joaquín)', x: 89, y: 45 }
];

// Número de lugares (se usa en los textos como {total})
export const totalLugares = lugares.length;

// "San Gil, Barichara, … y San Miguel (San Joaquín)" en el idioma activo
export const listaLugares = (locale = 'es') =>
  new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(lugares.map((l) => l.name));
