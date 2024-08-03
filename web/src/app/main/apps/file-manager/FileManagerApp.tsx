import OlorinPageCarded from '@olorin/core/OlorinPageCarded';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import { useParams } from 'react-router-dom';
import OlorinLoading from '@olorin/core/OlorinLoading';
import * as React from 'react';
import _ from '@lodash';
import { useAppSelector } from 'app/store/hooks';
import DetailSidebarContent from './DetailSidebarContent';
import FileManagerHeader from './FileManagerHeader';
import FileManagerList from './FileManagerList';
import { useGetFileManagerFolderQuery } from './FileManagerApi';
import { selectSelectedItemId } from './fileManagerAppSlice';

/**
 * The file manager app.
 */
function FileManagerApp() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();
	const { folderId } = routeParams;

	const { data, isLoading } = useGetFileManagerFolderQuery(folderId);

	const selectedItemId = useAppSelector(selectSelectedItemId);
	const selectedItem = _.find(data?.items, { id: selectedItemId });

	const folders = _.filter(data?.items, { type: 'folder' });
	const files = _.reject(data?.items, { type: 'folder' });

	const path = data?.path;

	if (isLoading) {
		return <OlorinLoading />;
	}

	return (
		<OlorinPageCarded
			header={
				<FileManagerHeader
					path={path}
					folders={folders}
					files={files}
				/>
			}
			content={
				<FileManagerList
					folders={folders}
					files={files}
				/>
			}
			rightSidebarOpen={Boolean(selectedItem)}
			rightSidebarContent={
				<div className="w-full">
					<DetailSidebarContent items={data?.items} />
				</div>
			}
			rightSidebarWidth={400}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default FileManagerApp;
