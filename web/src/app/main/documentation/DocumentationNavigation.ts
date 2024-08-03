import { OlorinNavItemType } from '@olorin/core/OlorinNavigation/types/OlorinNavItemType';
import { olorinReactLatestVersion } from './changelog/ChangelogDoc';
import OlorinComponentsNavigation from './olorin-components/OlorinComponentsNavigation';
import MaterialUIComponentsNavigation from './material-ui-components/MaterialUIComponentsNavigation';
import ThirdPartyComponentsNavigation from './third-party-components/ThirdPartyComponentsNavigation';

/**
 * Documentation Navigation
 */
const DocumentationNavigation: OlorinNavItemType = {
	id: 'documentation',
	title: 'Documentation',
	subtitle: 'Everything you need to know about Olorin',
	icon: 'heroicons-outline:support',
	type: 'group',
	children: [
		{
			id: 'changelog',
			title: 'Changelog',
			type: 'item',
			icon: 'heroicons-outline:speakerphone',
			url: '/documentation/changelog',
			badge: {
				title: olorinReactLatestVersion,
				bg: 'rgb(236, 12, 142)',
				fg: '#FFFFFF',
			},
		},
		{
			id: 'getting-started',
			title: 'Getting Started',
			type: 'collapse',
			icon: 'play_arrow',
			children: [
				{
					id: 'introduction-doc',
					title: 'Introduction',
					type: 'item',
					url: '/documentation/getting-started/introduction',
				},
				{
					id: 'installation-doc',
					title: 'Installation',
					type: 'item',
					url: '/documentation/getting-started/installation',
				},
				{
					id: 'git-repository-doc',
					title: 'Git Repository',
					type: 'item',
					url: '/documentation/getting-started/git-repository',
				},
			],
		},
		{
			id: 'development',
			title: 'Development',
			type: 'collapse',
			icon: 'developer_board',
			children: [
				{
					id: 'development-server-doc',
					title: 'Development Server',
					type: 'item',
					url: '/documentation/development/development-server',
				},
				{
					id: 'production-doc',
					title: 'Production Build',
					type: 'item',
					url: '/documentation/development/production',
				},
				{
					id: 'deployment-doc',
					title: 'Deployment',
					type: 'item',
					url: '/documentation/development/deployment',
				},
				{
					id: 'directory-structure-doc',
					title: 'Directory Structure',
					type: 'item',
					url: '/documentation/development/directory-structure',
				},
				{
					id: 'api-calls-doc',
					title: 'API Calls',
					type: 'item',
					url: '/documentation/development/api-calls',
				},
				{
					id: 'olorin-react-code-splitting-doc',
					title: 'Code Splitting',
					type: 'item',
					url: '/documentation/development/code-splitting',
				},
				{
					id: 'olorin-react-multi-language-doc',
					title: 'Multi Language',
					type: 'item',
					url: '/documentation/development/multi-language',
				},
				{
					id: 'updating-olorin-react-doc',
					title: 'Updating Olorin React',
					type: 'item',
					url: '/documentation/development/updating-olorin-react',
				},
				{
					id: 'ts-file-remaming-migration-doc',
					title: 'Typescript migration: File renaming helpter',
					type: 'item',
					url: '/documentation/development/ts-file-rename-migration',
				},
				{
					id: 'olorin-react-ides-vscode-webstorm-doc',
					title: 'IDEs (Webstorm, VsCode)',
					type: 'item',
					url: '/documentation/development/ides-vscode-webstorm',
				},
			],
		},
		{
			id: 'mock-api',
			title: 'Mock API',
			type: 'item',
			icon: 'heroicons-outline:cloud',
			url: '/documentation/mock-api',
		},
		{
			id: 'theming',
			title: 'Theming',
			type: 'collapse',
			icon: 'palette',
			children: [
				{
					id: 'theme-schemes-doc',
					title: 'Theme Schemes',
					type: 'item',
					url: '/documentation/theming/theme-schemes',
				},
				{
					id: 'theme-layouts-doc',
					title: 'Theme Layouts',
					type: 'item',
					url: '/documentation/theming/theme-layouts',
				},
				{
					id: 'page-layouts-doc',
					title: 'Page Layouts',
					type: 'item',
					url: '/documentation/theming/page-layouts',
				},
				{
					id: 'rtl-doc',
					title: 'RTL Support',
					type: 'item',
					url: '/documentation/theming/rtl-support',
				},
				{
					id: 'changing-default-font-doc',
					title: 'Changing Default Font',
					type: 'item',
					url: '/documentation/theming/changing-default-font',
				},
			],
		},
		{
			id: 'configs',
			title: 'Configuration',
			type: 'collapse',
			icon: 'settings',
			children: [
				{
					id: 'default-settings-doc',
					title: 'Default Settings',
					type: 'item',
					url: '/documentation/configuration/settings',
				},
				{
					id: 'olorin-react-routing-doc',
					title: 'Routing',
					type: 'item',
					url: '/documentation/configuration/routing',
				},
				{
					id: 'olorin-react-navigation-doc',
					title: 'Navigation',
					type: 'item',
					url: '/documentation/configuration/navigation',
				},
			],
		},
		{
			id: 'authentication',
			title: 'Authentication',
			type: 'item',
			icon: 'verified_user',
			url: '/documentation/authentication',
		},
		OlorinComponentsNavigation,
		MaterialUIComponentsNavigation,
		ThirdPartyComponentsNavigation,
	],
};

export default DocumentationNavigation;
