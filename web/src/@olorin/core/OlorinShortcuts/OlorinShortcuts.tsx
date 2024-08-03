import { amber } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import OlorinSvgIcon from '../OlorinSvgIcon';
import { OlorinFlatNavItemType } from '../OlorinNavigation/types/OlorinNavItemType';

type OlorinShortcutsProps = {
	className?: string;
	navigation: OlorinFlatNavItemType[];
	onChange: (T: string[]) => void;
	shortcuts?: string[];
	variant?: 'horizontal' | 'vertical';
};

/**
 * The OlorinShortcuts component is responsible for rendering a list of shortcuts based on the navigation and shortcuts props.
 * It uses various MUI components to render the list items and search input.
 * The component is memoized to prevent unnecessary re-renders.
 */
function OlorinShortcuts(props: OlorinShortcutsProps) {
	const { navigation = [], shortcuts = [], onChange, variant = 'horizontal', className = '' } = props;

	const searchInputRef = useRef<HTMLInputElement>(null);
	const [addMenu, setAddMenu] = useState<HTMLElement | null>(null);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState<OlorinFlatNavItemType[]>([]);
	const [shortcutItems, setShortcutItems] = useState<OlorinFlatNavItemType[]>([]);

	useEffect(() => {
		const _shortcutItems = shortcuts
			? shortcuts.map((id) => _.find(navigation, { id }))
			: ([] as OlorinFlatNavItemType[]);

		setShortcutItems(_shortcutItems);
	}, [shortcuts]);

	function addMenuClick(event: React.MouseEvent<HTMLElement>) {
		setAddMenu(event.currentTarget);
	}

	function addMenuClose() {
		setAddMenu(null);
	}

	function search(ev: React.ChangeEvent<HTMLInputElement>) {
		const newSearchText = ev.target.value;

		setSearchText(newSearchText);

		if (newSearchText.length !== 0 && navigation) {
			setSearchResults(
				navigation.filter((item) => item?.title?.toLowerCase()?.includes(newSearchText?.toLowerCase())),
			);
			return;
		}

		setSearchResults([]);
	}

	function toggleInShortcuts(id: string) {
		let newShortcuts = [...shortcuts];

		newShortcuts = _.xor(newShortcuts, [id]);

		onChange(newShortcuts);
	}

	return (
		<div className={clsx('flex flex-1', variant === 'vertical' && 'shrink grow-0 flex-col', className)}>
			{useMemo(() => (
					<div className={clsx('flex flex-1', variant === 'vertical' && 'flex-col')}>
						{shortcutItems.map(
							(_item) =>
								_item && (
									<Link
										to={_item.url}
										key={_item.id}
										role="button"
									>
										<Tooltip
											title={_item.title}
											placement={variant === 'horizontal' ? 'bottom' : 'left'}
										>
											<IconButton
												className="h-40 w-40 p-0"
												size="large"
											>
												{_item.icon ? (
													<OlorinSvgIcon>{_item.icon}</OlorinSvgIcon>
												) : (
													<span className="text-20 font-semibold uppercase">
														{_item.title[0]}
													</span>
												)}
											</IconButton>
										</Tooltip>
									</Link>
								),
						)}

						<Tooltip
							title="Click to add/remove shortcut"
							placement={variant === 'horizontal' ? 'bottom' : 'left'}
						>
							<IconButton
								className="h-40 w-40 p-0"
								aria-haspopup="true"
								onClick={addMenuClick}
								size="large"
							>
								<OlorinSvgIcon sx={{ color: amber[600] }}>heroicons-solid:star</OlorinSvgIcon>
							</IconButton>
						</Tooltip>
					</div>
				), [addMenu, variant, shortcutItems])}

			<Menu
				id="add-menu"
				anchorEl={addMenu}
				open={Boolean(addMenu)}
				onClose={addMenuClose}
				classes={{
					paper: 'min-w-256',
				}}
				TransitionProps={{
					onEntered: () => {
						searchInputRef?.current?.focus();
					},
					onExited: () => {
						setSearchText('');
					},
				}}
			>
				<div className="p-16 pt-8">
					<Input
						inputRef={searchInputRef}
						value={searchText}
						onChange={search}
						placeholder="Search for an app or page"
						fullWidth
						inputProps={{
							'aria-label': 'Search',
						}}
						disableUnderline
					/>
				</div>

				<Divider />

				{useMemo(() => {
					if (searchText.length === 0 || !searchResults || searchResults.length === 0) {
						return null;
					}

					return searchResults.map((_item) => (
						<ShortcutMenuItem
							shortcuts={shortcuts}
							key={_item.id}
							item={_item}
							onToggle={() => toggleInShortcuts(_item.id)}
						/>
					));
				}, [searchResults, shortcuts, searchText])}

				{searchText.length !== 0 && searchResults.length === 0 && (
					<Typography
						color="text.secondary"
						className="p-16 pb-8"
					>
						No results..
					</Typography>
				)}

				{useMemo(() => {
					if (searchText.length !== 0) {
						return null;
					}

					return shortcutItems.map(
						(_item) =>
							_item && (
								<ShortcutMenuItem
									shortcuts={shortcuts}
									key={_item.id}
									item={_item}
									onToggle={() => toggleInShortcuts(_item.id)}
								/>
							),
					);
				}, [shortcutItems, shortcuts, searchText])}
			</Menu>
		</div>
	);
}

function ShortcutMenuItem(props: {
	shortcuts: OlorinShortcutsProps['shortcuts'];
	item: OlorinFlatNavItemType;
	onToggle: (T: string) => void;
}) {
	const { item, onToggle, shortcuts = [] } = props;

	if (!item || !item.id) {
		return null;
	}

	return (
		<Link
			to={item.url || ''}
			role="button"
		>
			<MenuItem key={item.id}>
				<ListItemIcon className="min-w-40">
					{item.icon ? (
						<OlorinSvgIcon>{item.icon}</OlorinSvgIcon>
					) : (
						<span className="text-center text-20 font-semibold uppercase">{item.title[0]}</span>
					)}
				</ListItemIcon>
				<ListItemText primary={item.title} />
				<IconButton
					onClick={(ev) => {
						ev.preventDefault();
						ev.stopPropagation();
						onToggle(item.id);
					}}
					size="large"
				>
					<OlorinSvgIcon color="action">
						{shortcuts.includes(item.id) ? 'heroicons-solid:star' : 'heroicons-outline:star'}
					</OlorinSvgIcon>
				</IconButton>
			</MenuItem>
		</Link>
	);
}

export default memo(OlorinShortcuts);
