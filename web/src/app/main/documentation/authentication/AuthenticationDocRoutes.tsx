import { lazy } from 'react';

const AuthenticationDoc = lazy(() => import('./AuthenticationDoc'));

/**
 * The authentication doc routes.
 */
const AuthenticationDocRoutes = [
	{
		path: 'authentication',
		element: <AuthenticationDoc />,
	},
];

export default AuthenticationDocRoutes;
