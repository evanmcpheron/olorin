import OlorinExample from '@olorin/core/OlorinExample';
import OlorinHighlight from '@olorin/core/OlorinHighlight';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DocumentationPageBreadcrumb from '../../DocumentationPageBreadcrumb';
import BasicTabsComponent from '../components/tabs/BasicTabs';
import BasicTabsRaw from '../components/tabs/BasicTabs.tsx?raw';

function TabsDoc(props) {
	return (
		<>
			<div className="flex flex-1 sm:flex-row flex-col items-start justify-center grow-0 md:items-center md:justify-end md:space-between">
				<DocumentationPageBreadcrumb />
				<Button
					className="normal-case"
					variant="contained"
					color="secondary"
					component="a"
					href="https://mui.com/components/tabs"
					target="_blank"
					role="button"
					size="small"
					startIcon={<OlorinSvgIcon size={20}>heroicons-outline:external-link</OlorinSvgIcon>}
				>
					Reference
				</Button>
			</div>
			<Typography
				className="text-32 my-16 font-700"
				component="h1"
			>
				Tabs
			</Typography>
			<Typography className="description">
				Tabs make it easy to explore and switch between different views.
			</Typography>

			<Typography
				className="text-14 mb-32"
				component="div"
			>
				Tabs organize and allow navigation between groups of content that are related and at the same level of
				hierarchy.
			</Typography>
			<Typography
				className="text-24 mt-24 mb-10 font-700"
				component="h2"
			>
				Introduction
			</Typography>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				Tabs are implemented using a collection of related components:
			</Typography>
			<ul className="space-y-16">
				<li>
					<code>{`<Tab />`}</code> - the tab element itself. Clicking on a tab displays its corresponding
					panel.
				</li>
				<li>
					<code>{`<Tabs />`}</code> - the container that houses the tabs. Responsible for handling focus and
					keyboard navigation between tabs.
				</li>
			</ul>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				<OlorinExample
					name="BasicTabs.js"
					className="my-16"
					iframe={false}
					component={BasicTabsComponent}
					raw={BasicTabsRaw}
				/>
			</Typography>
			<Typography
				className="text-24 mt-24 mb-10 font-700"
				component="h2"
			>
				Basics
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-jsx"
			>
				{` 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
`}
			</OlorinHighlight>
		</>
	);
}

export default TabsDoc;
