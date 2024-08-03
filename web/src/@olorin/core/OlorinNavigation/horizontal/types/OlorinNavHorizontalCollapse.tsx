import NavLinkAdapter from '@olorin/core/NavLinkAdapter';
import { styled, useTheme } from '@mui/material/styles';
import { useDebounce } from '@olorin/hooks';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import { memo, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Manager, Popper, Reference } from 'react-popper';
import withRouter from '@olorin/core/withRouter';
import { ListItemButton, ListItemButtonProps } from '@mui/material';
import { Location } from 'history';
import isUrlInChildren from '@olorin/core/OlorinNavigation/isUrlInChildren';
import OlorinNavBadge from '../../OlorinNavBadge';
import OlorinNavItem, { OlorinNavItemComponentProps } from '../../OlorinNavItem';
import OlorinSvgIcon from '../../../OlorinSvgIcon';

const Root = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
	color: theme.palette.text.primary,
	minHeight: 48,
	cursor: 'pointer',
	'&.active, &.active:hover, &.active:focus': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,

		'&.open': {
			backgroundColor: 'rgba(0,0,0,.08)',
		},

		'& > .olorin-list-item-text': {
			padding: '0 0 0 16px',
		},

		'& .olorin-list-item-icon': {
			color: 'inherit',
		},
	},
}));

type OlorinNavHorizontalCollapseProps = OlorinNavItemComponentProps & {
	location: Location;
};

/**
 * OlorinNavHorizontalCollapse component helps rendering Horizontal Olorin Navigation Item with children
 * Used in OlorinNavVerticalItems and OlorinNavHorizontalItems
 */
function OlorinNavHorizontalCollapse(props: OlorinNavHorizontalCollapseProps) {
	const [opened, setOpened] = useState(false);
	const { item, nestedLevel, dense, location, checkPermission } = props;
	const theme = useTheme();

	const handleToggle = useDebounce((open: boolean) => {
		setOpened(open);
	}, 150);

	const component = item.url ? NavLinkAdapter : 'li';

	let itemProps;

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url,
			end: item.end,
			role: 'button',
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<ul className="relative px-0">
				<Manager>
					<Reference>
						{({ ref }) => (
							<div ref={ref}>
								<Root
									component={component}
									className={clsx(
										'olorin-list-item',
										opened && 'open',
										isUrlInChildren(item, location.pathname) && 'active',
									)}
									onMouseEnter={() => handleToggle(true)}
									onMouseLeave={() => handleToggle(false)}
									aria-owns={opened ? 'menu-olorin-list-grow' : null}
									aria-haspopup="true"
									sx={item.sx}
									{...itemProps}
								>
									{item.icon && (
										<OlorinSvgIcon
											color="action"
											className={clsx('olorin-list-item-icon shrink-0', item.iconClass)}
										>
											{item.icon}
										</OlorinSvgIcon>
									)}

									<ListItemText
										className="olorin-list-item-text"
										primary={item.title}
										classes={{ primary: 'text-13 truncate' }}
									/>

									{item.badge && (
										<OlorinNavBadge
											className="mx-4"
											badge={item.badge}
										/>
									)}
									<IconButton
										disableRipple
										className="h-16 w-16 p-0 ltr:ml-4 rtl:mr-4"
										color="inherit"
										size="large"
									>
										<OlorinSvgIcon
											size={16}
											className="arrow-icon"
										>
											{theme.direction === 'ltr'
												? 'heroicons-outline:arrow-sm-right'
												: 'heroicons-outline:arrow-sm-left'}
										</OlorinSvgIcon>
									</IconButton>
								</Root>
							</div>
						)}
					</Reference>
					{ReactDOM.createPortal(
						<Popper placement={theme.direction === 'ltr' ? 'right' : 'left'}>
							{({ ref, style, placement }) =>
								opened && (
									<div
										ref={ref}
										style={{
											...style,
											zIndex: 999 + nestedLevel + 1,
										}}
										data-placement={placement}
										className={clsx('z-999', !opened && 'pointer-events-none')}
									>
										<Grow
											in={opened}
											id="menu-olorin-list-grow"
											style={{ transformOrigin: '0 0 0' }}
										>
											<Paper
												className="rounded-8"
												onMouseEnter={() => handleToggle(true)}
												onMouseLeave={() => handleToggle(false)}
											>
												{item.children && (
													<ul
														className={clsx(
															'popper-navigation-list',
															dense && 'dense',
															'px-0',
														)}
													>
														{item.children.map((_item) => (
															<OlorinNavItem
																key={_item.id}
																type={`horizontal-${_item.type}`}
																item={_item}
																nestedLevel={nestedLevel + 1}
																dense={dense}
															/>
														))}
													</ul>
												)}
											</Paper>
										</Grow>
									</div>
								)}
						</Popper>,
						document.querySelector('#root'),
					)}
				</Manager>
			</ul>
		),
		[dense, handleToggle, item, nestedLevel, opened, location.pathname, theme.direction],
	);
}

const NavHorizontalCollapse = withRouter(memo(OlorinNavHorizontalCollapse));

export default NavHorizontalCollapse;
