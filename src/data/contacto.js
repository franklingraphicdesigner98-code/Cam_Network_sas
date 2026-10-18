// Líneas de atención de Cam Network. Cambiar un número aquí lo actualiza en todo el sitio.
// El nombre de cada área está en src/locales/*.js → lineas.<clave>
export const LINEAS = {
  asesorias: { number: '573104697936', display: '310 469 7936' },   // ventas, cotizaciones, planes
  facturacion: { number: '573112280533', display: '311 228 0533' }, // pagos y facturas
  soporte: { number: '573112286504', display: '311 228 6504' }      // fallas técnicas
};

export const EMAIL = 'comercial@camnetworksoluciones.com';

// Enlace de WhatsApp a una línea, con un mensaje ya escrito (opcional)
export function whatsappLink(linea, mensaje = '') {
  const base = `https://wa.me/${LINEAS[linea].number}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
