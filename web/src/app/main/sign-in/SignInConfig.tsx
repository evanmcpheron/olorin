import { OlorinRouteConfigType } from '@olorin/utils/OlorinUtils';
import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';

const SignInConfig: OlorinRouteConfigType = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false,
				},
				toolbar: {
					display: false,
				},
				footer: {
					display: false,
				},
				leftSidePanel: {
					display: false,
				},
				rightSidePanel: {
					display: false,
				},
			},
		},
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: 'sign-in',
			element: <SignInPage />,
		},
	],
};

export default SignInConfig;
