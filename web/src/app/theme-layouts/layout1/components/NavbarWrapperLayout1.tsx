import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { selectOlorinCurrentLayoutConfig, selectNavbarTheme } from '@olorin/core/OlorinSettings/olorinSettingsSlice';
import { Layout1ConfigDefaultsType } from 'app/theme-layouts/layout1/Layout1Config';
import NavbarToggleFabLayout1 from 'app/theme-layouts/layout1/components/NavbarToggleFabLayout1';
import { useLocation } from 'react-router';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { navbarCloseMobile, selectOlorinNavbar } from 'app/theme-layouts/shared-components/navbar/navbarSlice';
import NavbarStyle1 from './navbar/style-1/NavbarStyle1';
import NavbarStyle2 from './navbar/style-2/NavbarStyle2';
import NavbarStyle3 from './navbar/style-3/NavbarStyle3';

/**
 * The navbar wrapper layout 1.
 */
function NavbarWrapperLayout1() {
	const config = useAppSelector(selectOlorinCurrentLayoutConfig) as Layout1ConfigDefaultsType;
	const navbar = useAppSelector(selectOlorinNavbar);
	const location = useLocation();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { pathname } = location;
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isMobile) {
			dispatch(navbarCloseMobile());
		}
	}, [pathname, isMobile]);

	const navbarTheme = useAppSelector(selectNavbarTheme);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<>
					{config.navbar.style === 'style-1' && <NavbarStyle1 />}
					{config.navbar.style === 'style-2' && <NavbarStyle2 />}
					{config.navbar.style === 'style-3' && <NavbarStyle3 />}
					{config.navbar.style === 'style-3-dense' && <NavbarStyle3 dense />}
				</>
			</ThemeProvider>
			{config.navbar.display && !config.toolbar.display && !navbar.open && <NavbarToggleFabLayout1 />}
		</>
	);
}

export default NavbarWrapperLayout1;
