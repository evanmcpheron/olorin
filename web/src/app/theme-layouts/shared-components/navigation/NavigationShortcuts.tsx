import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import OlorinShortcuts from '@olorin/core/OlorinShortcuts';
import {
	selectIsUserGuest,
	selectUser,
	selectUserShortcuts,
	setUserShortcuts,
} from 'src/app/auth/user/store/userSlice';
import { usePrevious } from '@olorin/hooks';
import { useEffect } from 'react';
import _ from '@lodash';
import useAuth from 'src/app/auth/useAuth';
import withSlices from 'app/store/withSlices';
import { navigationSlice, selectFlatNavigation } from './store/navigationSlice';
import { User } from '../../../auth/user';

type NavigationShortcutsProps = {
	className?: string;
	variant?: 'horizontal' | 'vertical';
};

/**
 * The navigation shortcuts.
 */
function NavigationShortcuts(props: NavigationShortcutsProps) {
	const { variant, className } = props;
	const dispatch = useAppDispatch();
	const navigation = useAppSelector(selectFlatNavigation);
	const user = useAppSelector(selectUser);

	const userShortcuts = useAppSelector(selectUserShortcuts) || [];
	const isUserGuest = useAppSelector(selectIsUserGuest);
	const prevUserShortcuts = usePrevious(userShortcuts);

	const { updateUser: updateUserService } = useAuth();

	useEffect(() => {
		if (!isUserGuest && prevUserShortcuts && !_.isEqual(userShortcuts, prevUserShortcuts)) {
			updateUserService(_.setIn(user, 'data.shortcuts', userShortcuts) as User);
		}
	}, [isUserGuest, userShortcuts]);

	function handleShortcutsChange(newShortcuts: string[]) {
		dispatch(setUserShortcuts(newShortcuts));
	}

	return (
		<OlorinShortcuts
			className={className}
			variant={variant}
			navigation={navigation}
			shortcuts={userShortcuts}
			onChange={handleShortcutsChange}
		/>
	);
}

export default withSlices<NavigationShortcutsProps>([navigationSlice])(NavigationShortcuts);
