import OlorinUtils from '@olorin/utils';
import OlorinLoading from '@olorin/core/OlorinLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import { OlorinRouteConfigsType, OlorinRoutesType } from '@olorin/utils/OlorinUtils';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import PagesConfigs from '../main/pages/pagesConfigs';
import DashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import AppsConfigs from '../main/apps/appsConfigs';
import UserInterfaceConfigs from '../main/user-interface/UserInterfaceConfigs';
import DocumentationConfig from '../main/documentation/DocumentationConfig';
import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';

const routeConfigs: OlorinRouteConfigsType = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	DocumentationConfig,
	...PagesConfigs,
	...UserInterfaceConfigs,
	...DashboardsConfigs,
	...AppsConfigs,
	...authRoleExamplesConfigs,
];

/**
 * The routes of the application.
 */
const routes: OlorinRoutesType = [
	...OlorinUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/dashboards/project" />,
		auth: settingsConfig.defaultAuth,
	},
	{
		path: 'loading',
		element: <OlorinLoading />,
	},
	{
		path: '404',
		element: <Error404Page />,
	},
	{
		path: '*',
		element: <Navigate to="404" />,
	},
];

export default routes;
