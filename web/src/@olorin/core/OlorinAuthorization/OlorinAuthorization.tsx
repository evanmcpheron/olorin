import { Component, ReactNode } from 'react';
import { matchRoutes } from 'react-router-dom';
import OlorinUtils from '@olorin/utils';
import AppContext, { AppContextType } from 'app/AppContext';
import withRouter from '@olorin/core/withRouter';
import history from '@history';
import { WithRouterProps } from '@olorin/core/withRouter/withRouter';
import { OlorinRouteItemType } from '@olorin/utils/OlorinUtils';
import {
	getSessionRedirectUrl,
	resetSessionRedirectUrl,
	setSessionRedirectUrl,
} from '@olorin/core/OlorinAuthorization/sessionRedirectUrl';
import OlorinLoading from '@olorin/core/OlorinLoading';

type OlorinAuthorizationProps = {
	children: ReactNode;
	location: Location;
	userRole: string[] | string;
	loginRedirectUrl?: string;
} & WithRouterProps;

type State = AppContextType & {
	accessGranted: boolean;
};

function isUserGuest(role: string[] | string) {
	return !role || (Array.isArray(role) && role?.length === 0);
}

/**
 * OlorinAuthorization is a higher-order component that wraps its child component which handles the authorization logic of the app.
 * It checks the provided Auth property from OlorinRouteItemType (auth property) against the current logged-in user role.
 */
class OlorinAuthorization extends Component<OlorinAuthorizationProps, State> {
	constructor(props: OlorinAuthorizationProps, context: AppContextType) {
		super(props);

		const { routes } = context;

		this.state = {
			accessGranted: true,
			routes,
		};
	}

	componentDidMount() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	shouldComponentUpdate(nextProps: OlorinAuthorizationProps, nextState: State) {
		const { accessGranted } = this.state;

		return nextState.accessGranted !== accessGranted;
	}

	componentDidUpdate() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props: OlorinAuthorizationProps, state: State) {
		const { location, userRole } = props;
		const { pathname } = location;
		const matchedRoutes = matchRoutes(state.routes, pathname);
		const matched = matchedRoutes ? matchedRoutes[0] : false;

		const isGuest = isUserGuest(userRole);

		if (!matched) {
			return { accessGranted: true };
		}

		const { route }: { route: OlorinRouteItemType } = matched;

		const userHasPermission = OlorinUtils.hasPermission(route.auth, userRole);

		const ignoredPaths = ['/', '/callback', '/sign-in', '/sign-out', '/logout', '/404'];

		if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
			setSessionRedirectUrl(pathname);
		}

		/**
		 * If user is member but don't have permission to view the route
		 * redirected to main route '/'
		 */
		if (!userHasPermission && !isGuest && !ignoredPaths.includes(pathname)) {
			setSessionRedirectUrl('/');
		}

		return {
			accessGranted: matched ? userHasPermission : true,
		};
	}

	redirectRoute() {
		const { userRole, loginRedirectUrl = '/' } = this.props;
		const redirectUrl = getSessionRedirectUrl() || loginRedirectUrl;

		/*
		User is guest
		Redirect to Login Page
		*/
		if (isUserGuest(userRole)) {
			setTimeout(() => history.push('/sign-in'), 0);
		} else {
			/*
		  User is member
		  User must be on unAuthorized page or just logged in
		  Redirect to dashboard or loginRedirectUrl
			*/
			setTimeout(() => history.push(redirectUrl), 0);
			resetSessionRedirectUrl();
		}
	}

	render() {
		const { accessGranted } = this.state;
		const { children } = this.props;

		return accessGranted ? children : <OlorinLoading />;
	}
}

OlorinAuthorization.contextType = AppContext;

export default withRouter(OlorinAuthorization);
