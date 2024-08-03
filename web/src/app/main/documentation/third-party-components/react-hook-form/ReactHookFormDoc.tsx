import OlorinExample from '@olorin/core/OlorinExample';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import SimpleFormExampleRaw from './examples/SimpleFormExample.tsx?raw';
import SimpleFormExample from './examples/SimpleFormExample';

/**
 * React Hook Form Doc
 * This document provides information on how to use React Hook Form.
 */
function ReactHookFormDoc() {
	return (
		<>
			<div className="flex w-full items-center justify-between mb-24">
				<Typography variant="h4">React Hook Form</Typography>

				<Button
					variant="contained"
					color="secondary"
					component="a"
					href="http://react-hook-form.com"
					target="_blank"
					role="button"
					startIcon={<OlorinSvgIcon>heroicons-outline:external-link</OlorinSvgIcon>}
				>
					Reference
				</Button>
			</div>
			<Typography
				className="mb-16"
				component="p"
			>
				Performant, flexible and extensible forms with easy to use validation.
			</Typography>

			<hr />

			<Typography
				className="text-16 mt-32 mb-16"
				component="h4"
			>
				Example usage with Material-UI elements and form validation
			</Typography>

			<OlorinExample
				className="mb-64"
				component={SimpleFormExample}
				raw={SimpleFormExampleRaw}
			/>

			<Typography
				className="text-32 mt-32 mb-8"
				component="h2"
			>
				Examples
			</Typography>

			<ul>
				<li className="mb-8">src/app/main/sign-in/SignInPage.tsx</li>
				<li className="mb-8">src/app/main/sign-up/SignUpPage.tsx</li>
				<li className="mb-8">.</li>
				<li className="mb-8">.</li>
				<li className="mb-8">.</li>
			</ul>
		</>
	);
}

export default ReactHookFormDoc;
