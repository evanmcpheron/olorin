import { styled } from '@mui/material/styles';
import OlorinPageSimple from '@olorin/core/OlorinPageSimple';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';

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
 * The SimpleFullWidthNormalScroll page.
 */
function SimpleFullWidthNormalScrollComponent() {
	return (
		<Root
			header={<DemoHeader />}
			content={<DemoContent />}
			scroll="normal"
		/>
	);
}

export default SimpleFullWidthNormalScrollComponent;
