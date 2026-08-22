import Home from '../views/Home.vue'

const SITE = 'Cam Network Soluciones S.A.S.'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: `${SITE} | Internet, Cámaras de Seguridad y Energía Solar`,
      description: 'Servicio de internet, cámaras de seguridad y sistemas de energía solar para hogares y empresas en Colombia.'
    }
  },
  {
    path: '/empresa/quienes-somos',
    name: 'quienes-somos',
    component: () => import('../views/empresa/QuienesSomos.vue'),
    meta: {
      title: `Quiénes Somos | ${SITE}`,
      description: 'Conoce la historia, la misión y los valores de Cam Network Soluciones S.A.S.'
    }
  },
  {
    path: '/empresa/nuestro-equipo',
    name: 'nuestro-equipo',
    component: () => import('../views/empresa/NuestroEquipo.vue'),
    meta: {
      title: `Nuestro Equipo | ${SITE}`,
      description: 'Conoce al equipo de profesionales detrás de Cam Network Soluciones S.A.S.'
    }
  },
  {
    path: '/cobertura',
    name: 'cobertura',
    component: () => import('../views/Cobertura.vue'),
    meta: {
      title: `Cobertura | ${SITE}`,
      description: 'Consulta las zonas de cobertura de nuestro servicio de internet, cámaras de seguridad y energía solar.'
    }
  },
  {
    path: '/planes',
    name: 'planes',
    component: () => import('../views/Planes.vue'),
    meta: {
      title: `Planes | ${SITE}`,
      description: 'Planes de internet hogar y empresarial con la mejor velocidad y cobertura.'
    }
  },
  {
    path: '/normatividad',
    name: 'normatividad',
    component: () => import('../views/Normatividad.vue'),
    meta: {
      title: `Normatividad | ${SITE}`,
      description: 'Normatividad vigente aplicable a los servicios de telecomunicaciones de Cam Network Soluciones S.A.S.'
    }
  },
  {
    path: '/usuarios/pqrs',
    name: 'pqrs',
    component: () => import('../views/usuarios/PQRS.vue'),
    meta: {
      title: `PQRS | ${SITE}`,
      description: 'Radica tus peticiones, quejas, reclamos y sugerencias con Cam Network Soluciones S.A.S.'
    }
  },
  {
    path: '/usuarios/test-velocidad',
    name: 'test-velocidad',
    component: () => import('../views/usuarios/TestVelocidad.vue'),
    meta: {
      title: `Test de Velocidad | ${SITE}`,
      description: 'Mide la velocidad de tu conexión a internet con Cam Network Soluciones S.A.S.'
    }
  },
  {
    path: '/usuarios/preguntas-frecuentes',
    name: 'preguntas-frecuentes',
    component: () => import('../views/usuarios/PreguntasFrecuentes.vue'),
    meta: {
      title: `Preguntas Frecuentes | ${SITE}`,
      description: 'Respuestas a las preguntas más frecuentes sobre nuestros servicios de internet, cámaras y energía solar.'
    }
  },
  {
    path: '/usuarios/opiniones',
    name: 'opiniones',
    component: () => import('../views/usuarios/OpinionesUsuarios.vue'),
    meta: {
      title: `Testimonios | ${SITE}`,
      description: 'Conoce la experiencia de nuestros usuarios con los servicios de Cam Network Soluciones S.A.S.'
    }
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: () => import('../views/Contacto.vue'),
    meta: {
      title: `Contacto | ${SITE}`,
      description: 'Contáctanos y cotiza tu servicio de internet, cámaras de seguridad o energía solar.'
    }
  },
  {
    path: '/legal/politica-tratamiento-datos',
    name: 'politica-tratamiento-datos',
    component: () => import('../views/legal/PoliticaDatos.vue'),
    meta: {
      title: `Política de Tratamiento de Datos Personales | ${SITE}`,
      description: 'Política de tratamiento de datos personales de Cam Network Soluciones S.A.S., conforme a la Ley 1581 de 2012.'
    }
  },
  {
    path: '/legal/aviso-privacidad',
    name: 'aviso-privacidad',
    component: () => import('../views/legal/AvisoPrivacidad.vue'),
    meta: {
      title: `Aviso de Privacidad | ${SITE}`,
      description: 'Aviso de privacidad de Cam Network Soluciones S.A.S.'
    }
  },
  {
    path: '/legal/terminos-condiciones',
    name: 'terminos-condiciones',
    component: () => import('../views/legal/TerminosCondiciones.vue'),
    meta: {
      title: `Términos y Condiciones | ${SITE}`,
      description: 'Términos y condiciones de uso del sitio web y los servicios de Cam Network Soluciones S.A.S.'
    }
  }
]

export function scrollBehavior(to, from, savedPosition) {
  return savedPosition || { top: 0, behavior: 'smooth' }
}
