import {
	Box,
	Divider,
	MenuItem,
	MenuList,
	Popover,
	Typography
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { FC } from 'react';

interface Props {
	anchorEl: HTMLButtonElement | null;
	onClose: () => void;
	open: boolean;
	id: string | undefined;
}

export const AccountPopover: FC<Props> = ({ anchorEl, onClose, open, id }) => {
	const { data: session } = useSession();

	return (
		<Popover
			anchorEl={anchorEl}
			id={id}
			onClose={onClose}
			open={open}
			anchorOrigin={{
				horizontal: 'left',
				vertical: 'bottom'
			}}
			slotProps={{ paper: { sx: { width: 200 } } }}
		>
			<Box
				sx={{
					py: 1.5,
					px: 2
				}}
			>
				<Typography variant='overline'>Cuenta</Typography>
				<Typography color='text.secondary' variant='body2'>
					{session?.user?.name}
				</Typography>
			</Box>
			<Divider />
			<MenuList
				disablePadding
				dense
				sx={{
					p: '8px',
					'& > *': {
						borderRadius: 1
					}
				}}
			>
				<MenuItem onClick={() => signOut({ callbackUrl: '/auth/login' })}>
					{/* <MenuItem onClick={handleSignOut}> */}
					Cerrar sesión
				</MenuItem>
			</MenuList>
		</Popover>
	);
};
