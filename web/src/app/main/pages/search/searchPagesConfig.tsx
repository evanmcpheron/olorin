import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { OlorinRouteConfigType } from '@olorin/utils/OlorinUtils';

const ClassicSearchPage = lazy(() => import('./ClassicSearchPage'));
const ModernSearchPage = lazy(() => import('./ModernSearchPage'));

/**
 * The search pages config.
 */
const searchPagesConfig: OlorinRouteConfigType = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: 'pages/search',
			children: [
				{
					path: '',
					element: <Navigate to="modern" />,
				},
				{
					path: 'modern',
					element: <ModernSearchPage />,
				},
				{
					path: 'classic',
					element: <ClassicSearchPage />,
				},
			],
		},
	],
};

export default searchPagesConfig;
