import { CategoryListMockService as MockCategoryListService } from 'src/app/category-list/category-list-service/category-list.mock.service';
import { CategoryListService } from 'src/app/category-list/category-list-service/category-list.service';
export const environment = {
  production: true,
  providers: [
    { provide: MockCategoryListService, useClass: CategoryListService },
  ],
};
