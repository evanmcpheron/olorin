import { OlorinRouteConfigsType } from '@olorin/utils/OlorinUtils';
import iconsUIConfig from './icons/iconsUIConfig';
import tailwindcssUIConfig from './tailwindcss/tailwindcssUIConfig';
import typographyUIConfig from './typography/typographyUIConfig';
import pageLayoutsUIConfig from './page-layouts/pageLayoutsUIConfig';

/**
 * The user interface configs.
 */
const UserInterfaceConfigs: OlorinRouteConfigsType = [
	iconsUIConfig,
	tailwindcssUIConfig,
	typographyUIConfig,
	pageLayoutsUIConfig,
];

export default UserInterfaceConfigs;
