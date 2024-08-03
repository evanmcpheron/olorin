import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import useSelectMailsTitle from '../hooks/useSelectMailsTitle';

/**
 * The mail list title.
 */
function MailListTitle() {
	const routeParams = useParams();
	const title = useSelectMailsTitle(routeParams);

	return <Typography className="hidden sm:flex font-semibold uppercase mx-8">{title}</Typography>;
}

export default MailListTitle;
