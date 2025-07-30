import data from '@/db.json';
import { ListItemType } from './types';
import { NotFoundError } from '@/errors';
import { v4 } from 'uuid';
import { AddOrUpdateListItemType, PaginatedListItemType } from './shemas';
import { PaginatedListItemsInterface } from './interfaces';

export class ListService {
  counter = 0;

  public async add(dto: AddOrUpdateListItemType): Promise<ListItemType> {
    const payload: ListItemType = {
      id: v4(),
      isChecked: !!dto.isChecked,
      sort: ++this.counter,
      ...dto
    };

    data.push(payload);

    return payload;
  }

  public async get({
    limit = 20,
    page = 1,
    searchText = ''
  }: PaginatedListItemType): Promise<PaginatedListItemsInterface> {
    const start = (page - 1) * limit;
    const end = page * limit;

    const result = data
      // .sort((a, b) => {
      //   return (Number(b.isChecked) || 0) - (Number(a.isChecked) || 0);
      // })
      .filter(item => {
        if (searchText === '') {
          return true;
        } else {
          return item.content
            .toLocaleString()
            .includes(searchText.toLocaleString());
        }
      })
      .sort((a, b) => {
        return (b.sort || 0) - (a.sort || 0);
      })
      .slice(start, end);

    return {
      data: result,
      metadata: { page, limit, searchText }
    };
  }

  public async getOne(id: string): Promise<ListItemType> {
    const currentItem = data.find(item => item.id === id);

    if (!currentItem) {
      throw new NotFoundError('List item not found');
    }

    return currentItem;
  }

  public async update(
    id: string,
    dto: AddOrUpdateListItemType
  ): Promise<ListItemType> {
    const currentItemIndex = data.findIndex(item => item.id === id);

    if (currentItemIndex < 0) {
      throw new NotFoundError('List item not found');
    }

    data[currentItemIndex] = { ...data[currentItemIndex], ...dto };
    return data[currentItemIndex];
  }

  public async delete(id: string): Promise<void> {
    const index = data.findIndex(item => item.id === id);
    if (index < 0) {
      throw new NotFoundError('List Item not found');
    }
    data.splice(index, 1);
  }
}
