import { lazy } from 'react';
import TsFileRenamingMigrationDoc from './ts-migration/TsFileRenamingMigrationDoc';
import CodeSplittingDoc from './code-splitting/CodeSplittingDoc';
import MultiLanguageDoc from './multi-language/MultiLanguageDoc';

const DevelopmentServerDoc = lazy(() => import('./development-server/DevelopmentServerDoc'));
const ProductionDoc = lazy(() => import('./production/ProductionDoc'));
const DeploymentDoc = lazy(() => import('./deployment/DeploymentDoc'));
const DirectoryStructureDoc = lazy(() => import('./directory-structure/DirectoryStructureDoc'));
const ApiCallsDoc = lazy(() => import('./api-calls/ApiCallsDoc'));
const UpdatingOlorinReactDoc = lazy(() => import('./updating-olorin-react/UpdatingOlorinReactDoc'));
const IDEsDoc = lazy(() => import('./ides-vscode-webstorm/IDEsDoc'));

/**
 * Development Doc Routes
 */
const DevelopmentDocRoutes = [
	{
		path: 'development/development-server',
		element: <DevelopmentServerDoc />,
	},
	{
		path: 'development/production',
		element: <ProductionDoc />,
	},
	{
		path: 'development/deployment',
		element: <DeploymentDoc />,
	},
	{
		path: 'development/directory-structure',
		element: <DirectoryStructureDoc />,
	},
	{
		path: 'development/api-calls',
		element: <ApiCallsDoc />,
	},
	{
		path: 'development/code-splitting',
		element: <CodeSplittingDoc />,
	},
	{
		path: 'development/multi-language',
		element: <MultiLanguageDoc />,
	},
	{
		path: 'development/updating-olorin-react',
		element: <UpdatingOlorinReactDoc />,
	},
	{
		path: 'development/ts-file-rename-migration',
		element: <TsFileRenamingMigrationDoc />,
	},
	{
		path: 'development/ides-vscode-webstorm',
		element: <IDEsDoc />,
	},
];

export default DevelopmentDocRoutes;
