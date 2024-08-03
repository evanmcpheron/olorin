import OlorinUtils from '@olorin/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ScrumboardCheckListItem } from '../ScrumboardApi';

/**
 * The checklist item model.
 */
function ChecklistItemModel(data: PartialDeep<ScrumboardCheckListItem>): ScrumboardCheckListItem {
	data = data || {};

	return _.defaults(data, {
		id: OlorinUtils.generateGUID(),
		name: '',
		checked: false,
	});
}

export default ChecklistItemModel;
