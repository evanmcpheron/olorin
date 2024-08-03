// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from 'app/configs/routesConfig';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '@olorin/utils/ErrorBoundary';
import { enUS } from 'date-fns/locale/en-US';
import AppContext from './AppContext';
import store from './store/store';

type ComponentProps = {
	name?: string;
};

/**
 * A Higher Order Component that provides the necessary context providers for the app.
 */
function withAppProviders(Component: React.ComponentType<ComponentProps>) {
	/**
	 * The component that wraps the provided component with the necessary context providers.
	 */
	function WithAppProviders(props: React.PropsWithChildren<ComponentProps>) {
		/**
		 * The value to pass to the AppContext provider.
		 */
		const val = useMemo(
			() => ({
				routes,
			}),
			[routes],
		);

		return (
			<ErrorBoundary>
				<AppContext.Provider value={val}>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						adapterLocale={enUS}
					>
						<Provider store={store}>
							<StyledEngineProvider injectFirst>
								<Component {...props} />
							</StyledEngineProvider>
						</Provider>
					</LocalizationProvider>
				</AppContext.Provider>
			</ErrorBoundary>
		);
	}

	return WithAppProviders;
}

export default withAppProviders;
