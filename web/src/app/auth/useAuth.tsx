import { useContext } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import useJwtAuth from './services/jwt/useJwtAuth';
import { AuthContext, AuthContextType } from './AuthenticationProvider';
import useFirebaseAuth from './services/firebase/useFirebaseAuth';
import { User } from './user';

interface AuthProvider {
	signOut: () => void;
	updateUser: (user: User) => void;
}

type AuthProviders = {
	[key: string]: AuthProvider;
};

function useAuth(): AuthContextType & { signOut: () => void } {
	const context = useContext(AuthContext);
	const { signOut: amplifySignOut } = useAuthenticator();
	const { signOut: jwtSignOut, updateUser: jwtUpdateUser } = useJwtAuth();
	const { signOut: firebaseSignOut, updateUser: firebaseUpdateUser } = useFirebaseAuth();

	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}

	const authProviders: AuthProviders = {
		amplify: { signOut: amplifySignOut, updateUser: () => {} },
		jwt: { signOut: jwtSignOut, updateUser: jwtUpdateUser },
		firebase: { signOut: firebaseSignOut, updateUser: firebaseUpdateUser },
	};

	const signOut = () => {
		const authProvider = context.getAuthProvider();
		authProviders[authProvider]?.signOut();
	};

	const updateUser = (user: User) => {
		const authProvider = context.getAuthProvider();
		authProviders[authProvider]?.updateUser(user);
	};

	return { ...context, signOut, updateUser };
}

export default useAuth;
