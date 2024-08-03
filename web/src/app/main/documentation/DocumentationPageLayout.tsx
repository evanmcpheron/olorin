import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import OlorinNavigation from '@olorin/core/OlorinNavigation';
import OlorinSuspense from '@olorin/core/OlorinSuspense';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import OlorinPageSimple from '@olorin/core/OlorinPageSimple';
import Typography from '@mui/material/Typography';
import DocumentationNavigation from './DocumentationNavigation';

const Root = styled(OlorinPageSimple)(({ theme }) => ({
	'& .OlorinPageCarded-header': {},
	'& .OlorinPageCarded-content': {
		backgroundColor: theme.palette.background.default,
	},
	'& .OlorinPageCarded-wrapper': {},
	'& .OlorinPageCarded-leftSidebar': {},
	'& .description': {
		fontSize: 16,
		marginBottom: 24,
	},
}));

/**
 * Documentation Page Layout
 */
function DocumentationPageLayout() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const location = useLocation();
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			setLeftSidebarOpen(false);
		}
	}, [location, isMobile]);

	return (
		<Root
			header={
				<div className="flex items-center justify-center py-12 px-4 md:px-12 max-w-full w-3xl h-full">
					<IconButton
						onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
						aria-label="toggle left sidebar"
						size="large"
					>
						<OlorinSvgIcon>heroicons-outline:view-list</OlorinSvgIcon>
					</IconButton>
					<div className="flex flex-1 items-center sm:justify-center px-8 lg:px-12">
						<Typography
							component={Link}
							color="textPrimary"
							to="/documentation"
							className="text-14 md:text-18 font-medium flex items-center"
							role="button"
						>
							<span>Olorin React - Documentation</span>
						</Typography>
					</div>
				</div>
			}
			content={
				<div className="p-16 md:p-24 max-w-3xl min-h-full flex flex-auto flex-col">
					<div className="flex flex-col flex-1 relative py-32">
						<OlorinSuspense>
							<Outlet />
						</OlorinSuspense>
					</div>
				</div>
			}
			leftSidebarContent={
				<div className="px-16 py-24">
					<OlorinNavigation
						className={clsx('navigation')}
						navigation={DocumentationNavigation.children}
					/>
				</div>
			}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarWidth={288}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default DocumentationPageLayout;
