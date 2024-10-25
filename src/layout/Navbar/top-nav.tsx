import {
	Avatar,
	Badge,
	Box,
	Button,
	CircularProgress,
	IconButton,
	Stack,
	SvgIcon,
	Tooltip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useSession } from 'next-auth/react';

import { Icons } from '../../components/Icons';
import { layoutConfig } from '../../config/layout';
import { usePopover } from '../../hooks/use-popover';
import { AccountPopover } from './account-popover';

export const TopNav = ({ onNavOpen }: { onNavOpen: () => void }) => {
	const { data: session, status } = useSession();
	const { anchorEl, handleClick, handleClose, id, open } = usePopover();

	return (
		<>
			<Box
				component='header'
				sx={{
					backdropFilter: 'blur(6px)',
					backgroundColor: theme =>
						alpha(theme.palette.background.default, 0.8),
					position: 'sticky',
					left: {
						lg: `${layoutConfig.SIDE_NAV_WIDTH}px`
					},
					top: 0,
					width: {
						lg: `calc(100% - ${layoutConfig.SIDE_NAV_WIDTH}px)`
					},
					zIndex: theme => theme.zIndex.appBar
				}}
			>
				<Stack
					alignItems='center'
					direction='row'
					justifyContent='space-between'
					spacing={2}
					sx={{
						minHeight: layoutConfig.TOP_NAV_HEIGHT,
						px: 2
					}}
				>
					<Stack alignItems='center' direction='row' spacing={2}>
						<IconButton
							sx={{ display: { xs: 'block', lg: 'none' } }}
							onClick={onNavOpen}
						>
							<SvgIcon fontSize='small'>
								<Icons.menu />
							</SvgIcon>
						</IconButton>
						<Tooltip title='Search'>
							<IconButton>
								<SvgIcon fontSize='small'>
									<Icons.search />
								</SvgIcon>
							</IconButton>
						</Tooltip>
					</Stack>
					<Stack alignItems='center' direction='row' spacing={2}>
						<Tooltip title='Contacts'>
							<IconButton>
								<SvgIcon fontSize='small'>
									<Icons.user />
								</SvgIcon>
							</IconButton>
						</Tooltip>
						<Tooltip title='Notifications'>
							<IconButton>
								<Badge badgeContent={4} color='success' variant='dot'>
									<SvgIcon fontSize='small'>
										<Icons.bell />
									</SvgIcon>
								</Badge>
							</IconButton>
						</Tooltip>
						{status === 'loading' && (
							<Button onClick={handleClick} size='small' disabled>
								<CircularProgress size={20} />
							</Button>
						)}
						{status === 'authenticated' && (
							<Button onClick={handleClick} size='small'>
								<Avatar
									sx={{
										cursor: 'pointer',
										height: 40,
										width: 40
									}}
									src={
										session.user?.image ||
										'../avatars/avatar-anika-visser.png'
									}
								/>
							</Button>
						)}
					</Stack>
				</Stack>
			</Box>
			<AccountPopover
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				id={id}
			/>
		</>
	);
};
