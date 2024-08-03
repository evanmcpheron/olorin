import { OlorinSettingsConfigType } from '@olorin/core/OlorinSettings/OlorinSettings';

/**
 * The type definition for a user object.
 */
export type User = {
	uid: string;
	role: string[] | string | null;
	data: {
		displayName: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<OlorinSettingsConfigType>;
		loginRedirectUrl?: string; // The URL to redirect to after login.
	};
};
