import Button from '@mui/material/Button';
import clsx from 'clsx';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';

type PurchaseButtonProps = {
	className?: string;
};

/**
 * The purchase button.
 */
function PurchaseButton(props: PurchaseButtonProps) {
	const { className = '' } = props;

	return (
		<Button
			component="a"
			href="https://1.envato.market/zDGL6"
			target="_blank"
			rel="noreferrer noopener"
			role="button"
			className={clsx('', className)}
			variant="contained"
			color="secondary"
			startIcon={<OlorinSvgIcon size={16}>heroicons-outline:shopping-cart</OlorinSvgIcon>}
		>
			Purchase OLORIN React
		</Button>
	);
}

export default PurchaseButton;
