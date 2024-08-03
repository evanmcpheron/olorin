import Dialog from '@mui/material/Dialog';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import NewLabelForm from './NewLabelForm';
import LabelItemForm from './LabelItemForm';
import { closeLabelsDialog, selectLabelsDialogOpen } from '../../notesAppSlice';
import { useGetNotesLabelsQuery } from '../../NotesApi';

/**
 * The labels dialog.
 */
function LabelsDialog() {
	const dispatch = useAppDispatch();
	const labelsDialogOpen = useAppSelector(selectLabelsDialogOpen);
	const { data: labels } = useGetNotesLabelsQuery();

	return (
		<Dialog
			classes={{
				paper: 'w-full max-w-320 p-24 md:p-40 m-24',
			}}
			onClose={() => dispatch(closeLabelsDialog())}
			open={Boolean(labelsDialogOpen)}
		>
			<Typography className="text-20 mb-24 font-semibold">Edit Labels</Typography>

			<List dense>
				<NewLabelForm />

				{labels?.map((item) => (
					<LabelItemForm
						label={item}
						key={item.id}
					/>
				))}
			</List>
		</Dialog>
	);
}

export default LabelsDialog;
