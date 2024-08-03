import { createEntityAdapter, createSelector, createSlice, PayloadAction, WithSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'app/store/store';
import { PartialDeep } from 'type-fest';
import { OlorinFlatNavItemType, OlorinNavItemType } from '@olorin/core/OlorinNavigation/types/OlorinNavItemType';
import { selectUserRole } from 'src/app/auth/user/store/userSlice';
import OlorinNavigationHelper from '@olorin/utils/OlorinNavigationHelper';
import i18next from 'i18next';
import OlorinNavItemModel from '@olorin/core/OlorinNavigation/models/OlorinNavItemModel';
import OlorinUtils from '@olorin/utils';
import navigationConfig from 'app/configs/navigationConfig';
import { selectCurrentLanguageId } from 'app/store/i18nSlice';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const navigationAdapter = createEntityAdapter<OlorinFlatNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState([]);

const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	OlorinNavigationHelper.flattenNavigation(navigationConfig),
);

/**
 * Redux Thunk actions related to the navigation store state
 */
/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem =
	(item: OlorinNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = OlorinNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(OlorinNavigationHelper.appendNavItem(navigation, OlorinNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem =
	(item: OlorinNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = OlorinNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(OlorinNavigationHelper.prependNavItem(navigation, OlorinNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem =
	(id: string, item: PartialDeep<OlorinNavItemType>): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = OlorinNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(OlorinNavigationHelper.updateNavItem(navigation, id, item)));

		return Promise.resolve();
	};

/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = OlorinNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(OlorinNavigationHelper.removeNavItem(navigation, id)));

		return Promise.resolve();
	};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById,
} = navigationAdapter.getSelectors<RootState>((state) => state.navigation);

/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(state, action: PayloadAction<OlorinNavItemType[]>) {
			return navigationAdapter.setAll(state, OlorinNavigationHelper.flattenNavigation(action.payload));
		},
		resetNavigation: () => initialState,
	},
});

/**
 * Lazy load
 * */
rootReducer.inject(navigationSlice);
navigationSlice.injectInto(rootReducer);
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof navigationSlice> {}
}

export const { setNavigation, resetNavigation } = navigationSlice.actions;

export const selectNavigation = createSelector(
	[selectNavigationAll, selectUserRole, selectCurrentLanguageId],
	(navigationSimple, userRole) => {
		const navigation = OlorinNavigationHelper.unflattenNavigation(navigationSimple);

		function setAdditionalData(data: OlorinNavItemType[]): OlorinNavItemType[] {
			return data?.map((item) => ({
				hasPermission: Boolean(OlorinUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item?.translate && item?.title ? { title: i18next.t(`navigation:${item?.translate}`) } : {}),
				...(item?.children ? { children: setAdditionalData(item?.children) } : {}),
			}));
		}

		const translatedValues = setAdditionalData(navigation);

		return translatedValues;
	},
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) => OlorinNavigationHelper.flattenNavigation(navigation));

export type navigationSliceType = typeof navigationSlice;

export default navigationSlice.reducer;
