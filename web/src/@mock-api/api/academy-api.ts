import _ from '@lodash';
import mockApi from '../mock-api.json';
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import { Course } from '../../app/main/apps/academy/AcademyApi';

const demoCourseContent = mockApi.components.examples.academy_demo_course_content.value;
const exampleCourseSteps = mockApi.components.examples.academy_demo_course_steps.value;

const steps = exampleCourseSteps.map((item) => ({
	...item,
	content: `${item.content} ${demoCourseContent}`,
}));
const courses = mockApi.components.examples.academy_courses.value;
const categoriesDB = mockApi.components.examples.academy_categories.value;

const coursesDB = courses.map((course) => ({
	...course,
	steps,
}));

export const academyApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/academy/courses').reply(() => [200, coursesDB]);

	mock.onGet('/academy/courses/:courseId').reply((config) => {
		const { courseId } = config.params as Params;
		const course = _.find(coursesDB, { id: courseId });

		if (!course) {
			return [404, 'Requested data do not exist.'];
		}

		return [200, course];
	});

	mock.onPut('/academy/courses/:courseId').reply((config) => {
		const { courseId } = config.params as Params;

		const course = _.find(coursesDB, { id: courseId }) as Course;

		const newData = JSON.parse(config.data as string) as Course;

		if (!course) {
			return [404, 'Requested data do not exist.'];
		}

		_.assign(course, _.merge({}, course, newData));

		if (newData?.progress?.currentStep === course?.totalSteps) {
			_.assign(course, _.merge({}, course, { progress: { completed: course.progress.completed + 1 } }));
		}

		return [200, course];
	});

	mock.onGet('/academy/categories').reply(() => [200, categoriesDB]);
};
