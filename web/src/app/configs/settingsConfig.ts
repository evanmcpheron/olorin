import themesConfig from 'app/configs/themesConfig';
import { OlorinSettingsConfigType } from '@olorin/core/OlorinSettings/OlorinSettings';

import i18n from '../../i18n';

/**
 * The settingsConfig object is a configuration object for the Olorin application's settings.
 */
const settingsConfig: OlorinSettingsConfigType = {
	/**
	 * The layout object defines the layout style and configuration for the application.
	 */
	layout: {
		/**
		 * The style property defines the layout style for the application.
		 */
		style: 'layout1', // layout1 layout2 layout3
		/**
		 * The config property defines the layout configuration for the application.
		 * Check out default layout configs at app/theme-layouts for example app/theme-layouts/layout1/Layout1Config.js
		 */
		config: {
			mode: 'container',
			containerWidth: 1570,
			navbar: {
				display: true,
				style: 'style-3-dense',
				folded: true,
				position: 'left',
				open: true,
			},
			toolbar: {
				display: true,
				style: 'fixed',
				position: 'below',
			},
			footer: {
				display: false,
				style: 'fixed',
			},
			leftSidePanel: {
				display: true,
			},
			rightSidePanel: {
				display: true,
			},
			scroll: 'content',
		}, // checkout default layout configs at app/theme-layouts for example  app/theme-layouts/layout1/Layout1Config.js
	},

	/**
	 * The customScrollbars property defines whether or not to use custom scrollbars in the application.
	 */
	customScrollbars: false,

	/**
	 * The direction property defines the text direction for the application.
	 */
	direction: i18n.dir(i18n.options.lng) || 'ltr', // rtl, ltr
	/**
	 * The theme object defines the color theme for the application.
	 */
	theme: {
		main: themesConfig.defaultDark,
		navbar: themesConfig.defaultDark,
		toolbar: themesConfig.defaultDark,
		footer: themesConfig.defaultDark,
	},

	/**
	 * The defaultAuth property defines the default authorization roles for the application.
	 * To make the whole app auth protected by default set defaultAuth:['admin','staff','user']
	 * To make the whole app accessible without authorization by default set defaultAuth: null
	 * The individual route configs which have auth option won't be overridden.
	 */
	defaultAuth: ['admin'],

	/**
	 * The loginRedirectUrl property defines the default redirect URL for the logged-in user.
	 */
	loginRedirectUrl: '/',
};

export default settingsConfig;
