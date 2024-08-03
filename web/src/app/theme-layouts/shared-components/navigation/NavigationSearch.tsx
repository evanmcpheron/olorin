import OlorinSearch from '@olorin/core/OlorinSearch';
import withSlices from 'app/store/withSlices';
import { useAppSelector } from 'app/store/hooks';
import { navigationSlice, selectFlatNavigation } from './store/navigationSlice';

type NavigationSearchProps = {
	className?: string;
	variant?: 'basic' | 'full';
};

/**
 * The navigation search.
 */
function NavigationSearch(props: NavigationSearchProps) {
	const { variant, className } = props;

	const navigation = useAppSelector(selectFlatNavigation);

	return (
		<OlorinSearch
			className={className}
			variant={variant}
			navigation={navigation}
		/>
	);
}

export default withSlices<NavigationSearchProps>([navigationSlice])(NavigationSearch);
