import { Observable } from 'rxjs';

export interface ICategoryListService {
  loadTree(): Observable<any>;
  saveTree(): void;
  addItem(parentItem: any, newItem: any): void;
  renameItem(item: any, newName: string): void;
  removeItem(item: any): void;
}
