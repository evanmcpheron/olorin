import Button from '@mui/material/Button';
import NavLinkAdapter from '@olorin/core/NavLinkAdapter';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import BoardTitle from './BoardTitle';

type BoardHeaderProps = {
	onSetSidebarOpen: (open: boolean) => void;
};

/**
 * The board header component.
 */
function BoardHeader(props: BoardHeaderProps) {
	const { onSetSidebarOpen } = props;

	return (
		<div className="p-24 sm:p-32 w-full border-b-1 flex items-center sm:justify-between container">
			<div className="flex items-center">
				<BoardTitle />
			</div>

			<div className="flex flex-1 items-center justify-end space-x-0 sm:space-x-12">
				<Button
					className="whitespace-nowrap"
					component={NavLinkAdapter}
					to="/apps/scrumboard/boards/"
				>
					<OlorinSvgIcon size={20}>heroicons-outline:view-boards</OlorinSvgIcon>
					<span className="hidden sm:flex mx-8">Boards</span>
				</Button>

				<Button
					className="whitespace-nowrap"
					variant="contained"
					color="secondary"
					onClick={() => onSetSidebarOpen(true)}
				>
					<OlorinSvgIcon size={20}>heroicons-outline:cog</OlorinSvgIcon>
					<span className="hidden sm:flex mx-8">Settings</span>
				</Button>
			</div>
		</div>
	);
}

export default BoardHeader;
