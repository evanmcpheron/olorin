import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { AuthenticatorProps } from '@aws-amplify/ui-react/dist/types/components/Authenticator/Authenticator';
import '@aws-amplify/ui-react/styles.css';
import { styled } from '@mui/material/styles';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import OlorinLoading from '@olorin/core/OlorinLoading';

const Root = styled('div')(({ theme }) => ({
	'& [data-amplify-theme]': {
		fontSize: '16px',
		'--amplify-fonts-default-static': 'Inter var,Roboto,"Helvetica",Arial,sans-serif',
		'--amplify-fonts-default-variable': 'Inter var,Roboto,"Helvetica",Arial,sans-serif',
		'--amplify-font-sizes-large': '1.6rem',
		'--amplify-font-sizes-medium': '1.4rem',
		'--amplify-font-sizes-small': '1.3rem',
		'--amplify-colors-font-primary': theme.palette.text.primary,
		'--amplify-colors-font-secondary': theme.palette.text.secondary,
		'--amplify-space-xxs': '1rem',
		'--amplify-space-xs': '1.1rem',
		'--amplify-space-small': '1.2rem',
		'--amplify-space-medium': '2.4rem',
		'--amplify-space-large': '3.2rem',
		'--amplify-components-field-font-size': '1.3rem',
		'--amplify-components-field-gap': '.8rem',
		'--amplify-components-flex-gap': '2rem',
		'--amplify-components-button-small-padding-block-start': '1rem',
		'--amplify-components-button-small-padding-block-end': '1rem',
		'--amplify-components-button-padding-block-start': '1rem',
		'--amplify-components-button-padding-block-end': '1rem',
		'--amplify-components-authenticator-footer-padding-bottom': '0rem',
		'--amplify-space-relative-medium': '2rem',
		'--amplify-components-fieldcontrol-padding-block-start': '1.6rem',
		'--amplify-components-fieldcontrol-padding-block-end': '1.6rem',
		'--amplify-components-fieldcontrol-padding-inline-start': '1.4rem',
		'--amplify-components-fieldcontrol-padding-inline-end': '1.4rem',
		'--amplify-components-button-border-radius': '2.8rem',
		'--amplify-components-authenticator-form-padding': '0',
		'--amplify-components-authenticator-router-box-shadow': '0',
		'--amplify-components-authenticator-router-border-width': '0',
		'--amplify-components-authenticator-container-width-max': '100%',
		'--amplify-components-button-link-color': theme.palette.secondary.main,
		'--amplify-components-button-link-hover-background-color': 'initial',
		'--amplify-components-button-link-active-background-color': 'initial',
		'--amplify-colors-font-hover': theme.palette.secondary.dark,
		'--amplify-internal-button-background-color': 'transparent',
		'--amplify-internal-button-border-color': theme.palette.secondary.main,
		'--amplify-components-button-hover-border-color': theme.palette.secondary.main,
		'--amplify-components-button-hover-background-color': 'transparent',
		'--amplify-components-button-active-background-color': 'transparent',
		'--amplify-components-button-link-overlay-active-background-color': theme.palette.secondary.light,
		'--amplify-components-button-primary-background-color': theme.palette.secondary.main,
		'--amplify-components-button-primary-hover-background-color': theme.palette.secondary.dark,
		'--amplify-components-button-primary-active-background-color': theme.palette.secondary.dark,
		'--amplify-components-button-primary-focus-background-color': theme.palette.secondary.dark,
		'--amplify-components-button-font-weight': '500',
		'--amplify-components-button-link-border-width': '0',
		'--amplify-components-button-link-hover-border-width': '0',
		'--amplify-components-button-link-focus-box-shadow': '0',
		'--amplify-components-button-link-focus-background-color': 'initial',
		'--amplify-components-button-link-focus-color': theme.palette.secondary.dark,
		'--amplify-components-fieldcontrol-focus-box-shadow': `0px 0px 0px 1px ${theme.palette.secondary.main}`,
		'--amplify-components-authenticator-router-background-color': 'initial',
		'--amplify-components-alert-padding-block': '1.2rem',
		'--amplify-components-alert-padding-inline': '1.2rem',
		'--amplify-components-fieldcontrol-border-radius': '0.4rem',
		'& .amplify-tabs__list': {
			display: 'none',
		},
		'& .amplify-alert': {
			borderRadius: 6,
		},
		'& .amplify-alert__body': {
			fontSize: '1.2rem',
		},
		'& .amplify-field-group .amplify-field-group__outer-end .amplify-field-group__control': {
			borderRadius: '0 4px 4px 0',
		},
		'& .amplify-field-group .amplify-field-group__outer-start .amplify-field-group__control': {
			borderRadius: '4px 0 0 4px',
		},
		'& .amplify-divider--horizontal': {
			margin: '1.6rem 0',
		},
	},
}));

function AwsAuthenticator(props: AuthenticatorProps) {
	const { toSignIn, toSignUp, authStatus } = useAuthenticator();
	const { initialState } = props;

	useEffect(() => {
		if (initialState === 'signUp') {
			toSignUp();
		}

		if (initialState === 'signIn') {
			toSignIn();
		}
	}, []);

	if (authStatus === 'authenticated') {
		return (
			<div className="flex flex-col w-full items-center justify-center py-64 space-y-24">
				<OlorinLoading />
			</div>
		);
	}

	return (
		<Root className="w-full">
			<ThemeProvider>
				<Authenticator {...props} />
			</ThemeProvider>
		</Root>
	);
}

export default AwsAuthenticator;
