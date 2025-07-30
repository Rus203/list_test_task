import { PaginatedListItemType } from './shemas';
import { ListItemType } from './types';

export interface PaginatedListItemsInterface {
  metadata: Required<PaginatedListItemType>;
  data: ListItemType[];
}
