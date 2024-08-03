import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';

type NotificationIconProps = {
	value?: string;
};

/**
 * The notification icon.
 */
function NotificationIcon(props: NotificationIconProps) {
	const { value } = props;

	switch (value) {
		case 'error': {
			return (
				<OlorinSvgIcon
					className="mr-8 opacity-75"
					color="inherit"
				>
					heroicons-outline:minus-circle
				</OlorinSvgIcon>
			);
		}
		case 'success': {
			return (
				<OlorinSvgIcon
					className="mr-8 opacity-75"
					color="inherit"
				>
					heroicons-outline:check-circle
				</OlorinSvgIcon>
			);
		}
		case 'warning': {
			return (
				<OlorinSvgIcon
					className="mr-8 opacity-75"
					color="inherit"
				>
					heroicons-outline:exclamation-circle
				</OlorinSvgIcon>
			);
		}
		case 'info': {
			return (
				<OlorinSvgIcon
					className="mr-8 opacity-75"
					color="inherit"
				>
					heroicons-outline:information-circle
				</OlorinSvgIcon>
			);
		}
		default: {
			return null;
		}
	}
}

export default NotificationIcon;
