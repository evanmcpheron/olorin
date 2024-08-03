import OlorinPageSimple from '@olorin/core/OlorinPageSimple';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import { useGetContactsListQuery, useGetContactsCountriesQuery, useGetContactsTagsQuery } from './ContactsApi';
import ContactsSidebarContent from './ContactsSidebarContent';

const Root = styled(OlorinPageSimple)(({ theme }) => ({
	'& .OlorinPageSimple-header': {
		backgroundColor: theme.palette.background.paper,
	},
}));

/**
 * The ContactsApp page.
 */
function ContactsApp() {
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	useGetContactsListQuery();
	useGetContactsCountriesQuery();
	useGetContactsTagsQuery();

	useEffect(() => {
		setRightSidebarOpen(Boolean(routeParams.id));
	}, [routeParams]);

	return (
		<Root
			header={<ContactsHeader />}
			content={<ContactsList />}
			ref={pageLayout}
			rightSidebarContent={<ContactsSidebarContent />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
			rightSidebarWidth={640}
			rightSidebarVariant="temporary"
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ContactsApp;
