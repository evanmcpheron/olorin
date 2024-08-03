import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import OlorinNavVerticalTab from './types/OlorinNavVerticalTab';
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
	'& .olorin-list-item-text-primary': {
		lineHeight: '1',
	},
	'&.active-square-list': {
		'& .olorin-list-item, & .active.olorin-list-item': {
			width: '100%',
			borderRadius: '0',
		},
	},
	'&.dense': {},
}));

/**
 * OlorinNavVerticalLayout2 component represents a vertical navigation layout with material UI elements.
 * It displays the navigation object in the structured vertical menu and allows to handle onClick events for each navigation item.
 */
function OlorinNavVerticalLayout2(props: OlorinNavigationProps) {
	const { navigation, active, dense, className, onItemClick, firstLevel, selectedId, checkPermission } = props;

	function handleItemClick(item: OlorinNavItemType) {
		onItemClick?.(item);
	}

	return (
		<StyledList
			className={clsx(
				'navigation flex flex-col items-center whitespace-nowrap',
				`active-${active}-list`,
				dense && 'dense',
				className,
			)}
		>
			{navigation.map((_item) => (
				<OlorinNavVerticalTab
					key={_item.id}
					type={`vertical-${_item.type}`}
					item={_item}
					nestedLevel={0}
					onItemClick={handleItemClick}
					firstLevel={firstLevel}
					dense={dense}
					selectedId={selectedId}
					checkPermission={checkPermission}
				/>
			))}
		</StyledList>
	);
}

export default OlorinNavVerticalLayout2;
