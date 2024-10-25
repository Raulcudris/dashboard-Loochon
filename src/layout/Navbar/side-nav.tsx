import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import {
	Box,
	Divider,
	Drawer,
	Stack,
	SvgIcon,
	Typography
} from '@mui/material';
import { LucideIcon } from 'lucide-react';

import { Icons } from '../../components/Icons';
import { Logo } from '../../components/Logo';
import { Scrollbar } from '../../components/Scrollbar';
import { dashboardConfig } from '../../config/dashboard';
import { SideNavItem } from '../../layout/Navbar/side-nav-item';

export const SideNav = ({
	open,
	onClose,
	drawerWidth
}: {
	open: boolean;
	onClose: () => void;
	drawerWidth: number;
}) => {
	const pathname = usePathname();

	const content = (
		<Scrollbar
			sx={{
				height: '100%',
				'& .simplebar-content': {
					height: '100%'
				},
				'& .simplebar-scrollbar:before': {
					background: 'neutral.400'
				}
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%'
				}}
			>
				<Box sx={{ p: 3 }}>
					<Box
						component={NextLink}
						href='/'
						sx={{
							display: 'inline-flex',
							height: 32,
							width: 32
						}}
					>
						<Logo />
					</Box>
					<Box
						sx={{
							alignItems: 'center',
							backgroundColor: 'rgba(255, 255, 255, 0.04)',
							borderRadius: 1,
							cursor: 'pointer',
							display: 'flex',
							justifyContent: 'space-between',
							mt: 2,
							p: '12px'
						}}
					>
						<div>
							<Typography color='inherit' variant='subtitle1'>
								ActiBike
							</Typography>
							<Typography color='neutral.400' variant='body2'>
								Dashboard
							</Typography>
						</div>
						<SvgIcon fontSize='small' sx={{ color: 'neutral.500' }}>
							<Icons.chevronUpDown />
						</SvgIcon>
					</Box>
				</Box>
				<Divider sx={{ borderColor: 'neutral.700' }} />
				<Box
					component='nav'
					sx={{
						flexGrow: 1,
						px: 2,
						py: 3
					}}
				>
					<Stack
						component='ul'
						spacing={0.5}
						sx={{
							listStyle: 'none',
							p: 0,
							m: 0
						}}
					>
						{dashboardConfig.sidebarItems.map(item => {
							const active = item.path === pathname;
							const Icon: LucideIcon =
								Icons[(item.icon as keyof typeof Icons) || 'chevronRight'];
							return (
								<SideNavItem
									active={active}
									icon={Icon}
									key={item.title}
									path={item.path}
									title={item.title}
									disabled={item.disabled}
									external={item.external}
								/>
							);
						})}
					</Stack>
				</Box>
				<Divider sx={{ borderColor: 'neutral.700' }} />
				<Box
					sx={{
						px: 2,
						py: 3
					}}
				>
					<Box
						sx={{
							display: 'flex',
							mt: 2,
							mx: 'auto',
							width: '160px',
							'& img': {
								width: '100%'
							}
						}}
					>
						<img alt='Go to pro' src='/assets/devias-kit-pro.png' />
					</Box>
				</Box>
			</Box>
		</Scrollbar>
	);

	return (
		<>
			<Drawer
				anchor='left'
				variant='temporary'
				open={open}
				onClose={onClose}
				ModalProps={{
					keepMounted: true // Better open performance on mobile.
				}}
				PaperProps={{
					sx: {
						backgroundColor: 'neutral.800',
						color: 'common.white',
						width: 280
					}
				}}
				sx={{
					display: { xs: 'block', lg: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
				}}
			>
				{content}
			</Drawer>
			<Drawer
				anchor='left'
				variant='permanent'
				sx={{
					display: { xs: 'none', lg: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
				}}
				PaperProps={{
					sx: {
						backgroundColor: 'neutral.800',
						color: 'common.white',
						width: 280
					}
				}}
				open
			>
				{content}
			</Drawer>
		</>
	);
};
