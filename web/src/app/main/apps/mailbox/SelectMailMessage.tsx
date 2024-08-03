import Typography from '@mui/material/Typography';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';

/**
 * The select mail message.
 */
function SelectMailMessage() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center p-24">
			<OlorinSvgIcon
				className="icon-size-128 mb-16"
				color="disabled"
				size={24}
			>
				heroicons-outline:mail-open
			</OlorinSvgIcon>
			<Typography
				className="mt-16 text-2xl font-semibold tracking-tight"
				color="text.secondary"
			>
				Select a mail to read
			</Typography>
		</div>
	);
}

export default SelectMailMessage;
