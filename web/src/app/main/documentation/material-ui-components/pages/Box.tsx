import OlorinExample from '@olorin/core/OlorinExample';
import OlorinHighlight from '@olorin/core/OlorinHighlight';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DocumentationPageBreadcrumb from '../../DocumentationPageBreadcrumb';
import BoxBasicComponent from '../components/box/BoxBasic';
import BoxBasicRaw from '../components/box/BoxBasic.tsx?raw';
import BoxSystemPropsComponent from '../components/box/BoxSystemProps';
import BoxSystemPropsRaw from '../components/box/BoxSystemProps.tsx?raw';
import BoxSxComponent from '../components/box/BoxSx';
import BoxSxRaw from '../components/box/BoxSx.tsx?raw';

function BoxDoc(props) {
	return (
		<>
			<div className="flex flex-1 sm:flex-row flex-col items-start justify-center grow-0 md:items-center md:justify-end md:space-between">
				<DocumentationPageBreadcrumb />
				<Button
					className="normal-case"
					variant="contained"
					color="secondary"
					component="a"
					href="https://mui.com/components/box"
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
				Box
			</Typography>
			<Typography className="description">
				The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.
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
				The Box component is a generic container for grouping other components. It&#39;s a fundamental building
				block when working with Material UI—you can think of it as a <code>{`<div>`}</code> with extra built-in
				features, like access to your app&#39;s theme and the{' '}
				<a href="/system/getting-started/the-sx-prop/">
					<code>sx</code> prop
				</a>
				.
			</Typography>
			<Typography
				className="text-16 mt-20 mb-10 font-700"
				component="h3"
			>
				Usage
			</Typography>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				The Box component differs from other containers available in Material UI in that its usage is intended
				to be multipurpose and open-ended, just like a <code>{`<div>`}</code>. Components like{' '}
				<a href="/material-ui/react-container/">Container</a>, <a href="/material-ui/react-stack/">Stack</a> and{' '}
				<a href="/material-ui/react-paper/">Paper</a>, by contrast, feature usage-specific props that make them
				ideal for certain use cases: Container for main layout orientation, Stack for one-dimensional layouts,
				and Paper for elevated surfaces.
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
import Box from '@mui/material/Box';
`}
			</OlorinHighlight>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				The Box component renders as a <code>{`<div>`}</code> by default, but you can swap in any other valid
				HTML tag or React component using the <code>component</code> prop. The demo below replaces the{' '}
				<code>{`<div>`}</code> with a <code>{`<section>`}</code> element:
			</Typography>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				<OlorinExample
					name="BoxBasic.js"
					className="my-16"
					iframe={false}
					component={BoxBasicComponent}
					raw={BoxBasicRaw}
				/>
			</Typography>
			<Typography
				className="text-24 mt-24 mb-10 font-700"
				component="h2"
			>
				Customization
			</Typography>
			<Typography
				className="text-16 mt-20 mb-10 font-700"
				component="h3"
			>
				With MUI System props
			</Typography>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				As a CSS utility component, the Box supports all <a href="/system/properties/">MUI System properties</a>
				. You can use them as props directly on the component.
			</Typography>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				<OlorinExample
					name="BoxSystemProps.js"
					className="my-16"
					iframe={false}
					component={BoxSystemPropsComponent}
					raw={BoxSystemPropsRaw}
				/>
			</Typography>
			<Typography
				className="text-16 mt-20 mb-10 font-700"
				component="h3"
			>
				With the sx prop
			</Typography>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				Use the{' '}
				<a href="/system/getting-started/the-sx-prop/">
					<code>sx</code> prop
				</a>{' '}
				to quickly customize any Box instance using a superset of CSS that has access to all the style functions
				and theme-aware properties exposed in the MUI System package. The demo below shows how to apply colors
				from the theme using this prop:
			</Typography>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				<OlorinExample
					name="BoxSx.js"
					className="my-16"
					iframe={false}
					component={BoxSxComponent}
					raw={BoxSxRaw}
				/>
			</Typography>
			<Typography
				className="text-24 mt-24 mb-10 font-700"
				component="h2"
			>
				Anatomy
			</Typography>
			<Typography
				className="text-14 mb-32"
				component="div"
			>
				The Box component is composed of a single root <code>{`<div>`}</code> element:
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-html"
			>
				{` 
<div className="MuiBox-root">
  <!-- contents of the Box -->
</div>
`}
			</OlorinHighlight>
		</>
	);
}

export default BoxDoc;
