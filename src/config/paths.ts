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
    //Usuarios 
    users: '/dashboard/users',
    userList: '/dashboard/users/user-list', 
    activityHistory: '/dashboard/users/activity-history',
    blockUnblock:'/dashboard/users/block-unblock',
    identityVerification:'/dashboard/users/identity-verification',
    // Coordenadas y ubicaciones
    coordenates: '/dashboard/coordenates',
    coordenatesList: '/dashboard/coordenates/coordenates-list',
    // Ocupaciones y servicios    
    occupations: '/dashboard/occupations',
    occupationsList: '/dashboard/occupations/occupations-list',
    //integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    //reportedOffers: '/dashboard/reportedOffers',
    //applications :'/dashboard/applications',
    //ads :'/dashboard/adds',
    notifications : '/dashboard/notifications'
  },
  errors: { notFound: '/errors/not-found' }
  ,
} as const;
