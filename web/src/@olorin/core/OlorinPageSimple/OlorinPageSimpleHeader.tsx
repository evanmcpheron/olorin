import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the OlorinPageSimpleHeader component.
 */
type OlorinPageSimpleHeaderProps = {
	className?: string;
	header?: ReactNode;
};

/**
 * The OlorinPageSimpleHeader component is a sub-component of the OlorinPageSimple layout component.
 * It provides a header area for the layout.
 */
function OlorinPageSimpleHeader(props: OlorinPageSimpleHeaderProps) {
	const { header = null, className } = props;
	return (
		<div className={clsx('OlorinPageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default OlorinPageSimpleHeader;
