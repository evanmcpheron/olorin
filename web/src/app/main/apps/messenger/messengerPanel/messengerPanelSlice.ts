import { WithSlice, createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState: {
	selectedContactId: string;
	open: boolean;
} = {
	selectedContactId: '',
	open: false,
};

/**
 * The slice for the contacts.
 */
export const messengerPanelSlice = createSlice({
	name: 'chatPanel',
	initialState,
	reducers: {
		setSelectedContactId: (state, action) => {
			state.selectedContactId = action.payload as string;
		},
		removeSelectedContactId: (state) => {
			state.selectedContactId = '';
		},
		toggleChatPanel: (state) => {
			state.open = !state;
		},
		openChatPanel: (state) => {
			state.open = true;
		},
		closeChatPanel: (state) => {
			state.open = false;
		},
	},
	selectors: {
		selectSelectedContactId: (state) => state.selectedContactId,
		selectChatPanelOpen: (state) => state.open,
	},
});

/**
 * Lazy load
 * */
rootReducer.inject(messengerPanelSlice);
const injectedSlice = messengerPanelSlice.injectInto(rootReducer);
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof messengerPanelSlice> {}
}

export const { setSelectedContactId, openChatPanel, toggleChatPanel, removeSelectedContactId, closeChatPanel } =
	messengerPanelSlice.actions;

export const { selectSelectedContactId, selectChatPanelOpen } = injectedSlice.selectors;

export type contactsSliceType = typeof messengerPanelSlice;

export default messengerPanelSlice.reducer;
