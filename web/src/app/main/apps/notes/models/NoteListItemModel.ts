import OlorinUtils from '@olorin/utils';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { NoteListItemType } from '../NotesApi';

/**
 * The note list item model.
 */
function NoteListItemModel(data: PartialDeep<NoteListItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: OlorinUtils.generateGUID(),
		content: '',
		completed: false,
	});
}

export default NoteListItemModel;
