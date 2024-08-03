import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { toggleQuickPanel } from './quickPanelSlice';

type QuickPanelToggleButtonProps = {
	children?: React.ReactNode;
};

/**
 * The quick panel toggle button.
 */
function QuickPanelToggleButton(props: QuickPanelToggleButtonProps) {
	const { children = <OlorinSvgIcon>heroicons-outline:bookmark</OlorinSvgIcon> } = props;
	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleQuickPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

export default QuickPanelToggleButton;
