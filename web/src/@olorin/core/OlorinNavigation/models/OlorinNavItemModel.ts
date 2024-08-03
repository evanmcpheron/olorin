import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { OlorinNavItemType } from '../types/OlorinNavItemType';

/**
 *  OlorinNavItemModel
 *  Constructs a navigation item based on OlorinNavItemType
 */
function OlorinNavItemModel(data?: PartialDeep<OlorinNavItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		translate: '',
		auth: null,
		subtitle: '',
		icon: '',
		iconClass: '',
		url: '',
		target: '',
		type: 'item',
		sx: {},
		disabled: false,
		active: false,
		exact: false,
		end: false,
		badge: null,
		children: [],
	});
}

export default OlorinNavItemModel;
