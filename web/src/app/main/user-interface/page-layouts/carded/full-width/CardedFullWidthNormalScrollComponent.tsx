import { styled } from '@mui/material/styles';
import OlorinPageCarded from '@olorin/core/OlorinPageCarded';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';

const Root = styled(OlorinPageCarded)({
	'& .OlorinPageCarded-header': {},
	'& .OlorinPageCarded-toolbar': {},
	'& .OlorinPageCarded-content': {},
	'& .OlorinPageCarded-sidebarHeader': {},
	'& .OlorinPageCarded-sidebarContent': {},
});

/**
 * The CardedFullWidthNormalScroll page
 */
function CardedFullWidthNormalScrollComponent() {
	return (
		<Root
			header={<DemoHeader />}
			content={<DemoContent />}
			scroll="normal"
		/>
	);
}

export default CardedFullWidthNormalScrollComponent;
