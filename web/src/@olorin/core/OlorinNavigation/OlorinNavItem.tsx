import { OlorinNavItemType } from './types/OlorinNavItemType';

const components: { [key: string]: React.FC<unknown> } = {};

/**
 * Register a component to OlorinNavItem.
 */
export function registerComponent<T = unknown>(name: string, Component: React.FC<T>) {
	components[name] = Component as React.FC<unknown>;
}

export type OlorinNavItemComponentProps = {
	type: string;
	item: OlorinNavItemType;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (T: OlorinNavItemType) => void;
	checkPermission?: boolean;
};

/**
Component to render NavItem depending on its type.
*/
export default function OlorinNavItem(props: OlorinNavItemComponentProps) {
	const { type } = props;

	const C = components[type];

	return C ? <C {...(props as object)} /> : null;
}
