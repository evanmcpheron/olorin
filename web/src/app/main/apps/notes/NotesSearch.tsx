import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { OutlinedInput } from '@mui/material';
import { motion } from 'framer-motion';
import InputAdornment from '@mui/material/InputAdornment';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { setSearchText, selectSearchText } from './notesAppSlice';

/**
 * The notes search.
 */
function NotesSearch() {
	const dispatch = useAppDispatch();
	const searchText = useAppSelector(selectSearchText);

	return (
		<motion.div
			className="flex flex-auto sm:flex-grow-0"
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
		>
			<OutlinedInput
				className="flex flex-1 items-center px-16 rounded-full h-40 w-full sm:max-w-256"
				placeholder="Search note"
				fullWidth
				startAdornment={
					<InputAdornment position="start">
						<OlorinSvgIcon color="disabled">heroicons-solid:search</OlorinSvgIcon>
					</InputAdornment>
				}
				inputProps={{
					'aria-label': 'Search',
				}}
				value={searchText}
				onChange={(ev) => dispatch(setSearchText(ev))}
			/>
		</motion.div>
	);
}

export default NotesSearch;
