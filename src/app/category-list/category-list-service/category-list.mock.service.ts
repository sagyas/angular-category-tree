import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategoryListService } from './category-list.service.interface';
import { findParent, getIndex, randomAlphaNumeric } from 'src/app/utils/utils';

export class CategoryListItem {
  node_name: string;
  children: CategoryListItem[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryListMockService implements ICategoryListService {
  categoryList = [
    {
      id: randomAlphaNumeric(20),
      node_name: 'sport',
      node_parent: '',
      children: [],
    },
    {
      id: randomAlphaNumeric(20),
      node_name: 'tv shows',
      node_parent: '',
      children: [],
    },
  ];

  loadTree(): Observable<any> {
    return of(this.categoryList);
  }

  saveTree() {}

  addItem(parentItem: any, newItem: any): void {
    let nodeToAdd = {
      id: randomAlphaNumeric(20),
      node_name: newItem.node_name,
      node_parent: parentItem?.id ? parentItem.id : '',
      children: [],
    };
    if (parentItem == undefined) {
      this.categoryList.push(nodeToAdd);
    } else {
      parentItem.children.push(nodeToAdd);
    }
  }
  renameItem(item: any, newName: string): void {
    item.node_name = newName;
  }

  removeItem(item: any): void {
    const parent = findParent(item, this.categoryList);
    if (parent == undefined) {
      const index = getIndex(item, this.categoryList);
      this.categoryList.splice(index, 1);
    } else {
      const list = parent.children;
      const index = getIndex(item, list);
      list.splice(index, 1);
    }
  }
}
