import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { ChatAppContext } from '../MessengerApp';

type MainSidebarMoreMenuProps = {
	className?: string;
};

/**
 * The main sidebar more menu.
 */
function MainSidebarMoreMenu(props: MainSidebarMoreMenuProps) {
	const { setContactSidebarOpen } = useContext(ChatAppContext);

	const { className } = props;

	const [moreMenuEl, setMoreMenuEl] = useState<HTMLElement | null>(null);

	function handleMoreMenuClick(event: React.MouseEvent<HTMLElement>) {
		setMoreMenuEl(event.currentTarget);
	}

	function handleMoreMenuClose() {
		setMoreMenuEl(null);
	}

	return (
		<div className={className}>
			<IconButton
				aria-haspopup="true"
				onClick={handleMoreMenuClick}
				size="large"
			>
				<OlorinSvgIcon>heroicons-outline:dots-vertical</OlorinSvgIcon>
			</IconButton>
			<Menu
				id="chats-more-menu"
				anchorEl={moreMenuEl}
				open={Boolean(moreMenuEl)}
				onClose={handleMoreMenuClose}
			>
				<MenuItem
					onClick={() => {
						setContactSidebarOpen(true);
						handleMoreMenuClose();
					}}
				>
					Contact info
				</MenuItem>
			</Menu>
		</div>
	);
}

export default MainSidebarMoreMenu;
