import { JwtAuthConfig } from './JwtAuthProvider';

const jwtAuthConfig: JwtAuthConfig = {
	tokenStorageKey: 'jwt_access_token',
	signInUrl: 'mock-api/auth/sign-in',
	signUpUrl: 'mock-api/auth/sign-up',
	tokenRefreshUrl: 'mock-api/auth/refresh',
	getUserUrl: 'mock-api/auth/user',
	updateUserUrl: 'mock-api/auth/user',
	updateTokenFromHeader: true,
};

export default jwtAuthConfig;
