//import { Icons } from '@/shared/components/Icons';
import {
    Card,
    InputAdornment,
    OutlinedInput,
    OutlinedInputProps,
    SvgIcon
} from '@mui/material';
import { FC } from 'react';

interface Props extends OutlinedInputProps {}

export const TextBoxSearch: FC<Props> = props => {
	return (
		<Card sx={{ p: 2 }}>
			<OutlinedInput
				defaultValue=''
				fullWidth
				startAdornment={
					<InputAdornment position='start'>
						<SvgIcon color='action' fontSize='small'>
							<Icons.search />
						</SvgIcon>
					</InputAdornment>
				}
				sx={{ maxWidth: 500 }}
				{...props}
			/>
		</Card>
	);
};
