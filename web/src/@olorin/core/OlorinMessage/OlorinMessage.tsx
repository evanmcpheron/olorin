import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import {
	hideMessage,
	selectOlorinMessageOptions,
	selectOlorinMessageState,
} from '@olorin/core/OlorinMessage/olorinMessageSlice';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import OlorinSvgIcon from '../OlorinSvgIcon';

export type OlorinMessageVariantType = 'success' | 'error' | 'warning' | 'info';

type StyledSnackbarProps = {
	variant?: OlorinMessageVariantType;
};

const StyledSnackbar = styled(Snackbar)<StyledSnackbarProps>(({ theme, variant }) => ({
	'& .OlorinMessage-content': {
		...(variant === 'success' && {
			backgroundColor: green[600],
			color: '#FFFFFF',
		}),

		...(variant === 'error' && {
			backgroundColor: theme.palette.error.dark,
			color: theme.palette.getContrastText(theme.palette.error.dark),
		}),

		...(variant === 'info' && {
			backgroundColor: blue[600],
			color: '#FFFFFF',
		}),

		...(variant === 'warning' && {
			backgroundColor: amber[600],
			color: '#FFFFFF',
		}),
	},
}));

const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info',
};

/**
 * OlorinMessage
 * The OlorinMessage component holds a snackbar that is capable of displaying message with 4 different variant. It uses the @mui/material React packages to create the components.
 */
function OlorinMessage() {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectOlorinMessageState);
	const options = useAppSelector(selectOlorinMessageOptions);

	return (
		<StyledSnackbar
			{...options}
			open={state}
			onClose={() => dispatch(hideMessage())}
		>
			<SnackbarContent
				className="OlorinMessage-content"
				message={
					<div className="flex items-center">
						{variantIcon[options.variant] && (
							<OlorinSvgIcon color="inherit">{variantIcon[options.variant]}</OlorinSvgIcon>
						)}
						<Typography className="mx-8">{options.message}</Typography>
					</div>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => dispatch(hideMessage())}
						size="large"
					>
						<OlorinSvgIcon>heroicons-outline:x</OlorinSvgIcon>
					</IconButton>,
				]}
			/>
		</StyledSnackbar>
	);
}

export default memo(OlorinMessage);
