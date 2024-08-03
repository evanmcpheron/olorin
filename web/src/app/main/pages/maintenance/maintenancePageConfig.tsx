import { lazy } from 'react';
import { OlorinRouteConfigType } from '@olorin/utils/OlorinUtils';

const MaintenancePage = lazy(() => import('./MaintenancePage'));

/**
 * The maintenance page config.
 */
const maintenancePageConfig: OlorinRouteConfigType = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: 'pages/maintenance',
			element: <MaintenancePage />,
		},
	],
};

export default maintenancePageConfig;
