import apiService from 'app/store/apiService';
import { showMessage } from '@olorin/core/OlorinMessage/olorinMessageSlice';
import { PartialDeep } from 'type-fest';

export const addTagTypes = ['academy_courses', 'academy_course', 'academy_categories'] as const;

const AcademyApi = apiService
	.enhanceEndpoints({
		addTagTypes,
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAcademyCourses: build.query<GetAcademyCoursesApiResponse, GetAcademyCoursesApiArg>({
				query: () => ({ url: '/mock-api/academy/courses' }),
				providesTags: ['academy_courses'],
			}),
			getAcademyCourse: build.query<GetAcademyCourseApiResponse, GetAcademyCourseApiArg>({
				query: (queryArg) => ({ url: `/mock-api/academy/courses/${queryArg.courseId}` }),
				providesTags: ['academy_course'],
			}),
			updateAcademyCourse: build.mutation<UpdateAcademyCourseApiResponse, UpdateAcademyCourseApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/academy/courses/${queryArg.courseId}`,
					method: 'PUT',
					data: queryArg.data,
				}),
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(showMessage({ message: 'Course Saved' }));
					} catch (err) {
						dispatch(showMessage({ message: 'Error Saving the course!' }));
					}
				},
				invalidatesTags: ['academy_courses', 'academy_course'],
			}),
			deleteAcademyCourse: build.mutation<DeleteAcademyCourseApiResponse, DeleteAcademyCourseApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/academy/courses/${queryArg.courseId}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['academy_courses'],
			}),
			getAcademyCategories: build.query<GetAcademyCategoriesApiResponse, GetAcademyCategoriesApiArg>({
				query: () => ({ url: '/mock-api/academy/categories' }),
				providesTags: ['academy_categories'],
			}),
		}),
		overrideExisting: false,
	});

export default AcademyApi;
export type GetAcademyCoursesApiResponse = /** status 200 OK */ Course[];
export type GetAcademyCoursesApiArg = void;
export type GetAcademyCourseApiResponse = /** status 200 OK */ Course;
export type GetAcademyCourseApiArg = {
	courseId: string;
};

export type UpdateAcademyCourseApiResponse = unknown;
export type UpdateAcademyCourseApiArg = {
	courseId: string;
	data: PartialDeep<Course>;
};

export type DeleteAcademyCourseApiResponse = unknown;
export type DeleteAcademyCourseApiArg = {
	courseId: string;
};

export type GetAcademyCategoriesApiResponse = /** status 200 OK */ Category[];
export type GetAcademyCategoriesApiArg = void;
export type Course = {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	duration: number;
	totalSteps: number;
	updatedAt: string;
	featured: boolean;
	progress: {
		currentStep: number;
		completed: number;
	};
	activeStep?: number;
	steps?: {
		content?: string;
		title?: string;
		subtitle?: string;
		order?: number;
	}[];
};

export type Category = {
	id: string;
	title: string;
	slug: string;
	color: string;
};

export const {
	useGetAcademyCoursesQuery,
	useGetAcademyCourseQuery,
	useUpdateAcademyCourseMutation,
	useDeleteAcademyCourseMutation,
	useGetAcademyCategoriesQuery,
} = AcademyApi;
