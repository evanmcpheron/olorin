import { createSlice, PayloadAction, WithSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
import { ReactElement } from 'react';

type InitialStateProps = {
	open: boolean;
	children: ReactElement | string;
};

/**
 * The initial state of the dialog slice.
 */
const initialState: InitialStateProps = {
	open: false,
	children: '',
};

/**
 * The Olorin Dialog slice
 */
export const olorinDialogSlice = createSlice({
	name: 'olorinDialog',
	initialState,
	reducers: {
		openDialog: (state, action: PayloadAction<{ children: InitialStateProps['children'] }>) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState,
	},
	selectors: {
		selectOlorinDialogState: (olorinDialog) => olorinDialog.open,
		selectOlorinDialogProps: (olorinDialog) => olorinDialog,
	},
});

/**
 * Lazy load
 * */
rootReducer.inject(olorinDialogSlice);
const injectedSlice = olorinDialogSlice.injectInto(rootReducer);
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof olorinDialogSlice> {}
}

export const { closeDialog, openDialog } = olorinDialogSlice.actions;

export const { selectOlorinDialogState, selectOlorinDialogProps } = injectedSlice.selectors;

export type dialogSliceType = typeof olorinDialogSlice;

export default olorinDialogSlice.reducer;
