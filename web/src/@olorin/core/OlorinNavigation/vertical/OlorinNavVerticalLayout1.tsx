import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import OlorinNavItem from '../OlorinNavItem';
import { OlorinNavigationProps } from '../OlorinNavigation';
import { OlorinNavItemType } from '../types/OlorinNavItemType';

const StyledList = styled(List)(({ theme }) => ({
	'& .olorin-list-item': {
		'&:hover': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)',
		},
		'&:focus:not(.active)': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)',
		},
	},
	'& .olorin-list-item-text': {
		margin: 0,
	},
	'& .olorin-list-item-text-primary': {
		lineHeight: '20px',
	},
	'&.active-square-list': {
		'& .olorin-list-item, & .active.olorin-list-item': {
			width: '100%',
			borderRadius: '0',
		},
	},
	'&.dense': {
		'& .olorin-list-item': {
			paddingTop: 0,
			paddingBottom: 0,
			height: 32,
		},
	},
}));

/**
 * OlorinNavVerticalLayout1
 * This component is used to render vertical navigations using
 * the Material-UI List component. It accepts the OlorinNavigationProps props
 * and renders the OlorinNavItem components accordingly
 */
function OlorinNavVerticalLayout1(props: OlorinNavigationProps) {
	const { navigation, active, dense, className, onItemClick, checkPermission } = props;

	function handleItemClick(item: OlorinNavItemType) {
		onItemClick?.(item);
	}

	return (
		<StyledList
			className={clsx(
				'navigation whitespace-nowrap px-12 py-0',
				`active-${active}-list`,
				dense && 'dense',
				className,
			)}
		>
			{navigation.map((_item) => (
				<OlorinNavItem
					key={_item.id}
					type={`vertical-${_item.type}`}
					item={_item}
					nestedLevel={0}
					onItemClick={handleItemClick}
					checkPermission={checkPermission}
				/>
			))}
		</StyledList>
	);
}

export default OlorinNavVerticalLayout1;
