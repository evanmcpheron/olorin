import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseInitialized } from './initializeFirebase';
import { User } from '../../user';
import UserModel from '../../user/models/UserModel';

export type FirebaseAuthStatus = 'configuring' | 'authenticated' | 'unauthenticated';

export type FirebaseAuthConfig = {
	tokenStorageKey: string;
	signInUrl: string;
	signUpUrl: string;
	tokenRefreshUrl: string;
	getUserUrl: string;
	updateUserUrl: string;
	/**
	 * If the response auth header contains a new access token, update the token
	 * in the Authorization header of the successful responses
	 */
	updateTokenFromHeader: boolean;
};

export type SignInPayload = {
	email: string;
	password: string;
};

export type SignUpPayload = {
	displayName: string;
	password: string;
	email: string;
};

export type FirebaseAuthContextType = {
	user?: User;
	updateUser: (U: User) => void;
	signIn?: (credentials: SignInPayload) => Promise<firebase.auth.UserCredential>;
	signUp?: (U: SignUpPayload) => Promise<firebase.auth.UserCredential>;
	signOut?: () => void;
	refreshToken?: () => void;
	isLoading: boolean;
	setIsLoading?: (T: boolean) => void;
	authStatus: FirebaseAuthStatus;
};

const defaultAuthContext: FirebaseAuthContextType = {
	isLoading: false,
	user: null,
	updateUser: null,
	signIn: null,
	signUp: null,
	signOut: null,
	refreshToken: null,
	setIsLoading: () => {},
	authStatus: 'configuring',
};

export const FirebaseAuthContext = createContext<FirebaseAuthContextType>(defaultAuthContext);

export type FirebaseAuthProviderProps = {
	children: React.ReactNode;
};

function FirebaseAuthProvider(props: FirebaseAuthProviderProps) {
	const [user, setUser] = useState<User>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [authStatus, setAuthStatus] = useState('configuring');

	const { children } = props;

	useEffect(() => {
		const unsubscribe =
			firebase.apps.length &&
			firebase.auth().onAuthStateChanged(
				(firebaseUser) => {
					if (firebaseUser && authStatus !== 'authenticated') {
						firebase
							.database()
							.ref(`users/${firebaseUser.uid}`)
							.once('value')
							.then((snapshot) => {
								const userSnapshot = snapshot.val() as User;
								setUser(userSnapshot);
								setAuthStatus('authenticated');
							});
					} else if (authStatus !== 'unauthenticated') {
						setUser(null);
						setAuthStatus('unauthenticated');
					}

					setIsLoading(false);
				},
				(_error) => {
					setAuthStatus('unauthenticated');
					setIsLoading(false);
				},
			);
		return () => {
			setAuthStatus('configuring');
			unsubscribe?.();
		};
	}, []);

	const signIn = useCallback(
		({ email, password }: SignInPayload) => firebase.auth().signInWithEmailAndPassword(email, password),
		[],
	);

	const signUp = useCallback(({ email, password, displayName }: SignUpPayload) => {
		const signUpResponse = new Promise<firebase.auth.UserCredential>((resolve, reject) => {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((userCredential) => {
					userCredential.user.updateProfile({ displayName });
					updateUser(
						UserModel({
							uid: userCredential.user.uid,
							data: {
								displayName,
								email: userCredential.user?.email,
							},
							role: ['admin'],
						}),
					);
					resolve(userCredential);
				})
				.catch((_error) => {
					const error = _error as firebase.auth.Error;
					reject(error);
				});
		});

		return signUpResponse;
	}, []);

	const signOut = useCallback(() => firebase.auth().signOut(), []);

	const updateUser = useCallback((_user: User & { uid: string }) => {
		if (!_user) {
			return Promise.reject(new Error('No user is signed in'));
		}

		firebase.database().ref(`users/${_user.uid}`).set(_user);

		return Promise.resolve(_user);
	}, []);

	const authContextValue = useMemo(
		() =>
			({
				user,
				authStatus,
				isLoading,
				signIn,
				signUp,
				signOut,
				updateUser,
				setIsLoading,
			}) as FirebaseAuthContextType,
		[user, isLoading, signIn, signUp, signOut, updateUser, setIsLoading],
	);

	return firebaseInitialized ? (
		<FirebaseAuthContext.Provider value={authContextValue}>{children}</FirebaseAuthContext.Provider>
	) : null;
}

export default FirebaseAuthProvider;
