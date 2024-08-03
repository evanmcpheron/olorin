import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';

type DocumentationButtonProps = {
	className?: string;
};

/**
 * The documentation button.
 */
function DocumentationButton(props: DocumentationButtonProps) {
	const { className = '' } = props;

	return (
		<Button
			component={Link}
			to="/documentation"
			role="button"
			className={className}
			variant="contained"
			color="primary"
			startIcon={<OlorinSvgIcon size={16}>heroicons-outline:book-open</OlorinSvgIcon>}
		>
			Documentation
		</Button>
	);
}

export default DocumentationButton;
