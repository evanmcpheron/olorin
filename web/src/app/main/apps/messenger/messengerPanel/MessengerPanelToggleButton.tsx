import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { toggleChatPanel } from './messengerPanelSlice';

type ChatPanelToggleButtonProps = {
	children?: React.ReactNode;
};

/**
 * The chat panel toggle button.
 */
function MessengerPanelToggleButton(props: ChatPanelToggleButtonProps) {
	const { children = <OlorinSvgIcon>heroicons-outline:chat</OlorinSvgIcon> } = props;
	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="w-40 h-40"
			onClick={() => dispatch(toggleChatPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

export default MessengerPanelToggleButton;
