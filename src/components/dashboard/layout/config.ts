import { paths } from '@/config/paths';
import type { NavItemConfig } from '@/interface/nav';

export const navItems = [
  {
    key: 'overview',
    title: 'Resumen',
    href: paths.dashboard.overview,
    icon: 'chart-pie'
  },
  {
    key: 'users',
    title: 'Usuarios',
    href: paths.dashboard.users,
    icon: 'users'
  } ,
  {
    key: 'coordenates',
    title: 'Coordenadas',
    href: paths.dashboard.coordenates,
    icon: 'gear-six'
 },
 {
    key: 'settings',
    title: 'Configuraciones',
    href: paths.dashboard.settings,
    icon: 'gear-six'
  },
  {
    key: 'account',
    title: 'Cuenta',
    href: paths.dashboard.account,
    icon: 'user'
  },
  {
     key: 'error',
     title: 'Error',
     href: paths.errors.notFound,
     icon: 'x-square'
  },
] satisfies NavItemConfig[];
