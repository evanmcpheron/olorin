import { createTheme, getContrastRatio } from '@mui/material/styles';
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from '@lodash';
import {
	defaultSettings,
	defaultThemeOptions,
	extendThemeWithMixins,
	getParsedQuerySettings,
	mustHaveThemeOptions,
} from '@olorin/default-settings';
import settingsConfig from 'app/configs/settingsConfig';
import themeLayoutConfigs from 'app/theme-layouts/themeLayoutConfigs';
import { darkPaletteText, lightPaletteText } from 'app/configs/themesConfig';
import {
	OlorinSettingsConfigType,
	OlorinThemesType,
	OlorinThemeType,
} from '@olorin/core/OlorinSettings/OlorinSettings';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { PartialDeep } from 'type-fest';
import { RootState } from 'app/store/store';
import { resetUser, setUser, setUserSettings } from '../../../app/auth/user/store/userSlice';
// import { showMessage } from '@olorin/core/OlorinMessage/olorinMessageSlice';

export const changeOlorinTheme = createAsyncThunk(
	'olorinSettings/changeOlorinTheme',
	async (theme: OlorinThemesType, { dispatch, getState }) => {
		const AppState = getState() as RootState;
		const settings = AppState.olorinSettings;

		const { navbar, footer, toolbar, main } = theme;

		const newSettings: OlorinSettingsConfigType = {
			...settings.current,
			theme: {
				main,
				navbar,
				toolbar,
				footer,
			},
		};

		return dispatch(setDefaultSettings(newSettings));
	},
);

type layoutProps = {
	style: string;
	config: unknown;
};

/**
 * Gets the initial settings for the application.
 */
function getInitialSettings(): OlorinSettingsConfigType {
	const defaultLayoutStyle =
		settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layout1';

	const layout: layoutProps = {
		style: defaultLayoutStyle,
		config: themeLayoutConfigs[defaultLayoutStyle].defaults,
	};

	return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}

/**
 * Generates the settings object by merging the default settings with the new settings.
 */
export function generateSettings(
	_defaultSettings: PartialDeep<OlorinSettingsConfigType>,
	_newSettings: OlorinSettingsConfigType,
) {
	return _.merge(
		{},
		_defaultSettings,
		{ layout: { config: themeLayoutConfigs[_newSettings?.layout?.style]?.defaults } },
		_newSettings,
	);
}

const initialSettings = getInitialSettings();

/**
 * The type definition for the initial state.
 */
type initialStateProps = {
	initial: OlorinSettingsConfigType;
	defaults: OlorinSettingsConfigType;
	current: OlorinSettingsConfigType;
};

/**
 * The initial state.
 */
const initialState: initialStateProps = {
	initial: initialSettings,
	defaults: _.merge({}, initialSettings),
	current: _.merge({}, initialSettings),
};

/**
 * Sets the default settings for the application.
 */
export const setDefaultSettings = createAsyncThunk(
	'olorinSettings/setDefaultSettings',
	async (val: PartialDeep<OlorinSettingsConfigType>, { dispatch, getState }) => {
		const AppState = getState() as RootState;

		const settings = AppState.olorinSettings;

		const defaults = generateSettings(settings.defaults, val as OlorinSettingsConfigType);

		dispatch(setUserSettings(defaults));

		return {
			...settings,
			defaults: _.merge({}, defaults),
			current: _.merge({}, defaults),
		};
	},
);

/**
 * The settings slice.
 */
export const olorinSettingsSlice = createSlice({
	name: 'olorinSettings',
	initialState,
	reducers: {
		setSettings: (state, action: PayloadAction<OlorinSettingsConfigType>) => {
			const current = generateSettings(state.defaults, action.payload);

			return {
				...state,
				current,
			};
		},

		setInitialSettings: () => _.merge({}, initialState),
		resetSettings: (state) => ({
			...state,
			defaults: _.merge({}, state.defaults),
			current: _.merge({}, state.defaults),
		}),
	},
	extraReducers: (builder) => {
		builder
			.addCase(setDefaultSettings.fulfilled, (state, action) => action.payload)
			.addCase(setUser.fulfilled, (state, action) => {
				const defaults = generateSettings(
					state.defaults,
					action.payload?.data?.settings as OlorinSettingsConfigType,
				);
				return {
					...state,
					defaults: _.merge({}, defaults),
					current: _.merge({}, defaults),
				};
			})
			.addCase(resetUser.fulfilled, (state) => ({
					...state,
					defaults: _.merge({}, initialSettings),
					current: _.merge({}, initialSettings),
				}));
	},
	selectors: {
		selectOlorinSettings: (olorinSettings) => olorinSettings,
		selectOlorinSettingsDefaults: (olorinSettings) => olorinSettings.defaults,
		selectOlorinSettingsCurrent: (olorinSettings) => olorinSettings.current,
		selectOlorinCurrentSettings: (olorinSettings) => olorinSettings.current,
		getDirection: (olorinSettings) => olorinSettings.current.direction,
		getMainTheme: (olorinSettings) => olorinSettings.current.theme.main,
		getNavbarTheme: (olorinSettings) => olorinSettings.current.theme.navbar,
		getToolbarTheme: (olorinSettings) => olorinSettings.current.theme.toolbar,
		getFooterTheme: (olorinSettings) => olorinSettings.current.theme.footer,
		selectOlorinCurrentLayoutConfig: (olorinSettings) => olorinSettings.current.layout.config,
		selectOlorinDefaultSettings: (olorinSettings) => olorinSettings.defaults,
		selectCustomScrollbarsEnabled: (olorinSettings) => olorinSettings.current.customScrollbars,
	},
});

type directionType = 'ltr' | 'rtl';

export const {
	selectOlorinCurrentLayoutConfig,
	selectOlorinCurrentSettings,
	selectOlorinSettings,
	selectOlorinSettingsDefaults,
	selectOlorinSettingsCurrent,
	selectOlorinDefaultSettings,
	selectCustomScrollbarsEnabled,
	getDirection,
	getMainTheme,
	getNavbarTheme,
	getToolbarTheme,
	getFooterTheme,
} = olorinSettingsSlice.selectors;

/**
 * Generates the MUI theme object.
 */
function generateMuiTheme(theme: OlorinThemeType, direction: directionType) {
	const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions) as ThemeOptions;

	return createTheme(
		_.merge({}, data, {
			mixins: extendThemeWithMixins(data),
			direction,
		} as ThemeOptions),
	);
}

/**
 * Selects the contrast theme based on the background color.
 */
export const selectContrastMainTheme = (bgColor: string) => {
	function isDark(color: string) {
		return getContrastRatio(color, '#ffffff') >= 3;
	}

	return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight;
};

/**
 * Changes the theme mode.
 */
function changeThemeMode(theme: OlorinThemeType, mode: 'dark' | 'light'): OlorinThemeType {
	const modes = {
		dark: {
			palette: {
				mode: 'dark',
				divider: 'rgba(241,245,249,.12)',
				background: {
					paper: '#1E2125',
					default: '#121212',
				},
				text: darkPaletteText,
			},
		},
		light: {
			palette: {
				mode: 'light',
				divider: '#e2e8f0',
				background: {
					paper: '#FFFFFF',
					default: '#F7F7F7',
				},
				text: lightPaletteText,
			},
		},
	};

	return _.merge({}, theme, modes[mode]);
}

export const selectMainTheme = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction),
);

export const selectMainThemeDark = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction),
);

export const selectMainThemeLight = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction),
);

export const selectNavbarTheme = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction),
);

export const selectNavbarThemeDark = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction),
);

export const selectNavbarThemeLight = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction),
);

export const selectToolbarTheme = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction),
);

export const selectToolbarThemeDark = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction),
);

export const selectToolbarThemeLight = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction),
);

export const selectFooterTheme = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction),
);

export const selectFooterThemeDark = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction),
);

export const selectFooterThemeLight = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction),
);
// export const selectOlorinThemesSettings = (state: RootState) => state.olorinSettings.themes;

export const { resetSettings, setInitialSettings, setSettings } = olorinSettingsSlice.actions;

export type settingsSliceType = typeof olorinSettingsSlice;

export default olorinSettingsSlice.reducer;
