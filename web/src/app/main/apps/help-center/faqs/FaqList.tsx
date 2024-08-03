import { motion } from 'framer-motion';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import { SyntheticEvent, useState } from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { Faq } from '../HelpCenterApi';

const container = {
	show: {
		transition: {
			staggerChildren: 0.04,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

const StyledAccordion = styled(Accordion)(() => ({
	border: 'none!important',
	borderRadius: '8px!important',
	'&:before': {
		display: 'none',
	},
}));

type FaqListProps = {
	list: Faq[];
	className?: string;
};

/**
 * The faq list component.
 */
function FaqList(props: FaqListProps) {
	const { list, className } = props;

	const [expanded, setExpanded] = useState<string | boolean>(false);

	const toggleAccordion = (panel: string) => (_: SyntheticEvent, _expanded: boolean) => {
		setExpanded(_expanded ? panel : false);
	};

	return (
		list?.length > 0 && (
			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className={clsx('space-y-24', className)}
			>
				{list.map((faq) => (
					<motion.div
						variants={item}
						key={faq.id}
					>
						<StyledAccordion
							classes={{
								root: 'FaqPage-panel shadow',
							}}
							expanded={expanded === faq.id}
							onChange={toggleAccordion(faq.id)}
						>
							<AccordionSummary
								expandIcon={<OlorinSvgIcon>heroicons-outline:chevron-down</OlorinSvgIcon>}
							>
								<div className="flex items-center py-4">
									<OlorinSvgIcon color="action">heroicons-outline:question-mark-circle</OlorinSvgIcon>
									<Typography className="px-12 font-medium">{faq.question}</Typography>
								</div>
							</AccordionSummary>

							<AccordionDetails>
								<Typography className="text-14 px-32 pb-8 -mt-8">{faq.answer}</Typography>
							</AccordionDetails>
						</StyledAccordion>
					</motion.div>
				))}
			</motion.div>
		)
	);
}

export default FaqList;
