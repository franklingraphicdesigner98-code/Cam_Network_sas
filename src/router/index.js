import Home from '../views/Home.vue'

// meta.i18n apunta a la clave en src/locales/*.js → meta.<clave>.title / .description
export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { i18n: 'home', siteFirst: true }
  },
  {
    path: '/empresa/quienes-somos',
    name: 'quienes-somos',
    component: () => import('../views/empresa/QuienesSomos.vue'),
    meta: { i18n: 'quienesSomos' }
  },
  {
    path: '/empresa/nuestro-equipo',
    name: 'nuestro-equipo',
    component: () => import('../views/empresa/NuestroEquipo.vue'),
    meta: { i18n: 'nuestroEquipo' }
  },
  {
    path: '/servicios/internet',
    name: 'servicio-internet',
    component: () => import('../views/servicios/ServicioInternet.vue'),
    meta: { i18n: 'servicioInternet' }
  },
  {
    path: '/servicios/energia-solar',
    name: 'servicio-solar',
    component: () => import('../views/servicios/ServicioSolar.vue'),
    meta: { i18n: 'servicioSolar' }
  },
  {
    path: '/servicios/camaras-de-seguridad',
    name: 'servicio-camaras',
    component: () => import('../views/servicios/ServicioCamaras.vue'),
    meta: { i18n: 'servicioCamaras' }
  },
  {
    path: '/cobertura',
    name: 'cobertura',
    component: () => import('../views/Cobertura.vue'),
    meta: { i18n: 'cobertura' }
  },
  {
    path: '/planes',
    name: 'planes',
    component: () => import('../views/Planes.vue'),
    meta: { i18n: 'planes' }
  },
  {
    path: '/normatividad',
    name: 'normatividad',
    component: () => import('../views/Normatividad.vue'),
    meta: { i18n: 'normatividad' }
  },
  {
    path: '/usuarios/pqrs',
    name: 'pqrs',
    component: () => import('../views/usuarios/PQRS.vue'),
    meta: { i18n: 'pqrs' }
  },
  {
    path: '/usuarios/test-velocidad',
    name: 'test-velocidad',
    component: () => import('../views/usuarios/TestVelocidad.vue'),
    meta: { i18n: 'testVelocidad' }
  },
  {
    path: '/usuarios/preguntas-frecuentes',
    name: 'preguntas-frecuentes',
    component: () => import('../views/usuarios/PreguntasFrecuentes.vue'),
    meta: { i18n: 'preguntasFrecuentes' }
  },
  {
    path: '/usuarios/opiniones',
    name: 'opiniones',
    component: () => import('../views/usuarios/OpinionesUsuarios.vue'),
    meta: { i18n: 'opiniones' }
  },
  {
    path: '/pago-en-linea',
    name: 'pago-en-linea',
    component: () => import('../views/PagoEnLinea.vue'),
    meta: { i18n: 'pagoEnLinea' }
  },
  {
    path: '/nuestras-oficinas',
    name: 'nuestras-oficinas',
    component: () => import('../views/NuestrasOficinas.vue'),
    meta: { i18n: 'oficinas' }
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: () => import('../views/Contacto.vue'),
    meta: { i18n: 'contacto' }
  },
  {
    path: '/legal/politica-tratamiento-datos',
    name: 'politica-tratamiento-datos',
    component: () => import('../views/legal/PoliticaDatos.vue'),
    meta: { i18n: 'politicaDatos' }
  },
  {
    path: '/legal/aviso-privacidad',
    name: 'aviso-privacidad',
    component: () => import('../views/legal/AvisoPrivacidad.vue'),
    meta: { i18n: 'avisoPrivacidad' }
  },
  {
    path: '/legal/terminos-condiciones',
    name: 'terminos-condiciones',
    component: () => import('../views/legal/TerminosCondiciones.vue'),
    meta: { i18n: 'terminos' }
  }
]

export function scrollBehavior(to, from, savedPosition) {
  return savedPosition || { top: 0, behavior: 'smooth' }
}
