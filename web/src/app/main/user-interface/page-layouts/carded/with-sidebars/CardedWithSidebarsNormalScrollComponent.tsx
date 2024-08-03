import { styled } from '@mui/material/styles';
import OlorinPageCarded from '@olorin/core/OlorinPageCarded';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';
import DemoSidebar from '../../shared-components/DemoSidebar';

const Root = styled(OlorinPageCarded)(() => ({
	'& .OlorinPageCarded-header': {},
	'& .OlorinPageCarded-toolbar': {},
	'& .OlorinPageCarded-content': {},
	'& .OlorinPageCarded-sidebarHeader': {},
	'& .OlorinPageCarded-sidebarContent': {},
}));

/**
 * The CardedWithSidebarsNormalScroll page.
 */
function CardedWithSidebarsNormalScrollComponent() {
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
			scroll="normal"
		/>
	);
}

export default CardedWithSidebarsNormalScrollComponent;
