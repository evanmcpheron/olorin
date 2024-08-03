import { Navigate } from 'react-router-dom';
import { OlorinRouteConfigType } from '@olorin/utils/OlorinUtils';
import CompactInvoicePage from './printable/CompactInvoicePage';
import ModernInvoicePage from './printable/ModernInvoicePage';

/**
 * The invoice pages config.
 */
const invoicePagesConfig: OlorinRouteConfigType = {
	settings: {
		layout: {
			config: {},
		},
	},
	routes: [
		{
			path: 'pages/invoice/printable',
			children: [
				{
					path: '',
					element: <Navigate to="compact" />,
				},
				{
					path: 'compact',
					element: <CompactInvoicePage />,
				},
				{
					path: 'modern',
					element: <ModernInvoicePage />,
				},
			],
		},
	],
};

export default invoicePagesConfig;
