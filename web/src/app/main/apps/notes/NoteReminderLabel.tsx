import Chip from '@mui/material/Chip';
import clsx from 'clsx';
import { format } from 'date-fns/format';
import { darken } from '@mui/material/styles';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';

type NoteLabelProps = {
	date: string;
	onDelete?: () => void;
	className?: string;
	classes?: {
		root?: string;
		label?: string;
		deleteIcon?: string;
	};
};

/**
 * The note label.
 */
function NoteLabel(props: NoteLabelProps) {
	const { date, onDelete, className, classes } = props;

	if (!date) {
		return null;
	}

	return (
		<Chip
			icon={<OlorinSvgIcon size={16}>heroicons-outline:clock</OlorinSvgIcon>}
			label={format(new Date(date), 'MMM dd yy, h:mm')}
			classes={{
				root: clsx('h-24 border-0', className),
				label: 'px-12 py-4 text-12 font-medium leading-none',
				deleteIcon: 'w-16',
				...classes,
			}}
			sx={{
				color: 'text.secondary',
				backgroundColor: (theme) => darken(theme.palette.background.default, 0.03),
			}}
			variant="outlined"
			onDelete={onDelete}
		/>
	);
}

export default NoteLabel;
