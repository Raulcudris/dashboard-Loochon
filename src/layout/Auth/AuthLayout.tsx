import Head from 'next/head';
import NextLink from 'next/link';

import { Box } from '@mui/material';

import { Logo } from '../../components/Logo';

export const AuthLayout = ({
	children,
	title
}: {
	children: React.ReactNode;
	title: string;
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Box component='main' sx={{ display: 'flex', flex: '1 1 auto' }}>
				<Box
					component='header'
					sx={{
						left: 0,
						p: 3,
						position: 'fixed',
						top: 0,
						width: '100%'
					}}
				>
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
				</Box>
				{children}
			</Box>
		</>
	);
};
