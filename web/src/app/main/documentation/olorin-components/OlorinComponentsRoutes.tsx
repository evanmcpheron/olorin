import { lazy } from 'react';

const OlorinThemeDoc = lazy(() => import('./olorin-theme/OlorinThemeDoc'));
const OlorinAuthorizationDoc = lazy(() => import('./olorin-authorization/OlorinAuthorizationDoc'));
const OlorinLayoutDoc = lazy(() => import('./olorin-layout/OlorinLayoutDoc'));
const OlorinPageCardedDoc = lazy(() => import('./olorin-page-carded/OlorinPageCardedDoc'));
const OlorinPageSimpleDoc = lazy(() => import('./olorin-page-simple/OlorinPageSimpleDoc'));
const OlorinScrollbarsDoc = lazy(() => import('./olorin-scrollbars/OlorinScrollbarsDoc'));
const OlorinHighlightDoc = lazy(() => import('./olorin-highlight/OlorinHighlightDoc'));
const OlorinCountdownDoc = lazy(() => import('./olorin-countdown/OlorinCountdownDoc'));
const OlorinNavigationDoc = lazy(() => import('./olorin-navigation/OlorinNavigationDoc'));
const OlorinMessageDoc = lazy(() => import('./olorin-message/OlorinMessageDoc'));
const OlorinDialogDoc = lazy(() => import('./olorin-dialog/OlorinDialogDoc'));

/**
 * OlorinComponentsRoutes
 */
const OlorinComponentsRoutes = [
	{
		path: 'olorin-components/olorin-theme',
		element: <OlorinThemeDoc />,
	},
	{
		path: 'olorin-components/olorin-authorization',
		element: <OlorinAuthorizationDoc />,
	},
	{
		path: 'olorin-components/olorin-layout',
		element: <OlorinLayoutDoc />,
	},
	{
		path: 'olorin-components/olorin-page-carded',
		element: <OlorinPageCardedDoc />,
	},
	{
		path: 'olorin-components/olorin-page-simple',
		element: <OlorinPageSimpleDoc />,
	},
	{
		path: 'olorin-components/olorin-scrollbars',
		element: <OlorinScrollbarsDoc />,
	},
	{
		path: 'olorin-components/olorin-highlight',
		element: <OlorinHighlightDoc />,
	},
	{
		path: 'olorin-components/olorin-countdown',
		element: <OlorinCountdownDoc />,
	},
	{
		path: 'olorin-components/olorin-navigation',
		element: <OlorinNavigationDoc />,
	},
	{
		path: 'olorin-components/olorin-message',
		element: <OlorinMessageDoc />,
	},
	{
		path: 'olorin-components/olorin-dialog',
		element: <OlorinDialogDoc />,
	},
];

export default OlorinComponentsRoutes;
