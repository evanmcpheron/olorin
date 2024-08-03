import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import _ from '@lodash';
import Button from '@mui/material/Button';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import OlorinLoading from '@olorin/core/OlorinLoading';
import { darken } from '@mui/material/styles';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { useAppSelector } from 'app/store/hooks';
import { useGetProjectDashboardProjectsQuery } from './ProjectDashboardApi';

/**
 * The ProjectDashboardAppHeader page.
 */
function ProjectDashboardAppHeader() {
	const { data: projects, isLoading } = useGetProjectDashboardProjectsQuery();

	const user = useAppSelector(selectUser);

	const [selectedProject, setSelectedProject] = useState<{ id: number; menuEl: HTMLElement | null }>({
		id: 1,
		menuEl: null,
	});

	function handleChangeProject(id: number) {
		setSelectedProject({
			id,
			menuEl: null,
		});
	}

	function handleOpenProjectMenu(event: React.MouseEvent<HTMLElement>) {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: event.currentTarget,
		});
	}

	function handleCloseProjectMenu() {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: null,
		});
	}

	if (isLoading) {
		return <OlorinLoading />;
	}

	return (
		<div className="flex flex-col w-full px-24 sm:px-32">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
				<div className="flex flex-auto items-center min-w-0">
					<Avatar
						sx={{
							background: (theme) => darken(theme.palette.background.default, 0.05),
							color: (theme) => theme.palette.text.secondary,
						}}
						className="flex-0 w-64 h-64"
						alt="user photo"
						src={user?.data?.photoURL}
					>
						{user?.data?.displayName?.[0]}
					</Avatar>
					<div className="flex flex-col min-w-0 mx-16">
						<Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
							{`Welcome back, ${user.data.displayName}!`}
						</Typography>

						<div className="flex items-center">
							<OlorinSvgIcon
								size={20}
								color="action"
							>
								heroicons-solid:bell
							</OlorinSvgIcon>
							<Typography
								className="mx-6 leading-6 truncate"
								color="text.secondary"
							>
								You have 2 new messages and 15 new tasks
							</Typography>
						</div>
					</div>
				</div>
				<div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="primary"
						startIcon={<OlorinSvgIcon size={20}>heroicons-solid:mail</OlorinSvgIcon>}
					>
						Messages
					</Button>
					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="secondary"
						startIcon={<OlorinSvgIcon size={20}>heroicons-solid:cog</OlorinSvgIcon>}
					>
						Settings
					</Button>
				</div>
			</div>
			<div className="flex items-center">
				<Button
					onClick={handleOpenProjectMenu}
					className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
					sx={{
						backgroundColor: (theme) => theme.palette.background.default,
						borderColor: (theme) => theme.palette.divider,
					}}
					endIcon={
						<OlorinSvgIcon
							size={20}
							color="action"
						>
							heroicons-solid:chevron-down
						</OlorinSvgIcon>
					}
				>
					{_.find(projects, ['id', selectedProject.id])?.name}
				</Button>
				<Menu
					id="project-menu"
					anchorEl={selectedProject.menuEl}
					open={Boolean(selectedProject.menuEl)}
					onClose={handleCloseProjectMenu}
				>
					{projects &&
						projects.map((project) => (
							<MenuItem
								key={project.id}
								onClick={() => {
									handleChangeProject(project.id);
								}}
							>
								{project.name}
							</MenuItem>
						))}
				</Menu>
			</div>
		</div>
	);
}

export default ProjectDashboardAppHeader;
