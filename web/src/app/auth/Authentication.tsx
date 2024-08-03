import BrowserRouter from '@olorin/core/BrowserRouter';
import OlorinAuthorization from '@olorin/core/OlorinAuthorization/OlorinAuthorization';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import OlorinSplashScreen from '@olorin/core/OlorinSplashScreen/OlorinSplashScreen';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from '@aws-amplify/auth';
import { resetUser, selectUserRole, setUser } from './user/store/userSlice';
import useAuth from './useAuth';
import UserModel from './user/models/UserModel';
import { User } from './user';
import useJwtAuth from './services/jwt/useJwtAuth';
import useFirebaseAuth from './services/firebase/useFirebaseAuth';

type AuthenticationProps = {
	children: React.ReactNode;
};

function Authentication(props: AuthenticationProps) {
	const { children } = props;
	const { setAuthProvider, resetAuthProvider } = useAuth();

	const userRole = useAppSelector(selectUserRole);
	const dispatch = useAppDispatch();

	/**
	 * Auth Providers
	 */

	/**
	 * Amplify Auth
	 */
	const { user: amplifyUser, authStatus: amplifyAuthStatus } = useAuthenticator();

	/**
	 * JWT Auth
	 */
	const { user: jwtUser, authStatus: jwtAuthStatus } = useJwtAuth();

	/**
	 * Firebase Auth
	 */
	const { user: firebaseUser, authStatus: firebaseAuthStatus } = useFirebaseAuth();

	/**
	 * isLoading
	 */
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * Check if services is in loading state
	 */
	const inProgress = useMemo(
		() =>
			amplifyAuthStatus === 'configuring' ||
			jwtAuthStatus === 'configuring' ||
			firebaseAuthStatus === 'configuring',
		[amplifyAuthStatus, jwtAuthStatus, firebaseAuthStatus],
	);

	/**
	 * Any user is authenticated
	 */
	const authenticated = useMemo(
		() =>
			amplifyAuthStatus === 'authenticated' ||
			jwtAuthStatus === 'authenticated' ||
			firebaseAuthStatus === 'authenticated',
		[amplifyAuthStatus, jwtAuthStatus, firebaseAuthStatus],
	);

	/**
	 * All users are unauthenticated
	 */
	const unAuthenticated = useMemo(
		() =>
			amplifyAuthStatus === 'unauthenticated' &&
			jwtAuthStatus === 'unauthenticated' &&
			firebaseAuthStatus === 'unauthenticated',
		[amplifyAuthStatus, jwtAuthStatus, firebaseAuthStatus],
	);

	/**
	 * Sign Out
	 */
	useEffect(() => {
		if (!inProgress && unAuthenticated) {
			handleSignOut();
		}
	}, [inProgress, authenticated]);

	/**
	 * Loading state is false when all services are done loading
	 */
	useEffect(() => {
		if (!inProgress && !authenticated) {
			setIsLoading(false);
		}
	}, [inProgress, authenticated]);

	/**
	 * Handle sign in
	 */
	const handleSignIn = useCallback((provider: string, userState: User) => {
		dispatch(setUser(userState)).then(() => {
			setAuthProvider(provider);
			setIsLoading(false);
		});
	}, []);

	/**
	 * Handle sign out
	 */
	const handleSignOut = useCallback(() => {
		dispatch(resetUser());
		resetAuthProvider();
	}, []);

	/**
	 * Handle Sign In on load
	 */
	useEffect(() => {
		if (inProgress || !authenticated) {
			return;
		}

		if (amplifyUser) {
			fetchUserAttributes()
				.then((userAttributes) => {
					handleSignIn(
						'amplify',
						UserModel({
							uid: amplifyUser.userId,
							data: {
								displayName: userAttributes?.name,
								email: userAttributes?.email,
							},
							role: ['admin'],
						}),
					);
				})
				.catch((err) => {
					console.error(err);
				});
		}

		if (jwtUser) {
			handleSignIn('jwt', jwtUser);
		}

		if (firebaseUser) {
			handleSignIn(
				'firebase',
				UserModel({
					uid: firebaseUser.uid,
					data: firebaseUser.data,
					role: ['admin'],
				}),
			);
		}
	}, [inProgress, authenticated, amplifyUser, jwtUser, firebaseUser, isLoading]);

	return useMemo(
		() =>
			isLoading ? (
				<OlorinSplashScreen />
			) : (
				<BrowserRouter>
					<OlorinAuthorization userRole={userRole}>{children}</OlorinAuthorization>
				</BrowserRouter>
			),
		[userRole, children, isLoading],
	);
}

export default Authentication;
