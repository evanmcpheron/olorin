import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

/**
 * The orders header.
 */
function OrdersHeader() {
	return (
		<div className="flex space-y-12 sm:space-y-0 flex-1 w-full items-center justify-between py-8 sm:py-16 px-16 md:px-24">
			<motion.span
				initial={{ x: -20 }}
				animate={{
					x: 0,
					transition: { delay: 0.2 },
				}}
			>
				<Typography className="flex text-24 md:text-32 font-extrabold tracking-tight">Orders</Typography>
			</motion.span>

			<div className="flex w-full sm:w-auto flex-1 items-center justify-end space-x-8" />
		</div>
	);
}

export default OrdersHeader;
