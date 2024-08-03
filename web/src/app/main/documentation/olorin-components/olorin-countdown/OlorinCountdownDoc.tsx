import OlorinCountdown from '@olorin/core/OlorinCountdown';
import OlorinHighlight from '@olorin/core/OlorinHighlight';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

/**
 * OlorinCountdown Doc
 * This document provides information on how to use the OlorinCountdown.
 */
function OlorinCountdownDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				OlorinCountdown
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				<code>OlorinCountdown</code>
{' '}
is a custom-built Olorin component that allows you to create countdowns.
			</Typography>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Usage
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-jsx"
			>
				{`
          <OlorinCountdown endDate="2071-10-29" className="my-48"/>
        `}
			</OlorinHighlight>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Preview
			</Typography>

			<OlorinCountdown
				endDate="2071-10-29"
				className="my-48"
			/>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Demos
			</Typography>

			<ul>
				<li className="mb-8">
					<Link to="/pages/coming-soon/classic">Coming Soon</Link>
				</li>
			</ul>
		</>
	);
}

export default OlorinCountdownDoc;
