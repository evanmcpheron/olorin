import { useState } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import Dialog from '@mui/material/Dialog';
import { selectOlorinCurrentSettings } from '@olorin/core/OlorinSettings/olorinSettingsSlice';
import OlorinHighlight from '@olorin/core/OlorinHighlight';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import qs from 'qs';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'app/store/hooks';

type OlorinSettingsViewerDialogProps = {
	className?: string;
};

/**
 * The settings viewer dialog.
 */
function OlorinSettingsViewerDialog(props: OlorinSettingsViewerDialogProps) {
	const { className = '' } = props;

	const [openDialog, setOpenDialog] = useState(false);
	const settings = useAppSelector(selectOlorinCurrentSettings);

	const jsonStringifiedSettings = JSON.stringify(settings);
	const queryString = qs.stringify({
		defaultSettings: jsonStringifiedSettings,
		strictNullHandling: true,
	});

	function handleOpenDialog() {
		setOpenDialog(true);
	}

	function handleCloseDialog() {
		setOpenDialog(false);
	}

	return (
		<div className={clsx('', className)}>
			<Button
				variant="contained"
				color="secondary"
				className="w-full"
				onClick={handleOpenDialog}
				startIcon={<OlorinSvgIcon>heroicons-solid:code</OlorinSvgIcon>}
			>
				View settings as json/query params
			</Button>

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle>Olorin Settings Viewer</DialogTitle>
				<DialogContent>
					<Typography className="mb-16 mt-24 text-16 font-bold">JSON</Typography>

					<OlorinHighlight
						component="pre"
						className="language-json"
					>
						{JSON.stringify(settings, null, 2)}
					</OlorinHighlight>

					<Typography className="mb-16 mt-24 text-16 font-bold">Query Params</Typography>

					{queryString}
				</DialogContent>
				<DialogActions>
					<Button
						color="secondary"
						variant="contained"
						onClick={handleCloseDialog}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default OlorinSettingsViewerDialog;
