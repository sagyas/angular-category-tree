import { Component, Input, OnInit } from '@angular/core';
import {
  CategoryListItem,
  CategoryListService,
} from '../category-list-service/category-list.service';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css'],
})
export class CategoryListItemComponent implements OnInit {
  @Input() item: CategoryListItem;
  expanded = false;
  nameInput = '';
  constructor(private service: CategoryListService) {}

  ngOnInit(): void {}

  onItemToggle() {
    this.expanded = !this.expanded;
  }

  onAddItem() {
    this.expanded = true;
    let newItem = {
      node_name: this.nameInput,
      children: [],
    };
    this.service.addItem(this.item, newItem);
    this.nameInput = '';
  }

  onRenameItem() {
    this.service.renameItem(this.item, this.nameInput);
    this.nameInput = '';
  }

  onDeleteItem() {
    this.service.removeItem(this.item);
  }
}
