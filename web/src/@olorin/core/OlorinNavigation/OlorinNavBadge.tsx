import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import { OlorinNavBadgeType } from './types/OlorinNavBadgeType';

const Root = styled('div')(({ theme }) => ({
	padding: '0 7px',
	fontSize: 11,
	fontWeight: 600,
	height: 20,
	minWidth: 20,
	borderRadius: 20,
	display: 'flex',
	alignItems: 'center',
	backgroundColor: theme.palette.secondary.main,
	color: theme.palette.secondary.contrastText,
}));

type OlorinNavBadgeProps = {
	className?: string;
	classes?: string;
	badge: OlorinNavBadgeType;
};

/**
 * OlorinNavBadge component.
 * This component will render a badge on a OlorinNav element. It accepts a `OlorinNavBadgeType` as a prop,
 * which is an object containing a title and background and foreground colour.
 */
function OlorinNavBadge(props: OlorinNavBadgeProps) {
	const { className = '', classes = '', badge } = props;

	return (
		<Root
			className={clsx('item-badge', className, classes)}
			style={{
				backgroundColor: badge.bg,
				color: badge.fg,
			}}
		>
			{badge.title}
		</Root>
	);
}

export default memo(OlorinNavBadge);
