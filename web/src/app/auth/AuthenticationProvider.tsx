import React, { createContext, useCallback, useMemo, useState } from 'react';
import { PartialDeep } from 'type-fest';
import { User } from './user';
import Authentication from './Authentication';
import AWSAuthProvider from './services/aws/AWSAuthProvider';
import JwtAuthProvider from './services/jwt/JwtAuthProvider';
import FirebaseAuthProvider from './services/firebase/FirebaseAuthProvider';

export type SignInPayload = {
	email: string;
	password: string;
};

export type SignUpPayload = {
	displayName: string;
	password: string;
	email: string;
};

export type AuthContextType = {
	updateUser?: (U: PartialDeep<User>) => void;
	isAuthenticated: boolean;
	setIsAuthenticated: (T: boolean) => void;
	setAuthProvider: (T: string) => void;
	getAuthProvider: () => string | null;
	resetAuthProvider: () => string | null;
};

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	setAuthProvider: () => {},
	getAuthProvider: () => null,
	resetAuthProvider: () => null,
});

const authProviderLocalStorageKey = 'olorinReactAuthProvider';

type AuthenticationProviderProps = { children: React.ReactNode };

function AuthenticationProvider(props: AuthenticationProviderProps) {
	const { children } = props;
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	/**
	 * Get auth provider
	 */
	const getAuthProvider = useCallback(() => localStorage.getItem(authProviderLocalStorageKey), []);

	/**
	 * Set auth provider
	 */
	const setAuthProvider = useCallback((authProvider: string) => {
		if (authProvider) {
			localStorage.setItem(authProviderLocalStorageKey, authProvider);
		}
	}, []);

	/**
	 * Remove auth provider
	 */
	const resetAuthProvider = useCallback(() => {
		localStorage.removeItem(authProviderLocalStorageKey);
	}, []);

	const contextValue = useMemo(
		() =>
			({
				setIsAuthenticated,
				isAuthenticated,
				getAuthProvider,
				setAuthProvider,
				resetAuthProvider,
			}) as AuthContextType,
		[getAuthProvider, setAuthProvider, resetAuthProvider, setIsAuthenticated, isAuthenticated],
	);

	return (
		<AuthContext.Provider value={contextValue}>
			<JwtAuthProvider>
				<AWSAuthProvider>
					<FirebaseAuthProvider>
						<Authentication>{children}</Authentication>
					</FirebaseAuthProvider>
				</AWSAuthProvider>
			</JwtAuthProvider>
		</AuthContext.Provider>
	);
}

export default AuthenticationProvider;
