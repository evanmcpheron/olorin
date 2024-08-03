import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from '@olorin/core/withRouter';
import { Link, ListItemButton, ListItemButtonProps } from '@mui/material';
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

type OlorinNavHorizontalLinkProps = OlorinNavItemComponentProps & WithRouterProps;

/*
 * OlorinNavHorizontalLink
 * This is a component to render horizontal navigation links in the Olorin navigations.
 * It receieves `OlorinNavItemComponentProps` and `WithRouterProps` as props.
 */
function OlorinNavHorizontalLink(props: OlorinNavHorizontalLinkProps) {
	const { item, checkPermission } = props;

	let itemProps;

	const component = item.url ? Link : 'li';

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			href: item.url,
			role: 'button',
			target: item.target ? item.target : '_blank',
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className={clsx('olorin-list-item')}
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
		[item.badge, item.icon, item.iconClass, item.target, item.title, item.url],
	);
}

const NavHorizontalLink = withRouter(memo(OlorinNavHorizontalLink));

export default NavHorizontalLink;
