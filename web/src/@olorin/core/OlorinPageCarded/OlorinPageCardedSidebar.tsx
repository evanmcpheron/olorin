import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState, ReactNode } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import OlorinPageCardedSidebarContent from './OlorinPageCardedSidebarContent';

/**
 * Props for the OlorinPageCardedSidebar component.
 */
type OlorinPageCardedSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
};

/**
 * The OlorinPageCardedSidebar component is a sidebar for the OlorinPageCarded component.
 */
const OlorinPageCardedSidebar = forwardRef<{ toggleSidebar:(T: boolean) => void }, OlorinPageCardedSidebarProps>(
	(props, ref) => {
		const { open = true, position, variant, onClose = () => {} } = props;

		const [isOpen, setIsOpen] = useState(open);

		const handleToggleDrawer = useCallback((val: boolean) => {
			setIsOpen(val);
		}, []);

		useImperativeHandle(ref, () => ({
			toggleSidebar: handleToggleDrawer,
		}));

		useEffect(() => {
			handleToggleDrawer(open);
		}, [handleToggleDrawer, open]);

		return (
			<>
				<Hidden lgUp={variant === 'permanent'}>
					<SwipeableDrawer
						variant="temporary"
						anchor={position}
						open={isOpen}
						onOpen={() => {}}
						onClose={() => onClose()}
						disableSwipeToOpen
						classes={{
							root: clsx('OlorinPageCarded-sidebarWrapper', variant),
							paper: clsx(
								'OlorinPageCarded-sidebar',
								variant,
								position === 'left' ? 'OlorinPageCarded-leftSidebar' : 'OlorinPageCarded-rightSidebar',
							),
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						BackdropProps={{
							classes: {
								root: 'OlorinPageCarded-backdrop',
							},
						}}
						style={{ position: 'absolute' }}
					>
						<OlorinPageCardedSidebarContent {...props} />
					</SwipeableDrawer>
				</Hidden>
				{variant === 'permanent' && (
					<Hidden lgDown>
						<Drawer
							variant="permanent"
							anchor={position}
							className={clsx(
								'OlorinPageCarded-sidebarWrapper',
								variant,
								isOpen ? 'opened' : 'closed',
								position === 'left' ? 'OlorinPageCarded-leftSidebar' : 'OlorinPageCarded-rightSidebar',
							)}
							open={isOpen}
							onClose={onClose}
							classes={{
								paper: clsx('OlorinPageCarded-sidebar', variant),
							}}
						>
							<OlorinPageCardedSidebarContent {...props} />
						</Drawer>
					</Hidden>
				)}
			</>
		);
	},
);

export default OlorinPageCardedSidebar;
