import { SxProps } from '@mui/system';
import { OlorinNavBadgeType } from './OlorinNavBadgeType';

/**
 * OlorinNavItemType
 * A type for Olorin navigation item and its properties.
 */
export type OlorinNavItemType = {
	id: string;
	title?: string;
	translate?: string;
	auth?: string[] | string;
	subtitle?: string;
	icon?: string;
	iconClass?: string;
	url?: string;
	target?: string;
	type?: string;
	sx?: SxProps;
	disabled?: boolean;
	active?: boolean;
	exact?: boolean;
	end?: boolean;
	badge?: OlorinNavBadgeType;
	children?: OlorinNavItemType[];
	hasPermission?: boolean;
};

export type OlorinFlatNavItemType = Omit<OlorinNavItemType, 'children' | 'sx'> & { children?: string[]; order: string };
