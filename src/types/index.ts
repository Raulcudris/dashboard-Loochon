import { Icons } from '../components/Icons';

export interface SidebarNavItem {
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	path: string;
	title: string;
}

export interface DashboardConfig {
	sidebarItems: SidebarNavItem[];
}

export interface Select {
	value: string;
	label: string;
}
