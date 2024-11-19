export const paths = {
  home: '/',
  auth: {
     signIn: '/auth/sign-in',
     signUp: '/auth/sign-up',
     resetPassword: '/auth/reset-password'
    },
  dashboard: {
    overview: '/dashboard',
    users: '/dashboard/users',
    account: '/dashboard/account',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
