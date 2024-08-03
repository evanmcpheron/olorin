import OlorinLoading from '@olorin/core/OlorinLoading';
import { ReactNode, Suspense } from 'react';
import { OlorinLoadingProps } from '@olorin/core/OlorinLoading/OlorinLoading';

type OlorinSuspenseProps = {
	loadingProps?: OlorinLoadingProps;
	children: ReactNode;
};

/**
 * The OlorinSuspense component is a wrapper around the React Suspense component.
 * It is used to display a loading spinner while the wrapped components are being loaded.
 * The component is memoized to prevent unnecessary re-renders.
 * React Suspense defaults
 * For to Avoid Repetition
 */
function OlorinSuspense(props: OlorinSuspenseProps) {
	const { children, loadingProps } = props;
	return <Suspense fallback={<OlorinLoading {...loadingProps} />}>{children}</Suspense>;
}

export default OlorinSuspense;
