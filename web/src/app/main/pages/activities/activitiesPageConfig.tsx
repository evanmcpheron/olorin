import { OlorinRouteConfigType } from '@olorin/utils/OlorinUtils';
import { lazy } from 'react';

const ActivitiesPage = lazy(() => import('./ActivitiesPage'));

/**
 * The activities page config.
 */
const activitiesPageConfig: OlorinRouteConfigType = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: 'pages/activities',
			element: <ActivitiesPage />,
		},
	],
};

export default activitiesPageConfig;
