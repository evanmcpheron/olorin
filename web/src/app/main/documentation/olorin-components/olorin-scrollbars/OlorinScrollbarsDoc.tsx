import OlorinHighlight from '@olorin/core/OlorinHighlight';
import Typography from '@mui/material/Typography';

/**
 * OlorinScrollbars Doc
 * This document provides information on how to use the OlorinScrollbars.
 */
function OlorinScrollbarsDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				OlorinScrollbars
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				<code>OlorinScrollbars</code>
{' '}
is a simple
{' '}
				<a
					href="http://utatti.github.io/perfect-scrollbar/"
					target="_blank"
					rel="noreferrer noopener"
				>
					perfect-scrollbar
				</a>
{' '}
				component for react.
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				It can be disabled globally by Olorin Settings (
<code>app/configs/settingsConfig.tsx</code>
).
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-jsx"
			>
				{`
                                <OlorinScrollbars className={classes.content}>
                                    Content
                                </OlorinScrollbars>
                                `}
			</OlorinHighlight>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Props
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-jsx"
			>
				{`
                               {
                                    className               : '',
                                    enable                  : true,
                                    scrollToTopOnChildChange: false,
                                    scrollToTopOnRouteChange: false,
                                    option                  : {
                                        wheelPropagation: true
                                    },
                                    ref                     : undefined,
                                    onScrollY               : undefined,
                                    onScrollX               : undefined,
                                    onScrollUp              : undefined,
                                    onScrollDown            : undefined,
                                    onScrollLeft            : undefined,
                                    onScrollRight           : undefined,
                                    onYReachStart           : undefined,
                                    onYReachEnd             : undefined,
                                    onXReachStart           : undefined,
                                    onXReachEnd             : undefined
                                };
                                `}
			</OlorinHighlight>
		</>
	);
}

export default OlorinScrollbarsDoc;
