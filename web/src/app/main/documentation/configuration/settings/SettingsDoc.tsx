import OlorinHighlight from '@olorin/core/OlorinHighlight';
import Typography from '@mui/material/Typography';
import settingsConfigRaw from 'app/configs/settingsConfig.ts?raw';

/**
 * Theme Layouts Doc
 * This document provides information on how to use theme layouts.
 */
function SettingsDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Default Settings
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				To set the default layout and theme settings for your app, navigate to the file:
				<code>app/configs/settingsConfig.ts</code>
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-jsx"
			>
				{settingsConfigRaw}
			</OlorinHighlight>
		</>
	);
}

export default SettingsDoc;
