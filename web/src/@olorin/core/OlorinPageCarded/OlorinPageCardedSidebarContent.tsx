import OlorinScrollbars from '@olorin/core/OlorinScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the OlorinPageCardedSidebarContent component.
 */
type OlorinPageCardedSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The OlorinPageCardedSidebarContent component is a content container for the OlorinPageCardedSidebar component.
 */
function OlorinPageCardedSidebarContent(props: OlorinPageCardedSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<OlorinScrollbars enable={innerScroll}>
			<div className="OlorinPageCarded-sidebarContent">{children}</div>
		</OlorinScrollbars>
	);
}

export default OlorinPageCardedSidebarContent;
