import { apiService as api } from 'app/store/apiService';
import { rootReducer } from 'app/store/lazyLoadedSlices';
import { WithSlice } from '@reduxjs/toolkit';
import AgeWidgetType from './widgets/types/AgeWidgetType';
import ConversionsWidgetType from './widgets/types/ConversionsWidgetType';
import GenderWidgetType from './widgets/types/GenderWidgetType';
import ImpressionsWidgetType from './widgets/types/ImpressionsWidgetType';
import LanguageWidgetType from './widgets/types/LanguageWidgetType';
import NewVsReturningWidgetType from './widgets/types/NewVsReturningWidgetType';
import VisitsWidgetType from './widgets/types/VisitsWidgetType';
import VisitorsVsPageViewsType from './widgets/types/VisitorsVsPageViewsType';

export const addTagTypes = ['analytics_dashboard_widgets'] as const;

const AnalyticsDashboardApi = api
	.enhanceEndpoints({
		addTagTypes,
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAnalyticsDashboardWidgets: build.query<
				GetAnalyticsDashboardWidgetsApiResponse,
				GetAnalyticsDashboardWidgetsApiArg
			>({
				query: () => ({ url: '/mock-api/dashboards/analytics/widgets' }),
				providesTags: ['analytics_dashboard_widgets'],
			}),
		}),
		overrideExisting: false,
	});
export default AnalyticsDashboardApi;

export type GetAnalyticsDashboardWidgetsApiResponse = {
	[key: string]:
		| AgeWidgetType
		| ConversionsWidgetType
		| GenderWidgetType
		| ImpressionsWidgetType
		| LanguageWidgetType
		| NewVsReturningWidgetType
		| VisitsWidgetType
		| VisitorsVsPageViewsType;
};
export type GetAnalyticsDashboardWidgetsApiArg = void;

export const { useGetAnalyticsDashboardWidgetsQuery } = AnalyticsDashboardApi;

declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof AnalyticsDashboardApi> {}
}

export const selectWidget = <T>(id: string) =>
	rootReducer.selector((state) => {
		const widgets = AnalyticsDashboardApi.endpoints.getAnalyticsDashboardWidgets.select()(state)?.data;
		return widgets?.[id] as T;
	});
