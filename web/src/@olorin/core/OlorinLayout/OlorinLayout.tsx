import { useDeepCompareEffect } from '@olorin/hooks';
import _ from '@lodash';
import AppContext from 'app/AppContext';
import {
	generateSettings,
	selectOlorinCurrentSettings,
	selectOlorinDefaultSettings,
	setSettings,
} from '@olorin/core/OlorinSettings/olorinSettingsSlice';
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { matchRoutes, useLocation, RouteMatch, RouteObject } from 'react-router-dom';
import { OlorinSettingsConfigType } from '@olorin/core/OlorinSettings/OlorinSettings';
import { themeLayoutsType } from 'app/theme-layouts/themeLayouts';
import { PartialDeep } from 'type-fest';
import OlorinLoading from '../OlorinLoading';

export type OlorinRouteObjectType = RouteObject & {
	settings?: OlorinSettingsConfigType;
};

export type OlorinRouteMatchType = RouteMatch & {
	route: OlorinRouteObjectType;
};

type OlorinLayoutProps = {
	layouts: themeLayoutsType;
	children?: React.ReactNode;
};

/**
 * OlorinLayout
 * React frontend component in a React project that is used for layouting the user interface. The component
 * handles generating user interface settings related to current routes, merged with default settings, and uses
 * the new settings to generate layouts.
 */
function OlorinLayout(props: OlorinLayoutProps) {
	const { layouts, children } = props;
	const dispatch = useAppDispatch();
	const settings = useAppSelector(selectOlorinCurrentSettings);
	const defaultSettings = useAppSelector(selectOlorinDefaultSettings);

	const layoutStyle = settings.layout.style;

	const appContext = useContext(AppContext);
	const { routes } = appContext;

	const location = useLocation();
	const { pathname } = location;

	const matchedRoutes = matchRoutes(routes, pathname) as OlorinRouteMatchType[] | null;

	const matched = matchedRoutes?.[0] || false;

	const newSettings = useRef<PartialDeep<OlorinSettingsConfigType>>(settings);

	const shouldAwaitRender = useCallback(() => {
		let _newSettings: OlorinSettingsConfigType;

		/**
		 * On Path changed
		 */
		// if (prevPathname !== pathname) {
		if (typeof matched !== 'boolean') {
			/**
			 * if matched route has settings
			 */

			const routeSettings = matched.route.settings;

			_newSettings = generateSettings(defaultSettings, routeSettings);
		} else if (!_.isEqual(newSettings.current, defaultSettings)) {
			/**
			 * Reset to default settings on the new path
			 */
			_newSettings = _.merge({}, defaultSettings);
		} else {
			_newSettings = newSettings.current as OlorinSettingsConfigType;
		}

		if (!_.isEqual(newSettings.current, _newSettings)) {
			newSettings.current = _newSettings;
		}
	}, [defaultSettings, matched]);

	shouldAwaitRender();

	const currentSettings = useMemo(() => newSettings.current, [newSettings.current]);

	useDeepCompareEffect(() => {
		if (!_.isEqual(currentSettings, settings)) {
			dispatch(setSettings(currentSettings as OlorinSettingsConfigType));
		}
	}, [dispatch, currentSettings, settings]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return useMemo(() => {
		if (!_.isEqual(currentSettings, settings)) {
			return <OlorinLoading />;
		}

		return Object.entries(layouts).map(([key, Layout]) => {
			if (key === layoutStyle) {
				return (
					<React.Fragment key={key}>
						<Layout>{children}</Layout>
					</React.Fragment>
				);
			}

			return null;
		});
	}, [layouts, layoutStyle, children, currentSettings, settings]);
}

export default OlorinLayout;
