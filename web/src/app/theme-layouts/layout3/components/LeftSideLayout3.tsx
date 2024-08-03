import OlorinSidePanel from '@olorin/core/OlorinSidePanel';
import { memo } from 'react';
import NavigationShortcuts from '../../shared-components/navigation/NavigationShortcuts';

/**
 * The left side layout 3.
 */
function LeftSideLayout3() {
	return (
		<OlorinSidePanel>
			<NavigationShortcuts
				className="px-8 py-16"
				variant="vertical"
			/>
		</OlorinSidePanel>
	);
}

export default memo(LeftSideLayout3);
