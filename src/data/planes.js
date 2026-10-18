// Planes de internet que se muestran en /servicios/internet.
//
// TODO: reemplazar por los planes reales. Para cada plan:
//   name      → nombre del plan (se muestra tal cual)
//   speed     → velocidad en Mbps (número). null = se muestra "— Mbps"
//   price     → precio mensual en pesos (número, ej. 65000). null = "Consulta el precio"
//   featured  → true para destacar el plan recomendado
// Se pueden agregar o quitar planes; las tarjetas se generan solas.
export const planes = {
  urbano: [
    { id: 'urbano-basico', name: 'Plan Básico', speed: null, price: null },
    { id: 'urbano-hogar', name: 'Plan Hogar', speed: null, price: null, featured: true },
    { id: 'urbano-plus', name: 'Plan Plus', speed: null, price: null }
  ],
  rural: [
    { id: 'rural-basico', name: 'Plan Rural Básico', speed: null, price: null },
    { id: 'rural-hogar', name: 'Plan Rural Hogar', speed: null, price: null, featured: true },
    { id: 'rural-plus', name: 'Plan Rural Plus', speed: null, price: null }
  ]
};

// Municipios con cobertura que se listan en la página de Internet
export const municipios = [
  'San Gil', 'Barichara', 'Villanueva', 'Cabrera', 'Curití',
  'Pinchote', 'Mogotes', 'Valle de San José', 'Páramo', 'Ocamonte',
  'San Joaquín', 'Pitiguao', 'San Miguel'
];
