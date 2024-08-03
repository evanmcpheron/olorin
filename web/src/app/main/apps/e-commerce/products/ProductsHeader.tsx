import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import NavLinkAdapter from '@olorin/core/NavLinkAdapter';
import useThemeMediaQuery from '@olorin/hooks/useThemeMediaQuery';

/**
 * The products header.
 */
function ProductsHeader() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<div className="flex space-y-12 sm:space-y-0 flex-1 w-full items-center justify-between py-8 sm:py-16 px-16 md:px-24">
			<motion.span
				initial={{ x: -20 }}
				animate={{ x: 0, transition: { delay: 0.2 } }}
			>
				<Typography className="text-24 md:text-32 font-extrabold tracking-tight">Products</Typography>
			</motion.span>

			<div className="flex flex-1 items-center justify-end space-x-8">
				<motion.div
					className="flex flex-grow-0"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
				>
					<Button
						className=""
						variant="contained"
						color="secondary"
						component={NavLinkAdapter}
						to="/apps/e-commerce/products/new"
						size={isMobile ? 'small' : 'medium'}
					>
						<OlorinSvgIcon size={20}>heroicons-outline:plus</OlorinSvgIcon>
						<span className="mx-4 sm:mx-8">Add</span>
					</Button>
				</motion.div>
			</div>
		</div>
	);
}

export default ProductsHeader;
