import { createSlice, PayloadAction, WithSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
import { ReactElement } from 'react';

/**
 * The type definition for the initial state of the message slice.
 */
type initialStateProps = {
	state: boolean;
	options: {
		variant: 'success' | 'error' | 'warning' | 'info';
		anchorOrigin: {
			vertical: 'top' | 'bottom';
			horizontal: 'left' | 'center' | 'right';
		};
		autoHideDuration: number | null;
		message: ReactElement | string;
	};
};

/**
 * The initial state of the message slice.
 */
const initialState: initialStateProps = {
	state: false,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center',
		},
		autoHideDuration: 2000,
		message: 'Hi',
	},
};

/**
 * The Message slice.
 */
export const olorinMessageSlice = createSlice({
	name: 'olorinMessage',
	initialState,
	reducers: {
		showMessage(state, action: PayloadAction<Partial<initialStateProps['options']>>) {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload,
			};
		},
		hideMessage(state) {
			state.state = false;
		},
	},
	selectors: {
		selectOlorinMessageState: (olorinMessage) => olorinMessage.state,
		selectOlorinMessageOptions: (olorinMessage) => olorinMessage.options,
	},
});

/**
 * Lazy load
 * */
rootReducer.inject(olorinMessageSlice);
const injectedSlice = olorinMessageSlice.injectInto(rootReducer);
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof olorinMessageSlice> {}
}

export const { hideMessage, showMessage } = olorinMessageSlice.actions;

export const { selectOlorinMessageOptions, selectOlorinMessageState } = injectedSlice.selectors;

export type messageSliceType = typeof olorinMessageSlice;

export default olorinMessageSlice.reducer;
