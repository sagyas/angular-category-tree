import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryListService } from './category-list-service/category-list.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categoryList = [];
  treeSubscription: any;
  nameInput = '';
  loading = true;
  constructor(private service: CategoryListService) {}

  ngOnInit(): void {
    this.onLoad();
  }

  onSave() {
    this.service.saveTree();
  }

  onLoad() {
    this.loading = true;
    this.treeSubscription = this.service.loadTree().subscribe((tree) => {
      this.categoryList = tree;
      this.loading = false;
    });
  }

  onAddItem() {
    let newItem = {
      node_name: this.nameInput,
      children: [],
    };
    this.service.addItem(undefined, newItem);
    this.nameInput = '';
  }

  ngOnDestroy() {
    if (this.treeSubscription) {
      this.treeSubscription.unsubscribe();
    }
  }
}
