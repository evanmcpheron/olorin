import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { selectOlorinCurrentLayoutConfig, selectToolbarTheme } from '@olorin/core/OlorinSettings/olorinSettingsSlice';
import { Layout2ConfigDefaultsType } from 'app/theme-layouts/layout2/Layout2Config';
import NotificationPanelToggleButton from 'src/app/main/apps/notifications/NotificationPanelToggleButton';
import NavbarToggleButton from 'app/theme-layouts/shared-components/navbar/NavbarToggleButton';
import { useAppSelector } from 'app/store/hooks';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NavigationShortcuts from '../../shared-components/navigation/NavigationShortcuts';
import NavigationSearch from '../../shared-components/navigation/NavigationSearch';
import UserMenu from '../../shared-components/UserMenu';
import QuickPanelToggleButton from '../../shared-components/quickPanel/QuickPanelToggleButton';

type ToolbarLayout2Props = {
	className?: string;
};

/**
 * The toolbar layout 2.
 */
function ToolbarLayout2(props: ToolbarLayout2Props) {
	const { className = '' } = props;

	const config = useAppSelector(selectOlorinCurrentLayoutConfig) as Layout2ConfigDefaultsType;
	const toolbarTheme = useAppSelector(selectToolbarTheme);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="olorin-toolbar"
				className={clsx('relative z-20 flex shadow-md', className)}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
			>
				<Toolbar className="container min-h-48 p-0 md:min-h-64 lg:px-24">
					{config.navbar.display && (
						<Hidden lgUp>
							<NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
						</Hidden>
					)}

					<div className="flex flex-1">
						<Hidden lgDown>
							<NavigationShortcuts />
						</Hidden>
					</div>

					<div className="flex h-full items-center overflow-x-auto px-8">
						<LanguageSwitcher />
						<AdjustFontSize />
						<FullScreenToggle />
						<NavigationSearch />
						<QuickPanelToggleButton />
						<NotificationPanelToggleButton />
						<UserMenu />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(ToolbarLayout2);
