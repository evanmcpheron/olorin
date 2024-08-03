import { styled } from '@mui/material/styles';
import OlorinPageSimple from '@olorin/core/OlorinPageSimple';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';
import DemoSidebar from '../../shared-components/DemoSidebar';

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
	'& .OlorinPageSimple-sidebarContent': {},
}));

/**
 * The SimpleWithSidebarsContentScroll page.
 */
function SimpleWithSidebarsContentScrollComponent() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

	return (
		<Root
			header={
				<DemoHeader
					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
				/>
			}
			content={<DemoContent />}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarContent={<DemoSidebar />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => {
				setRightSidebarOpen(false);
			}}
			rightSidebarContent={<DemoSidebar />}
			scroll="content"
		/>
	);
}

export default SimpleWithSidebarsContentScrollComponent;
