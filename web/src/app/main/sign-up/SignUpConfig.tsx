import { OlorinRouteConfigType } from '@olorin/utils/OlorinUtils';
import SignUpPage from './SignUpPage';
import authRoles from '../../auth/authRoles';

const SignUpConfig: OlorinRouteConfigType = {
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
			path: 'sign-up',
			element: <SignUpPage />,
		},
	],
};

export default SignUpConfig;
