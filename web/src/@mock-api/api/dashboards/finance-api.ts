import mockApi from '../../mock-api.json';
import ExtendedMockAdapter from '../../ExtendedMockAdapter';

const widgets = mockApi.components.examples.finance_dashboard_widgets.value;

export const financeDashboardApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/dashboards/finance/widgets').reply(() => [200, widgets]);
};
