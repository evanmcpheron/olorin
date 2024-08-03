import OlorinScrollbars from '@olorin/core/OlorinScrollbars';
import IconButton from '@mui/material/IconButton';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import Typography from '@mui/material/Typography';
import OlorinSettings from '@olorin/core/OlorinSettings/OlorinSettings';
import OlorinSettingsViewerDialog from 'app/theme-layouts/shared-components/OlorinSettingsViewerDialog';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import { SwipeableHandlers } from 'react-swipeable';

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0,
	},
}));

type TransitionProps = {
	children?: React.ReactElement;
};

const Transition = forwardRef((props: TransitionProps, ref) => {
	const { children, ...other } = props;

	const theme = useTheme();

	if (!children) {
		return null;
	}

	return (
		<Slide
			direction={theme.direction === 'ltr' ? 'left' : 'right'}
			ref={ref}
			{...other}
		>
			{children}
		</Slide>
	);
});

type SettingsPanelProps = {
	settingsHandlers: SwipeableHandlers;
	onClose: () => void;
	open: boolean;
};

function SettingsPanel(props: SettingsPanelProps) {
	const { settingsHandlers, onClose, open } = props;

	return (
		<StyledDialog
			TransitionComponent={Transition}
			aria-labelledby="settings-panel"
			aria-describedby="settings"
			open={open}
			onClose={onClose}
			BackdropProps={{ invisible: true }}
			classes={{
				paper: 'shadow-lg',
			}}
			{...settingsHandlers}
		>
			<OlorinScrollbars className="p-16 sm:p-32 space-y-32">
				<IconButton
					className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
					onClick={onClose}
					size="large"
				>
					<OlorinSvgIcon>heroicons-outline:x</OlorinSvgIcon>
				</IconButton>

				<Typography
					className="font-semibold"
					variant="h6"
				>
					Theme Settings
				</Typography>

				<OlorinSettings />

				<div className="py-32">
					<OlorinSettingsViewerDialog />
				</div>
			</OlorinScrollbars>
		</StyledDialog>
	);
}

export default SettingsPanel;
