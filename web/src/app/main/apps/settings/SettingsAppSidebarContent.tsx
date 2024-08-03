import OlorinNavigation from '@olorin/core/OlorinNavigation/OlorinNavigation';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import clsx from 'clsx';
import SettingsAppNavigation from './SettingsAppNavigation';

const Root = styled('div')(({ theme }) => ({
	'&  .navigation': {
		padding: 0,
		borderTop: `1px solid ${theme.palette.divider}`,
	},
	'&  .olorin-list-item': {
		padding: '20px 32px',
		margin: 0,
		borderRadius: 0,
		alignItems: 'start',
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&.active': {
			backgroundColor: `${alpha(theme.palette.secondary.main, 0.1)}!important`,
			'&  .olorin-list-item-icon': {
				color: `${theme.palette.secondary.main}!important`,
			},
			'&  .olorin-list-item-text-primary': {
				color: `${theme.palette.secondary.main}!important`,
			},
		},
	},
	'&  .olorin-list-item-text-primary': {
		fontSize: 14,
		fontWeight: '500',
	},
	'&  .olorin-list-item-text-secondary': {
		fontSize: 14,
		whiteSpace: 'normal',
		fontWeight: '400',
	},
}));

type SettingsAppSidebarContentProps = {
	className?: string;
	onSetSidebarOpen: (open: boolean) => void;
};

function SettingsAppSidebarContent(props: SettingsAppSidebarContentProps) {
	const { className, onSetSidebarOpen } = props;

	return (
		<Root>
			<div className={clsx('m-32 mr-24 flex items-center justify-between sm:my-40', className)}>
				<Typography className="text-4xl font-extrabold leading-none tracking-tight"> Settings</Typography>
				<Hidden lgUp>
					<IconButton
						onClick={() => onSetSidebarOpen(false)}
						aria-label="close left sidebar"
						size="small"
					>
						<OlorinSvgIcon>heroicons-outline:x</OlorinSvgIcon>
					</IconButton>
				</Hidden>
			</div>
			<OlorinNavigation navigation={SettingsAppNavigation.children} />
		</Root>
	);
}

export default SettingsAppSidebarContent;
