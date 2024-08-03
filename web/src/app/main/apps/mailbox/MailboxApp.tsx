import { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import OlorinPageSimple from '@olorin/core/OlorinPageSimple';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import MailboxAppSidebarContent from './MailboxAppSidebarContent';
import Mails from './mails/Mails';

const Root = styled(OlorinPageSimple)(({ theme }) => ({
	'& .OlorinPageSimple-rightSidebar': {
		flex: '1',
		[theme.breakpoints.down('lg')]: {
			minWidth: '100%',
		},
	},
	'& .OlorinPageSimple-contentWrapper': {
		[theme.breakpoints.up('lg')]: {
			maxWidth: 400,
		},
	},
}));

/**
 * The mailbox app.
 */
function MailboxApp() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	const routeParams = useParams();
	const { mailId } = routeParams;
	const location = useLocation();

	useEffect(() => {
		if (isMobile) {
			setRightSidebarOpen(Boolean(mailId));
		} else {
			setRightSidebarOpen(true);
		}
	}, [mailId, isMobile]);

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
			content={<Mails onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)} />}
			leftSidebarContent={<MailboxAppSidebarContent />}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => setLeftSidebarOpen(false)}
			leftSidebarWidth={288}
			scroll={isMobile ? 'normal' : 'content'}
			rightSidebarContent={<Outlet />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
		/>
	);
}

export default MailboxApp;
