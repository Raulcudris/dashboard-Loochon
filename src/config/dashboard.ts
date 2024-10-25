import { DashboardConfig } from '../types/';

export const dashboardConfig: DashboardConfig = {
	sidebarItems: [
		{
			path: '/locations',
			title: 'Ciudades y provincias',
			icon: 'world'
		},
		{
			title: 'Ocupaciones',
			path: '/activities',
			icon: 'briefcase'
		},
		{
			title: 'Usuarios',
			path: '/users',
			icon: 'user'
		}
	]
};
