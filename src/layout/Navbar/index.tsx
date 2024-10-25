import Head from 'next/head';
import { useState } from 'react';

import { styled } from '@mui/material/styles';

import { layoutConfig } from '../../config/layout';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';

const LayoutRoot = styled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	maxWidth: '100%',
	[theme.breakpoints.up('lg')]: {
		paddingLeft: layoutConfig.SIDE_NAV_WIDTH
	}
}));

const LayoutContainer = styled('div')({
	display: 'flex',
	flex: '1 1 auto',
	flexDirection: 'column',
	width: '100%'
});

export const Layout = ({
	children,
	title
}: {
	children: React.ReactNode;
	title: string;
}) => {
	const [openNav, setOpenNav] = useState(false);

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<TopNav onNavOpen={() => setOpenNav(true)} />
			<SideNav
				drawerWidth={layoutConfig.SIDE_NAV_WIDTH}
				onClose={() => setOpenNav(false)}
				open={openNav}
			/>
			<LayoutRoot>
				<LayoutContainer>{children}</LayoutContainer>
			</LayoutRoot>
		</>
	);
};
