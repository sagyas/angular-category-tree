import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategoryListService } from './category-list.service.interface';
import { findParent, getIndex, randomAlphaNumeric } from 'src/app/utils/utils';

export class CategoryListItem {
  node_name: string;
  children: CategoryListItem[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryListService implements ICategoryListService {
  categoryList: any;
  nodesToDelete = [];
  constructor(private firestore: AngularFirestore) {}

  loadTree(): Observable<any> {
    let treeLoaded = new Observable<any>((observer) => {
      return this.getDB().subscribe((resp) => {
        let nodes = this.mapObjectsToNodes(resp);
        let tree = this.constructTree(nodes);
        this.categoryList = tree;
        observer.next(tree);
      });
    });
    return treeLoaded;
  }

  private mapObjectsToNodes(objects) {
    return objects.map((node: any) => {
      const data: Object = node.payload.doc.data();
      const id = node.payload.doc.id;
      return Object.assign(new CategoryListItem(), { id, ...data });
    });
  }

  private getDB(): Observable<any> {
    return this.firestore.collection('nodes').snapshotChanges();
  }

  private constructTree(tree): void {
    let result = tree.map((element: any) => {
      const children = tree.filter(
        (child: any) => child.node_parent == element.id
      );
      element.children = children;
      return element;
    });
    result = result.filter((element: any) => element.node_parent == '');
    return result;
  }

  saveTree(): void {
    const queue = [...this.categoryList];
    while (queue.length > 0) {
      let cur = queue.shift();
      this.putNode(cur);
      cur?.children.forEach((child: any) => {
        queue.push(child);
      });
    }

    this.nodesToDelete.forEach((node) => {
      this.firestore.collection('nodes').doc(node.id).delete();
    });
  }

  private putNode(node: any): void {
    const nodeId = node?.id;
    // to ignore children and id
    const { children, id, ...newNode } = node;
    this.firestore
      .collection('nodes')
      .doc(nodeId ? nodeId : randomAlphaNumeric(20))
      .set({ ...newNode });
  }

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
    this.nodesToDelete.push(item);
    item.children?.forEach((child) => this.nodesToDelete.push(child));
  }
}
