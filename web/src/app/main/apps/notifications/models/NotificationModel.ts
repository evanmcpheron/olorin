import _ from '@lodash';
import OlorinUtils from '@olorin/utils';
import { ReactNode } from 'react';

/**
 * The type of the NotificationModel.
 */
export type NotificationModelType = {
	id?: string;
	icon?: string;
	title?: string;
	description?: string;
	time?: string;
	read?: boolean;
	variant?: 'success' | 'info' | 'error' | 'warning' | 'alert' | 'primary' | 'secondary';
	link?: string;
	image?: string;
	children?: ReactNode;
};

/**
 * The NotificationModel class.
 * Implements NotificationModelProps interface.
 */
function NotificationModel(data: NotificationModelType): NotificationModelType {
	data = data || {};

	return _.defaults(data, {
		id: OlorinUtils.generateGUID(),
		icon: 'heroicons-solid:star',
		title: '',
		description: '',
		time: new Date().toISOString(),
		read: false,
		variant: 'default',
	}) as NotificationModelType;
}

export default NotificationModel;
