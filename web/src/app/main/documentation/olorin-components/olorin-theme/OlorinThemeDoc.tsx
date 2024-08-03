import OlorinHighlight from '@olorin/core/OlorinHighlight';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AppRaw from 'src/app/App.tsx?raw';

/**
 * Theme Layouts Doc
 * This document provides information on how to use theme layouts.
 */
function OlorinThemeDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				OlorinTheme
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				<code>OlorinTheme</code>
{' '}
is the theming component of the Olorin React. It allows us to change predefined
				Material UI themes. It should wrap the
<code>OlorinLayout</code>
{' '}
component.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				<code>src/app/App.tsx</code>
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-jsx"
			>
				{AppRaw}
			</OlorinHighlight>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Configuration
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				Please checkout
				<Link
					className="font-normal mx-4"
					to="/documentation/theming/theme-schemes"
				>
					theming
				</Link>
				at documentation.
			</Typography>
		</>
	);
}

export default OlorinThemeDoc;
