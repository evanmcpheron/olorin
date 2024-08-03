import OlorinHighlight from '@olorin/core/OlorinHighlight';
import Typography from '@mui/material/Typography';
import OlorinPageCarded from '@olorin/core/OlorinPageCarded';

/**
 * GuestRoleExample component renders the page for guest users.
 */
function GuestRoleExample() {
	return (
		<OlorinPageCarded
			header={
				<div className="p-24 flex items-center">
					<Typography className="text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate">
						Guest: Auth role example page
					</Typography>
				</div>
			}
			content={
				<div className="p-24">
					<Typography className="mb-24">
						You can see this page because you have not logged in. Otherwise you should be redirected to root
						page.
					</Typography>

					<Typography className="mb-24">This is the page's config file:</Typography>

					<OlorinHighlight
						component="pre"
						className="language-js"
					>
						{`
					import {authRoles} from 'auth';
					import GuestRoleExample from './StaffRoleExample';

					export const GuestRoleExampleConfig = {
						settings: {
							layout: {
								config: {}
							}
						},
						auth    : authRoles.onlyGuest,//['guest']
						routes  : [
							{
								path     : '/auth/guest-role-example',
								element: <GuestRoleExample/>
							}
						]
					};
					`}
					</OlorinHighlight>

					<Typography className="my-24">
						You can also hide the navigation item/collapse/group with user roles by giving auth property.
					</Typography>

					<OlorinHighlight
						component="pre"
						className="language-json"
					>
						{`
						export const olorinNavigationConfig = [
						{
								'id'   : 'only-staff-navigation-item',
								'title': 'Nav item only for Guest',
								'type' : 'item',
								'auth' : authRoles.onlyGuest,//['guest']
								'url'  : '/auth/guest-role-example',
								'icon' : 'verified_user'
							}
						];
					`}
					</OlorinHighlight>
				</div>
			}
		/>
	);
}

export default GuestRoleExample;
