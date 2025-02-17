export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password'
  },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    users: '/dashboard/users',
    coordenates: '/dashboard/coordenates',
    occupations: '/dashboard/occupations',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' }
  ,
} as const;
