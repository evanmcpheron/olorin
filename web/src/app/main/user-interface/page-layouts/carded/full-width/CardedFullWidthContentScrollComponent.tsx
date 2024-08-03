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
 * The CardedFullWidthContentScroll page.
 */
function CardedFullWidthContentScrollComponent() {
	return (
		<Root
			header={<DemoHeader />}
			content={<DemoContent />}
			scroll="content"
		/>
	);
}

export default CardedFullWidthContentScrollComponent;
