import OlorinHighlight from '@olorin/core/OlorinHighlight';
import Typography from '@mui/material/Typography';

/**
 * OlorinHighlight Doc
 * This document provides information on how to use the OlorinHighlight.
 */
function OlorinHighlightDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				OlorinHighlight
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				<code>OlorinHighlight</code>
{' '}
is a custom-built Olorin component allows us to show syntax highlighted
				codes with
				<a
					href="http://prismjs.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="ml-8"
				>
					PrismJS
				</a>
				.
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
                                 <OlorinHighlight component="pre" className="language-html">
                                   <div className="title">
                                        <span>Example Title</span>
                                    </div>
                                 </OlorinHighlight>
                                `}
			</OlorinHighlight>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Preview
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-html"
			>
				{`
                            <div className="title">
                                <span>Example Title</span>
                            </div>
                            `}
			</OlorinHighlight>
		</>
	);
}

export default OlorinHighlightDoc;
