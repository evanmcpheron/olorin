import Dialog from '@mui/material/Dialog';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { closeDialog, selectOlorinDialogProps } from '@olorin/core/OlorinDialog/olorinDialogSlice';

/**
 * OlorinDialog component
 * This component renders a material UI ```Dialog``` component
 * with properties pulled from the redux store
 */
function OlorinDialog() {
	const dispatch = useAppDispatch();
	const options = useAppSelector(selectOlorinDialogProps);

	return (
		<Dialog
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="olorin-dialog-title"
			classes={{
				paper: 'rounded-8',
			}}
			{...options}
		/>
	);
}

export default OlorinDialog;
