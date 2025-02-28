import { paths } from '@/config/paths';
import type { NavItemConfig } from '@/interface/nav';

export const navItems = [
  {
    key: 'reported-offers',
    title: 'Gestión de ofertas denunciadas',
    //href: paths.dashboard.reportedOffers, // Asegúrate de que esta ruta esté definida en paths.ts
    icon: 'warning', // Usa el icono de advertencia
    disabled: true, // Deshabilitado porque no tiene ruta definida
  },
  {
    key: 'users',
    title: 'Gestión de usuarios',
    href: paths.dashboard.users,
    icon: 'users', // Usa el icono de usuarios
  },
  {
    key: 'applications',
    title: 'Gestión de postulaciones',
    //href: paths.dashboard.applications, // Asegúrate de que esta ruta esté definida en paths.ts
    icon: 'file-text', // Usa el icono de documentos
    disabled: true, // Deshabilitado porque no tiene ruta definida
  },
  {
    key: 'ads',
    title: 'Gestión de publicidad',
    //href: paths.dashboard.ads, // Asegúrate de que esta ruta esté definida en paths.ts
    icon: 'megaphone', // Usa el icono de megáfono
    disabled: true, // Deshabilitado porque no tiene ruta definida
  },
  {
    key: 'cities',
    title: 'Ciudades y municipios',
    href: paths.dashboard.coordenates,
    icon: 'map-pin', // Usa el icono de ubicación
  },
  {
    key: 'occupations',
    title: 'Servicios y ocupaciones',
    href: paths.dashboard.occupations,
    icon: 'briefcase', // Usa el icono de maletín
  },
  {
    key: 'settings',
    title: 'Configuraciones',
    href: paths.dashboard.settings, // Asegúrate de que esta ruta esté definida en paths.ts
    icon: 'gear-six', // Usa el icono de engranaje
  },
  {
    key: 'notifications',
    title: 'Notificaciones',
    //href: paths.dashboard.notifications, // Asegúrate de que esta ruta esté definida en paths.ts
    icon: 'bell', // Usa el icono de campana
    disabled: true, // Deshabilitado porque no tiene ruta definida
  },
] satisfies NavItemConfig[];