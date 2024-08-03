import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { memo, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { usePrevious } from '@olorin/hooks';
import _ from '@lodash';
import SettingsPanel from 'app/theme-layouts/shared-components/configurator/SettingsPanel';
import ThemesPanel from 'app/theme-layouts/shared-components/configurator/ThemesPanel';
import { useAppSelector } from 'app/store/hooks';
import { User } from 'src/app/auth/user';
import { selectIsUserGuest, selectUser, selectUserSettings } from '../../../auth/user/store/userSlice';
import useAuth from '../../../auth/useAuth';

const Root = styled('div')(({ theme }) => ({
	position: 'absolute',
	height: 80,
	right: 0,
	top: 160,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden',
	padding: 0,
	borderTopLeftRadius: 6,
	borderBottomLeftRadius: 6,
	borderBottomRightRadius: 0,
	borderTopRightRadius: 0,
	zIndex: 999,
	color: theme.palette.getContrastText(red[500]),
	backgroundColor: red[400],
	'&:hover': {
		backgroundColor: red[500],
	},

	'& .settingsButton': {
		'& > span': {
			animation: 'rotating 3s linear infinite',
		},
	},

	'@keyframes rotating': {
		from: {
			transform: 'rotate(0deg)',
		},
		to: {
			transform: 'rotate(360deg)',
		},
	},
}));

/**
 * The settings panel.
 */
function Configurator() {
	const theme = useTheme();
	const [open, setOpen] = useState('');
	const isUserGuest = useAppSelector(selectIsUserGuest);
	const user = useAppSelector(selectUser);
	const userSettings = useAppSelector(selectUserSettings);
	const prevUserSettings = usePrevious(userSettings);

	const { updateUser } = useAuth();

	useEffect(() => {
		if (!isUserGuest && prevUserSettings && !_.isEqual(userSettings, prevUserSettings)) {
			updateUser(_.setIn(user, 'data.settings', userSettings) as User);
		}
	}, [isUserGuest, userSettings]);

	const handlerOptions = {
		onSwipedLeft: () => Boolean(open) && theme.direction === 'rtl' && handleClose(),
		onSwipedRight: () => Boolean(open) && theme.direction === 'ltr' && handleClose(),
	};

	const settingsHandlers = useSwipeable(handlerOptions);
	const schemesHandlers = useSwipeable(handlerOptions);

	const handleOpen = (panelId: string) => {
		setOpen(panelId);
	};

	const handleClose = () => {
		setOpen('');
	};

	return process.env.NODE_ENV === 'development' ? (
		<>
			<Root
				id="olorin-settings-panel"
				className="buttonWrapper"
			>
				<Button
					className="settingsButton m-0 h-40 w-40 min-w-40"
					onClick={() => handleOpen('settings')}
					variant="text"
					color="inherit"
					disableRipple
				>
					<span>
						<OlorinSvgIcon size={20}>heroicons-solid:cog</OlorinSvgIcon>
					</span>
				</Button>

				<Button
					className="m-0 h-40 w-40 min-w-40"
					onClick={() => handleOpen('schemes')}
					variant="text"
					color="inherit"
					disableRipple
				>
					<OlorinSvgIcon size={20}>heroicons-outline:color-swatch</OlorinSvgIcon>
				</Button>
			</Root>

			<SettingsPanel
				open={Boolean(open === 'settings')}
				onClose={handleClose}
				settingsHandlers={settingsHandlers}
			/>

			<ThemesPanel
				schemesHandlers={schemesHandlers}
				onClose={handleClose}
				open={Boolean(open === 'schemes')}
			/>
		</>
	) : null;
}

export default memo(Configurator);
