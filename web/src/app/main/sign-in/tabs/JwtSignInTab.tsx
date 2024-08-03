import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import JwtSignInForm from '../../../auth/services/jwt/components/JwtSignInForm';

function jwtSignInTab() {
	return (
		<div className="w-full">
			<JwtSignInForm />

			<div className="mt-32 flex items-center">
				<div className="mt-px flex-auto border-t" />
				<Typography
					className="mx-8"
					color="text.secondary"
				>
					Or continue with
				</Typography>
				<div className="mt-px flex-auto border-t" />
			</div>

			<div className="mt-32 flex items-center space-x-16">
				<Button
					variant="outlined"
					className="flex-auto"
				>
					<OlorinSvgIcon
						size={20}
						color="action"
					>
						feather:facebook
					</OlorinSvgIcon>
				</Button>
				<Button
					variant="outlined"
					className="flex-auto"
				>
					<OlorinSvgIcon
						size={20}
						color="action"
					>
						feather:twitter
					</OlorinSvgIcon>
				</Button>
				<Button
					variant="outlined"
					className="flex-auto"
				>
					<OlorinSvgIcon
						size={20}
						color="action"
					>
						feather:github
					</OlorinSvgIcon>
				</Button>
			</div>
		</div>
	);
}

export default jwtSignInTab;
