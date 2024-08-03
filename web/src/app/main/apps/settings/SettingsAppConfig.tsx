import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SettingsApp = lazy(() => import('./SettingsApp'));
const AccountTab = lazy(() => import('./tabs/AccountTab'));
const SecurityTab = lazy(() => import('./tabs/SecurityTab'));
const PlanBillingTab = lazy(() => import('./tabs/PlanBillingTab'));
const NotificationsTab = lazy(() => import('./tabs/NotificationsTab'));
const TeamTab = lazy(() => import('./tabs/TeamTab'));

/**
 * The Settings app config.
 */
const SettingsAppConfig = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: 'apps/settings',
			element: <SettingsApp />,
			children: [
				{
					path: 'account',
					element: <AccountTab />,
				},
				{
					path: 'security',
					element: <SecurityTab />,
				},
				{
					path: 'plan-billing',
					element: <PlanBillingTab />,
				},
				{
					path: 'security',
					element: <SecurityTab />,
				},
				{
					path: 'notifications',
					element: <NotificationsTab />,
				},
				{
					path: 'team',
					element: <TeamTab />,
				},
				{
					path: '',
					element: <Navigate to="account" />,
				},
			],
		},
	],
};

export default SettingsAppConfig;
