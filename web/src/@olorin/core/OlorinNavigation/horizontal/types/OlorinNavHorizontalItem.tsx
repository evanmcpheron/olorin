import NavLinkAdapter from '@olorin/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from '@olorin/core/withRouter';
import { ListItemButton, ListItemButtonProps } from '@mui/material';
import { WithRouterProps } from '@olorin/core/withRouter/withRouter';
import OlorinNavBadge from '../../OlorinNavBadge';
import OlorinSvgIcon from '../../../OlorinSvgIcon';
import { OlorinNavItemComponentProps } from '../../OlorinNavItem';

const Root = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none!important',
	minHeight: 48,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		pointerEvents: 'none',
		'& .olorin-list-item-text-primary': {
			color: 'inherit',
		},
		'& .olorin-list-item-icon': {
			color: 'inherit',
		},
	},
	'& .olorin-list-item-icon': {},
	'& .olorin-list-item-text': {
		padding: '0 0 0 16px',
	},
}));

type OlorinNavHorizontalItemProps = OlorinNavItemComponentProps & WithRouterProps;

/**
 * OlorinNavHorizontalItem is a component responsible for rendering the navigation element in the horizontal menu in the Olorin theme.
 */
function OlorinNavHorizontalItem(props: OlorinNavHorizontalItemProps) {
	const { item, checkPermission } = props;

	const component = item.url ? NavLinkAdapter : 'li';

	let itemProps;

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url || '',
			end: item.end,
			role: 'button',
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className={clsx('olorin-list-item', item.active && 'active')}
				sx={item.sx}
				{...itemProps}
			>
				{item.icon && (
					<OlorinSvgIcon
						className={clsx('olorin-list-item-icon shrink-0', item.iconClass)}
						color="action"
					>
						{item.icon}
					</OlorinSvgIcon>
				)}

				<ListItemText
					className="olorin-list-item-text"
					primary={item.title}
					classes={{ primary: 'text-13 olorin-list-item-text-primary truncate' }}
				/>

				{item.badge && (
					<OlorinNavBadge
						className="ltr:ml-8 rtl:mr-8"
						badge={item.badge}
					/>
				)}
			</Root>
		),
		[item.badge, item.exact, item.icon, item.iconClass, item.title, item.url],
	);
}

const NavHorizontalItem = withRouter(memo(OlorinNavHorizontalItem));

export default NavHorizontalItem;
