import { useTimeout } from '@olorin/hooks';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';

export type OlorinLoadingProps = {
	delay?: number;
	className?: string;
};

/**
 * OlorinLoading displays a loading state with an optional delay
 */
function OlorinLoading(props: OlorinLoadingProps) {
	const { delay = 0, className } = props;
	const [showLoading, setShowLoading] = useState(!delay);

	useTimeout(() => {
		setShowLoading(true);
	}, delay);

	return (
		<div
			className={clsx(
				className,
				'flex flex-1 h-full w-full self-center flex-col items-center justify-center p-24',
				!showLoading ? 'hidden' : '',
			)}
		>
			<Typography
				className="-mb-16 text-13 font-medium sm:text-20"
				color="text.secondary"
			>
				Loading
			</Typography>
			<Box
				id="spinner"
				sx={{
					'& > div': {
						backgroundColor: 'palette.secondary.main',
					},
				}}
			>
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</Box>
		</div>
	);
}

export default OlorinLoading;
