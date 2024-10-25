import Image from 'next/image';

import { Box, Container, Stack } from '@mui/material';

import { Layout } from '../layout/Navbar/index';
//import logoValledupar from '@public/assets/logo-valledupar.png';
import logoValledupar from '../../public/logos/logo-github.png';

const HomePage = () => {
	return (
		<Layout title='Prestamos | ActiBike'>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 8
				}}
			>
				<Container maxWidth='xl'>
					<Stack spacing={3}>
						<Stack direction='row' justifyContent='space-between' spacing={4}>
							<Stack spacing={1}>
								<Stack alignItems='center' spacing={1}>
									<Box
										sx={{
											mb: 3,
											textAlign: 'center'
										}}
									>
										<Image
											alt='Under development'
											//src={logoValledupar}
											src={ logoValledupar }
											style={{
												display: 'inline-block',
												width: '100%'
											}}
										/>
									</Box>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</Container>
			</Box>
		</Layout>
	);
};

export default HomePage;
