import OlorinUtils from '@olorin/utils';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import withRouter from '@olorin/core/withRouter';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { useAppSelector } from 'app/store/hooks';
import MailListItem from './MailListItem';
import { selectSearchText } from '../mailboxAppSlice';
import { MailboxMail, useGetMailboxMailsQuery } from '../MailboxApi';

/**
 * The mail list.
 */
function MailList() {
	const routeParams = useParams();

	const searchText = useAppSelector(selectSearchText);
	const { data: mails } = useGetMailboxMailsQuery(routeParams);

	const [filteredData, setFilteredData] = useState<MailboxMail[]>([]);

	const { t } = useTranslation('mailboxApp');

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0) {
				return mails;
			}

			return OlorinUtils.filterArrayByString<MailboxMail>(mails, searchText);
		}

		if (mails) {
			setFilteredData(getFilteredArray());
		}
	}, [mails, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center p-24"
			>
				<OlorinSvgIcon
					className="icon-size-128 mb-16"
					color="disabled"
					size={24}
				>
					heroicons-outline:mail-open
				</OlorinSvgIcon>
				<Typography
					className="mt-16 text-2xl font-semibold tracking-tight"
					color="text.secondary"
				>
					{t('NO_MESSAGES')}
				</Typography>
			</motion.div>
		);
	}

	return (
		<List className="p-0 w-full">
			{filteredData.map((mail) => (
				<MailListItem
					mail={mail}
					key={mail.id}
				/>
			))}
		</List>
	);
}

export default withRouter(MailList);
