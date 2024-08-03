import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';

type DemoHeaderProps = {
	leftSidebarToggle?: () => void;
	rightSidebarToggle?: () => void;
};

/**
 * The DemoHeader component.
 */
function DemoHeader(props: DemoHeaderProps) {
	const { leftSidebarToggle, rightSidebarToggle } = props;

	function handleClick() {}

	return (
		<div className="flex flex-col p-24 w-full sm:py-32 sm:px-40">
			<div>
				<Breadcrumbs
					separator={<OlorinSvgIcon size={20}>heroicons-solid:chevron-right</OlorinSvgIcon>}
					aria-label="breadcrumb"
				>
					<Link
						className="font-medium hover:underline"
						key="1"
						color="inherit"
						to="/"
						onClick={handleClick}
					>
						Projects
					</Link>
					<Link
						className="font-medium hover:underline"
						key="2"
						color="inherit"
						to="/getting-started/installation/"
						onClick={handleClick}
					>
						Weekend Project
					</Link>
					<Typography
						className="font-medium"
						key="3"
						color="text.primary"
					>
						Overview
					</Typography>
				</Breadcrumbs>

				<div className="flex sm:hidden" />
			</div>
			<div className="flex items-center w-full mt-8 -mx-10">
				{leftSidebarToggle && (
					<div className="flex shrink-0 items-center">
						<IconButton
							onClick={leftSidebarToggle}
							aria-label="toggle sidebar"
						>
							<OlorinSvgIcon>heroicons-outline:menu</OlorinSvgIcon>
						</IconButton>
					</div>
				)}
				<Typography
					component="h2"
					className="flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate mx-10"
				>
					Page heading
				</Typography>
				{rightSidebarToggle && (
					<div className="flex shrink-0 items-center">
						<IconButton
							onClick={rightSidebarToggle}
							aria-label="toggle sidebar"
						>
							<OlorinSvgIcon>heroicons-outline:menu</OlorinSvgIcon>
						</IconButton>
					</div>
				)}
			</div>
		</div>
	);
}

export default DemoHeader;
