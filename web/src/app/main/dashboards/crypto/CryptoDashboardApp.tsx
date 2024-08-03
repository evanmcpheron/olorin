import { useEffect, useState } from 'react';
import OlorinPageSimple from '@olorin/core/OlorinPageSimple';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import OlorinLoading from '@olorin/core/OlorinLoading';
import CryptoDashboardAppHeader from './CryptoDashboardAppHeader';
import CryptoDashboardAppSidebar from './CryptoDashboardAppSidebar';
import CryptoDashboardAppContent from './CryptoDashboardAppContent';
import { useGetCryptoDashboardWidgetsQuery } from './CryptoDashboardApi';

const Root = styled(OlorinPageSimple)(({ theme }) => ({
	'& .OlorinPageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider,
	},
	'& .OlorinPageSimple-toolbar': {},
	'& .OlorinPageSimple-content': {},
	'& .OlorinPageSimple-sidebarHeader': {},
	'& .OlorinPageSimple-sidebarContent': {
		backgroundColor: theme.palette.background.default,
	},
}));

/**
 * The CryptoDashboardApp page.
 */
function CryptoDashboardApp() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

	const { data: widgets, isLoading } = useGetCryptoDashboardWidgetsQuery();

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	if (!widgets) {
		return null;
	}

	if (isLoading) {
		return <OlorinLoading />;
	}

	return (
		<Root
			header={<CryptoDashboardAppHeader onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)} />}
			leftSidebarContent={<CryptoDashboardAppSidebar />}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => setLeftSidebarOpen(false)}
			leftSidebarWidth={320}
			content={<CryptoDashboardAppContent />}
		/>
	);
}

export default CryptoDashboardApp;
