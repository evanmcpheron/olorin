import Divider from '@mui/material/Divider';
import { memo } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import OlorinNavHorizontalLayout1 from './horizontal/OlorinNavHorizontalLayout1';
import OlorinNavVerticalLayout1 from './vertical/OlorinNavVerticalLayout1';
import OlorinNavVerticalLayout2 from './vertical/OlorinNavVerticalLayout2';
import OlorinNavHorizontalCollapse from './horizontal/types/OlorinNavHorizontalCollapse';
import OlorinNavHorizontalGroup from './horizontal/types/OlorinNavHorizontalGroup';
import OlorinNavHorizontalItem from './horizontal/types/OlorinNavHorizontalItem';
import OlorinNavHorizontalLink from './horizontal/types/OlorinNavHorizontalLink';
import OlorinNavVerticalCollapse from './vertical/types/OlorinNavVerticalCollapse';
import OlorinNavVerticalGroup from './vertical/types/OlorinNavVerticalGroup';
import OlorinNavVerticalItem from './vertical/types/OlorinNavVerticalItem';
import OlorinNavVerticalLink from './vertical/types/OlorinNavVerticalLink';
import { registerComponent } from './OlorinNavItem';
import { OlorinNavItemType } from './types/OlorinNavItemType';

const inputGlobalStyles = (
	<GlobalStyles
		styles={() => ({
			'.popper-navigation-list': {
				'& .olorin-list-item': {
					padding: '8px 12px 8px 12px',
					height: 40,
					minHeight: 40,
					'& .olorin-list-item-text': {
						padding: '0 0 0 8px',
					},
				},
				'&.dense': {
					'& .olorin-list-item': {
						minHeight: 32,
						height: 32,
						'& .olorin-list-item-text': {
							padding: '0 0 0 8px',
						},
					},
				},
			},
		})}
	/>
);

/*
Register Olorin Navigation Components
 */
registerComponent('vertical-group', OlorinNavVerticalGroup);
registerComponent('vertical-collapse', OlorinNavVerticalCollapse);
registerComponent('vertical-item', OlorinNavVerticalItem);
registerComponent('vertical-link', OlorinNavVerticalLink);
registerComponent('horizontal-group', OlorinNavHorizontalGroup);
registerComponent('horizontal-collapse', OlorinNavHorizontalCollapse);
registerComponent('horizontal-item', OlorinNavHorizontalItem);
registerComponent('horizontal-link', OlorinNavHorizontalLink);
registerComponent('divider', () => <Divider className="my-16" />);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

export type OlorinNavigationProps = {
	className?: string;
	dense?: boolean;
	active?: boolean;
	onItemClick?: (T: OlorinNavItemType) => void;
	navigation?: OlorinNavItemType[];
	layout?: 'horizontal' | 'vertical' | 'vertical-2';
	firstLevel?: boolean;
	selectedId?: string;
	checkPermission?: boolean;
};

/**
 * OlorinNavigation
 * Component for displaying a navigation bar which contains OlorinNavItem components
 * and acts as parent for providing props to its children components
 */
function OlorinNavigation(props: OlorinNavigationProps) {
	const { navigation, layout = 'vertical' } = props;

	if (!navigation || navigation.length === 0) {
		return null;
	}

	return (
		<>
			{inputGlobalStyles}
			{layout === 'horizontal' && (
				<OlorinNavHorizontalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical' && (
				<OlorinNavVerticalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical-2' && (
				<OlorinNavVerticalLayout2
					checkPermission={false}
					{...props}
				/>
			)}
		</>
	);
}

export default memo(OlorinNavigation);
