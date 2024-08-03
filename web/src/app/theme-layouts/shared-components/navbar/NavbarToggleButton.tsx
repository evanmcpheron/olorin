import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectOlorinCurrentSettings, setDefaultSettings } from '@olorin/core/OlorinSettings/olorinSettingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { OlorinSettingsConfigType } from '@olorin/core/OlorinSettings/OlorinSettings';
import { navbarToggle, navbarToggleMobile } from './navbarSlice';

type NavbarToggleButtonProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props: NavbarToggleButtonProps) {
	const {
		className = '',
		children = (
			<OlorinSvgIcon
				size={20}
				color="action"
			>
				heroicons-outline:view-list
			</OlorinSvgIcon>
		),
	} = props;

	const dispatch = useAppDispatch();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const settings: OlorinSettingsConfigType = useAppSelector(selectOlorinCurrentSettings);
	const { config } = settings.layout;

	return (
		<IconButton
			className={className}
			color="inherit"
			size="small"
			onClick={() => {
				if (isMobile) {
					dispatch(navbarToggleMobile());
				} else if (config?.navbar?.style === 'style-2') {
					dispatch(
						setDefaultSettings(
							_.set({}, 'layout.config.navbar.folded', !settings?.layout?.config?.navbar?.folded),
						),
					);
				} else {
					dispatch(navbarToggle());
				}
			}}
		>
			{children}
		</IconButton>
	);
}

export default NavbarToggleButton;
