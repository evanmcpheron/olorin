import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import { lighten } from '@mui/material/styles';
import CourseInfo from '../CourseInfo';
import CourseProgress from '../CourseProgress';
import { Course } from '../AcademyApi';

type CourseCardProps = {
	course: Course;
};

/**
 * The CourseCard component.
 */
function CourseCard(props: CourseCardProps) {
	const { course } = props;

	function buttonStatus() {
		switch (course.activeStep) {
			case course.totalSteps:
				return 'Completed';
			case 0:
				return 'Start';
			default:
				return 'Continue';
		}
	}

	return (
		<Card className="flex flex-col h-384 shadow">
			<CardContent className="flex flex-col flex-auto p-24">
				<CourseInfo course={course} />
			</CardContent>
			<CourseProgress course={course} />
			<CardActions
				className="items-center justify-end py-16 px-24"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? lighten(theme.palette.background.default, 0.4)
							: lighten(theme.palette.background.default, 0.03),
				}}
			>
				<Button
					to={`/apps/academy/courses/${course.id}/${course.slug}`}
					component={Link}
					className="px-16 min-w-128"
					color="secondary"
					variant="contained"
					endIcon={<OlorinSvgIcon size={20}>heroicons-solid:arrow-sm-right</OlorinSvgIcon>}
				>
					{buttonStatus()}
				</Button>
			</CardActions>
		</Card>
	);
}

export default CourseCard;
