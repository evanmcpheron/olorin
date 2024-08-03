import OlorinHighlight from '@olorin/core/OlorinHighlight';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const demos = [
	{
		id: 'full-width',
		title: 'Full Width Overview',
		type: 'item',
		url: '/ui/page-layouts/carded/full-width/overview',
	},
	{
		id: 'with-sidebars',
		title: 'With Sidebars Overview',
		type: 'item',
		url: '/ui/page-layouts/carded/with-sidebars/overview',
	},
];

/**
 * OlorinPageCarded Doc
 * This document provides information on how to use the OlorinPageCarded.
 */
function OlorinPageCardedDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				OlorinPageCarded
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				<code>OlorinPageCarded</code>
{' '}
is the carded page layout component of the Olorin React.
			</Typography>
			<Typography
				className="mb-24"
				component="p"
			>
				The component has layout areas to easily enter the contents of the app.
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-jsx"
			>
				{`
           <OlorinPageCarded
                header={
                    Header
                }
                content={
                    Content
                }
                leftSidebarContent={
                    Left Sidebar Content
                }
                rightSidebarContent={
                    Right Sidebar Content
                }
                scroll="page"
            />
        `}
			</OlorinHighlight>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Demos
			</Typography>

			<ul>
				{demos.map((demo) => (
					<li
						key={demo.url}
						className="mb-8"
					>
						<Link to={demo.url}>{demo.title}</Link>
					</li>
				))}
			</ul>
		</>
	);
}

export default OlorinPageCardedDoc;
