import Typography from '@mui/material/Typography';
import OlorinHighlight from '@olorin/core/OlorinHighlight/OlorinHighlight';

/**
 * The jwt auth doc.
 * This document provides information on how to use the JWT authentication service.
 */
function AuthenticationDoc() {
	return (
		<>
			<Typography
				variant="h4"
				className="mb-40 font-700"
			>
				Authentication System
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				Olorin React's authentication system is designed to be both flexible and robust, accommodating multiple
				authentication services to ensure a seamless and secure user experience. Currently, we are giving three
				example authentication services:
			</Typography>
			<ol className="list-disc pl-16 mb-16 space-y-12">
				<li>
					<Typography>Firebase Authentication</Typography>
				</li>
				<li>
					<Typography>JWT (JSON Web Tokens) Authentication</Typography>
				</li>
				<li>
					<Typography>AWS Amplify Authentication</Typography>
				</li>
			</ol>
			<Typography
				className="mb-16"
				component="p"
			>
				This multi-service approach allows us to cater to a wide range of authentication requirements and
				preferences, providing developers with the flexibility to choose the service that best fits their
				project's needs.
			</Typography>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Entry Point: AuthenticationProvider
			</Typography>

			<Typography
				className="mb-16"
				component="p"
			>
				The AuthenticationProvider component serves as the entry point for the authentication system. It is
				typically located in the App.js file and wraps the main application components, ensuring that
				authentication context is available throughout the application
			</Typography>

			<Typography
				className="text-15 mb-8 font-500"
				variant="h6"
			>
				Integration in App.js
			</Typography>

			<OlorinHighlight
				component="pre"
				className="language-jsx mb-24"
			>
				{`
				return (
					<OlorinTheme>
						<AuthenticationProvider>
							<OlorinLayout/>
						</AuthenticationProvider>
					</OlorinTheme>
				);
				`}
			</OlorinHighlight>
			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Authentication Services Directory
			</Typography>

			<Typography className="mb-16">
				All authentication services are located under
{' '}
<code>app/auth/services</code>
. This directory contains
				the implementation of each authentication service, including their context providers, hooks, and
				component integrations.
			</Typography>
			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Service Configurations
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				Each authentication service comes with its own set of configurations, which are essential for
				initializing and utilizing the service effectively within the application. You can find these
				configurations in the respective service folders:
			</Typography>
			<ol className="list-disc pl-16 mb-16 space-y-12">
				<li>
					<Typography>
						Firebase Authentication Configuration:
{' '}
<br />
					</Typography>
					<Typography>
						<code>src/app/auth/services/firebase/firebaseAuthConfig.ts</code>
					</Typography>
				</li>
				<li>
					<Typography>
						JWT Authentication Configuration:
{' '}
<br />
					</Typography>
					<Typography>
						<code>src/app/auth/services/jwt/jwtAuthConfig.ts</code>
					</Typography>
				</li>
				<li>
					<Typography>
						AWS Amplify Authentication Configuration:
{' '}
<br />
					</Typography>
					<Typography>
						<code>src/app/auth/services/aws/awsAuthConfig.ts</code>
					</Typography>
				</li>
			</ol>

			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Service Authentication Form Components
			</Typography>

			<Typography className="mb-16">
				Each authentication service should provide its own sign-in and sign-up form components. These components
				are located under the components directory of each service folder.
			</Typography>
			<Typography
				className="text-15 mb-8 font-500"
				variant="h6"
			>
				Example: JWT Authentication Service Form Components:
			</Typography>
			<ol className="space-y-12">
				<li>
					<Typography className="mb-4 font-500">Sign-In Auth Form Component:</Typography>
					<Typography>
						<code>src/app/auth/services/jwt/components/JwtSignInForm.tsx</code>
					</Typography>
				</li>
				<li>
					<Typography className="mb-4 font-500">Used in:</Typography>
					<Typography>
						The sign-in form is used in
{' '}
<code>src/app/main/sign-in/tabs/JwtSignInTab.tsx.</code>
					</Typography>
				</li>
			</ol>
			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Adding a New Authentication Service
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				Integrating a new authentication service into our application is designed to be a straightforward
				process, thanks to the modular and flexible architecture of our authentication system.
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				If you're looking to add a new authentication provider, you can do so by examining the examples of the
				already integrated services: Firebase Authentication, JWT Authentication, and AWS Amplify
				Authentication.
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				These examples serve as a blueprint for how to structure your authentication service, making the
				integration process more intuitive.
			</Typography>
			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Steps to Add a New Authentication Provider:
			</Typography>
			<ol className="list-decimal pl-16 mb-16 space-y-16 leading-loose">
				<li>
					<Typography
						className="text-15 mb-8 font-500"
						variant="h6"
					>
						Create Your Authentication Service:
					</Typography>
					<Typography>
						Begin by developing your authentication service. This should include all the necessary logic for
						signing in, signing out, handling user sessions, and managing user data. Place this service
						within the app/auth/services directory for organizational consistency.
					</Typography>
				</li>
				<li>
					<Typography
						className="text-15 mb-8 font-500"
						variant="h6"
					>
						Configure Your Service:
					</Typography>
					<Typography>
						Each authentication service requires a specific set of configurations, such as API keys,
						endpoints, and other parameters. Create a configuration file for your service in the same
						directory as your service. Refer to the existing services for examples on how to structure this
						configuration file.
					</Typography>
				</li>
				<li>
					<Typography
						className="text-15 mb-8 font-500"
						variant="h6"
					>
						Integrate Your Service into AuthenticationProvider:
					</Typography>
					<Typography>
						The
{' '}
<code>AuthenticationProvider</code>
{' '}
component orchestrates the authentication flow of the
						application. To integrate your new service, wrap the
{' '}
<code>Authentication</code>
{' '}
component with
						your service provider, similar to how existing services are integrated. This step is crucial for
						injecting your service into the React context, making it accessible throughout the application.
					</Typography>

					<Typography className="text-13 my-8 font-600">
						Example Integration in AuthenticationProvider:
					</Typography>

					<OlorinHighlight
						component="pre"
						className="language-jsx mb-24"
					>
						{`
<AuthContext.Provider>
	<JwtAuthProvider>
		<AWSAuthProvider>
			<FirebaseAuthProvider>
				<YourNewAuthProvider>
					<Authentication>{children}</Authentication>
				</YourNewAuthProvider>
			</FirebaseAuthProvider>
		</AWSAuthProvider>
	</JwtAuthProvider>
</AuthContext.Provider>`}
					</OlorinHighlight>
				</li>
				<li>
					<Typography
						className="text-15 mb-8 font-500"
						variant="h6"
					>
						Utilize the Service's Context Hook:
					</Typography>
					<Typography>
						Implement a context hook for your authentication service to manage the authentication state
						(e.g., user information, authentication status). This hook will be used within the
{' '}
						<code>Authentication</code>
{' '}
component to monitor changes in the authentication state.
					</Typography>
					<Typography className="text-13 my-8 font-600">
						Example: JWT Authentication Service Auth Hook
					</Typography>

					<OlorinHighlight
						component="pre"
						className="language-jsx mb-24"
					>
						{`
const { user: jwtUser, authStatus: jwtAuthStatus } = useJwtAuth();
`}
					</OlorinHighlight>
				</li>
				<li>
					<Typography
						className="text-15 mb-8 font-500"
						variant="h6"
					>
						Handle Sign-In and User State:
					</Typography>
					<Typography>
						Within the Authentication component, use the information provided by your service's context hook
						to handle user sign-ins and update the main application's user state accordingly.
					</Typography>
				</li>
				<li>
					<Typography
						className="text-15 mb-8 font-500"
						variant="h6"
					>
						Implement Sign-Out and Update User Operations
{' '}
					</Typography>
					<Typography>
						Extend the useAuth hook to implement sign-out and user update operations. This allows for
						signing out and updating user information from anywhere within the application.
{' '}
					</Typography>

					<Typography className="text-13 my-8 font-600">Example: Sign Out Using useAuth Hook</Typography>

					<OlorinHighlight
						component="pre"
						className="language-jsx mb-24"
					>
						{`
const { signOut } = useAuth();
`}
					</OlorinHighlight>
				</li>
				<li>
					<Typography
						className="text-15 mb-8 font-500"
						variant="h6"
					>
						Test Your Integration:
					</Typography>
					<Typography>
						After integrating your new authentication service, thoroughly test the sign-in, sign-out, and
						user session management functionalities. Ensure that your service correctly updates the
						application's state and that users can seamlessly transition between authenticated and
						unauthenticated states.
					</Typography>
				</li>
			</ol>
			<Typography
				className="text-20 mt-20 mb-10 font-700"
				variant="h5"
			>
				Example Services as a Blueprint
			</Typography>
			<Typography
				className="mb-16"
				component="p"
			>
				The existing example authentication services (Firebase, JWT, AWS Amplify) are structured to provide
				clear examples of how to integrate additional authentication providers. By examining these services, you
				can gain insights into:
			</Typography>
			<ol className="list-disc pl-16 mb-16 space-y-12">
				<li>
					<Typography>How to structure your service's API and logic.</Typography>
				</li>
				<li>
					<Typography>The way to configure your service within the application.</Typography>
				</li>
				<li>
					<Typography>
						Methods for integrating your service into the AuthenticationProvider component.
					</Typography>
				</li>
				<li>
					<Typography>Implementing a context hook to manage and expose the authentication state.</Typography>
				</li>
			</ol>
			<Typography
				className="mb-16"
				component="p"
			>
				By following these guidelines and leveraging the existing services as a blueprint, you can efficiently
				add new authentication providers to the application, enhancing its flexibility and the range of
				authentication options available to users.
			</Typography>
		</>
	);
}

export default AuthenticationDoc;
