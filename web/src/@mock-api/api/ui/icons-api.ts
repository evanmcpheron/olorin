import mockApi from '../../mock-api.json';
import ExtendedMockAdapter from '../../ExtendedMockAdapter';

const heroiconsApi = mockApi.components.examples.icons_heroicons.value;
const materialIconsApi = mockApi.components.examples.icons_material.value;
const featherIconsApi = mockApi.components.examples.icons_feather.value;

export const iconsApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/ui/icons/heroicons').reply(() => [200, heroiconsApi]);

	mock.onGet('/ui/icons/material').reply(() => [200, materialIconsApi]);

	mock.onGet('/ui/icons/feather').reply(() => [200, featherIconsApi]);
};
