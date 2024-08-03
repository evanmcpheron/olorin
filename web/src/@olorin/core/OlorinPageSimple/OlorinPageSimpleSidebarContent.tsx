import OlorinScrollbars from '@olorin/core/OlorinScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the OlorinPageSimpleSidebarContent component.
 */
type OlorinPageSimpleSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The OlorinPageSimpleSidebarContent component is a content container for the OlorinPageSimpleSidebar component.
 */
function OlorinPageSimpleSidebarContent(props: OlorinPageSimpleSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<OlorinScrollbars enable={innerScroll}>
			<div className="OlorinPageSimple-sidebarContent">{children}</div>
		</OlorinScrollbars>
	);
}

export default OlorinPageSimpleSidebarContent;
