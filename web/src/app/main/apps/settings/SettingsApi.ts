import { apiService as api } from 'app/store/apiService';

export const addTagTypes = [
	'settings_account',
	'settings_notification',
	'settings_security',
	'settings_plan_billing',
	'settings_team',
	'settings_team_member',
] as const;
const injectedRtkApi = api
	.enhanceEndpoints({
		addTagTypes,
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAccountSettings: build.query<GetAccountSettingsApiResponse, GetAccountSettingsApiArg>({
				query: () => ({ url: '/mock-api/settings/account' }),
				providesTags: ['settings_account'],
			}),
			updateAccountSettings: build.mutation<UpdateAccountSettingsApiResponse, UpdateAccountSettingsApiArg>({
				query: (queryArg) => ({
					url: '/mock-api/settings/account',
					method: 'PUT',
					data: queryArg,
				}),
				invalidatesTags: ['settings_account'],
			}),
			getNotificationSettings: build.query<GetNotificationSettingsApiResponse, GetNotificationSettingsApiArg>({
				query: () => ({ url: '/mock-api/settings/notifications' }),
				providesTags: ['settings_notification'],
			}),
			updateNotificationSettings: build.mutation<
				UpdateNotificationSettingsApiResponse,
				UpdateNotificationSettingsApiArg
			>({
				query: (queryArg) => ({
					url: '/mock-api/settings/notifications',
					method: 'PUT',
					data: queryArg,
				}),
				invalidatesTags: ['settings_notification'],
			}),
			getSecuritySettings: build.query<GetSecuritySettingsApiResponse, GetSecuritySettingsApiArg>({
				query: () => ({ url: '/mock-api/settings/security' }),
				providesTags: ['settings_security'],
			}),
			updateSecuritySettings: build.mutation<UpdateSecuritySettingsApiResponse, UpdateSecuritySettingsApiArg>({
				query: (queryArg) => ({
					url: '/mock-api/settings/security',
					method: 'PUT',
					data: queryArg,
				}),
				invalidatesTags: ['settings_security'],
			}),
			getPlanBillingSettings: build.query<GetPlanBillingSettingsApiResponse, GetPlanBillingSettingsApiArg>({
				query: () => ({ url: '/mock-api/settings/plan-billing' }),
				providesTags: ['settings_plan_billing'],
			}),
			updatePlanBillingSettings: build.mutation<
				UpdatePlanBillingSettingsApiResponse,
				UpdatePlanBillingSettingsApiArg
			>({
				query: (queryArg) => ({
					url: '/mock-api/settings/plan-billing',
					method: 'PUT',
					data: queryArg,
				}),
				invalidatesTags: ['settings_plan_billing'],
			}),
			getTeamMembersSettings: build.query<GetTeamMembersSettingsApiResponse, GetTeamMembersSettingsApiArg>({
				query: () => ({ url: '/mock-api/settings/team' }),
				providesTags: ['settings_team'],
			}),
			createTeamMemberSettings: build.mutation<
				CreateTeamMemberSettingsApiResponse,
				CreateTeamMemberSettingsApiArg
			>({
				query: (queryArg) => ({
					url: '/mock-api/settings/team',
					method: 'POST',
					data: queryArg,
				}),
				invalidatesTags: ['settings_team'],
			}),
			deleteTeamMemberSettings: build.mutation<
				DeleteTeamMemberSettingsApiResponse,
				DeleteTeamMemberSettingsApiArg
			>({
				query: (queryArg) => ({
					url: `/mock-api/settings/team/${queryArg.memberId}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['settings_team_member'],
			}),
			updateTeamMemberSettings: build.mutation<
				UpdateTeamMemberSettingsApiResponse,
				UpdateTeamMemberSettingsApiArg
			>({
				query: (queryArg) => ({
					url: '/mock-api/settings/team',
					method: 'PUT',
					data: queryArg,
				}),
				invalidatesTags: ['settings_team'],
			}),
		}),
		overrideExisting: false,
	});
export { injectedRtkApi as SettingsApi };
export type GetAccountSettingsApiResponse = /** status 200 OK */ SettingsAccount;
export type GetAccountSettingsApiArg = void;
export type UpdateAccountSettingsApiResponse = unknown;
export type UpdateAccountSettingsApiArg = SettingsAccount;
export type GetNotificationSettingsApiResponse = /** status 200 OK */ SettingsNotifications;
export type GetNotificationSettingsApiArg = void;
export type UpdateNotificationSettingsApiResponse = unknown;
export type UpdateNotificationSettingsApiArg = SettingsNotifications;
export type GetSecuritySettingsApiResponse = /** status 200 OK */ SettingsSecurity;
export type GetSecuritySettingsApiArg = void;
export type UpdateSecuritySettingsApiResponse = unknown;
export type UpdateSecuritySettingsApiArg = SettingsSecurity;
export type GetPlanBillingSettingsApiResponse = /** status 200 OK */ SettingsPlanBilling;
export type GetPlanBillingSettingsApiArg = void;
export type UpdatePlanBillingSettingsApiResponse = unknown;
export type UpdatePlanBillingSettingsApiArg = SettingsPlanBilling;
export type GetTeamMembersSettingsApiResponse = /** status 200 OK */ SettingsTeamMember[];
export type GetTeamMembersSettingsApiArg = void;
export type CreateTeamMemberSettingsApiResponse = unknown;
export type CreateTeamMemberSettingsApiArg = SettingsTeamMember;
export type DeleteTeamMemberSettingsApiResponse = unknown;
export type DeleteTeamMemberSettingsApiArg = {
	memberId: string;
};
export type UpdateTeamMemberSettingsApiResponse = unknown;
export type UpdateTeamMemberSettingsApiArg = SettingsTeamMember[];
export type SettingsAccount = {
	name?: string;
	username?: string;
	title?: string;
	company?: string;
	about?: string;
	email?: string;
	phone?: string;
	country?: string;
	language?: string;
};
export type SettingsNotifications = {
	communication?: boolean;
	security?: boolean;
	meetups?: boolean;
	comments?: boolean;
	mention?: boolean;
	follow?: boolean;
	inquiry?: boolean;
};
export type SettingsSecurity = {
	currentPassword?: string;
	newPassword?: string;
	twoStepVerification?: boolean;
	askPasswordChange?: boolean;
};
export type SettingsPlanBilling = {
	plan?: string;
	cardHolder?: string;
	cardNumber?: string;
	cardExpiration?: string;
	cardCVC?: string;
	country?: string;
	zip?: string;
};
export type SettingsTeamMember = {
	avatar?: string;
	name?: string;
	email?: string;
	role?: string;
};
export const {
	useGetAccountSettingsQuery,
	useUpdateAccountSettingsMutation,
	useGetNotificationSettingsQuery,
	useUpdateNotificationSettingsMutation,
	useGetSecuritySettingsQuery,
	useUpdateSecuritySettingsMutation,
	useGetPlanBillingSettingsQuery,
	useUpdatePlanBillingSettingsMutation,
	useGetTeamMembersSettingsQuery,
	useCreateTeamMemberSettingsMutation,
	useDeleteTeamMemberSettingsMutation,
	useUpdateTeamMemberSettingsMutation,
} = injectedRtkApi;
