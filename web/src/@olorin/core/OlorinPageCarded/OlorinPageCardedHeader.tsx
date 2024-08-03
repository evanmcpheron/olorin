import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the OlorinPageCardedHeader component.
 */
type OlorinPageCardedHeaderProps = {
	header?: ReactNode;
};

/**
 * The OlorinPageCardedHeader component is a header for the OlorinPageCarded component.
 */
function OlorinPageCardedHeader(props: OlorinPageCardedHeaderProps) {
	const { header = null } = props;

	return <div className={clsx('OlorinPageCarded-header', 'container')}>{header}</div>;
}

export default OlorinPageCardedHeader;
