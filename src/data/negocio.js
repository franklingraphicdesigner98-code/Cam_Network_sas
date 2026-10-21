// Datos del negocio para Google y las IA de búsqueda (datos estructurados LocalBusiness, schema.org).
// No se ven en la página: van en el <head> de todas las páginas. Deben coincidir EXACTAMENTE con los
// del Perfil de Empresa de Google, las redes y los directorios (nombre, dirección y teléfono).
import { LINEAS, EMAIL } from './contacto.js';
import { municipios } from './planes.js';

const tel = (n) => `+${n}`;

export function negocioJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cam Network Soluciones S.A.S.',
    description: 'Internet por fibra óptica e inalámbrico, cámaras de seguridad y energía solar para hogares, fincas y empresas en San Gil y otros municipios de Santander.',
    url: siteUrl,
    logo: `${siteUrl}/img/logotipo-horizontal.png`,
    image: `${siteUrl}/img/logotipo-horizontal.png`,
    email: EMAIL,
    telephone: tel(LINEAS.asesorias.number),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle 11 #9-19, Local 103',
      addressLocality: 'San Gil',
      addressRegion: 'Santander',
      addressCountry: 'CO'
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '12:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:30', closes: '17:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '13:00' }
    ],
    // zona de servicio: las localidades con cobertura (src/data/planes.js)
    areaServed: municipios.map((m) => ({ '@type': 'Place', name: `${m}, Santander, Colombia` })),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', telephone: tel(LINEAS.asesorias.number), availableLanguage: 'es' },
      { '@type': 'ContactPoint', contactType: 'billing support', telephone: tel(LINEAS.facturacion.number), availableLanguage: 'es' },
      { '@type': 'ContactPoint', contactType: 'technical support', telephone: tel(LINEAS.soporte.number), availableLanguage: 'es' }
    ]
  };
}
