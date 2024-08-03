import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import OlorinPageSimpleSidebarContent from './OlorinPageSimpleSidebarContent';

/**
 * Props for the OlorinPageSimpleSidebar component.
 */
type OlorinPageSimpleSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
};

/**
 * The OlorinPageSimpleSidebar component.
 */
const OlorinPageSimpleSidebar = forwardRef<{ toggleSidebar:(T: boolean) => void }, OlorinPageSimpleSidebarProps>(
	(props, ref) => {
		const { open = true, position, variant, onClose = () => {} } = props;

		const [isOpen, setIsOpen] = useState(open);

		useImperativeHandle(ref, () => ({
			toggleSidebar: handleToggleDrawer,
		}));

		const handleToggleDrawer = useCallback((val: boolean) => {
			setIsOpen(val);
		}, []);

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
							root: clsx('OlorinPageSimple-sidebarWrapper', variant),
							paper: clsx(
								'OlorinPageSimple-sidebar',
								variant,
								position === 'left' ? 'OlorinPageSimple-leftSidebar' : 'OlorinPageSimple-rightSidebar',
								'max-w-full',
							),
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						// container={rootRef.current}
						BackdropProps={{
							classes: {
								root: 'OlorinPageSimple-backdrop',
							},
						}}
						style={{ position: 'absolute' }}
					>
						<OlorinPageSimpleSidebarContent {...props} />
					</SwipeableDrawer>
				</Hidden>

				{variant === 'permanent' && (
					<Hidden lgDown>
						<Drawer
							variant="permanent"
							anchor={position}
							className={clsx(
								'OlorinPageSimple-sidebarWrapper',
								variant,
								isOpen ? 'opened' : 'closed',
								position === 'left' ? 'OlorinPageSimple-leftSidebar' : 'OlorinPageSimple-rightSidebar',
							)}
							open={isOpen}
							onClose={onClose}
							classes={{
								paper: clsx('OlorinPageSimple-sidebar border-0', variant),
							}}
						>
							<OlorinPageSimpleSidebarContent {...props} />
						</Drawer>
					</Hidden>
				)}
			</>
		);
	},
);

export default OlorinPageSimpleSidebar;
