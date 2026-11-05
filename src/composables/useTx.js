import { useI18n } from 'vue-i18n';

// Texto en el idioma activo para los datos que traen { es, en } (src/data/*.js); si falta, usa el español.
export function useTx() {
  const { locale } = useI18n();
  return (o) => (o && (o[locale.value] || o.es)) || '';
}
