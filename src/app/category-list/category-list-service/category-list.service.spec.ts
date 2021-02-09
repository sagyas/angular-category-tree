import { CategoryListMockService } from './category-list.mock.service';

describe('Service: CategoryList', () => {
  let service: CategoryListMockService;
  beforeEach(() => {
    service = new CategoryListMockService();
  });

  afterEach(() => (service = null));

  it('should set a new root category', () => {
    const id = '0';
    const item = { id: id, node_name: 'new', node_parent: '', children: [] };
    service.addItem(null, item);
    const result = service.categoryList[service.categoryList.length - 1];
    // to ignore generated id
    result.id = id;
    expect(result).toEqual(item);
  });

  it('should set a new subcategory', () => {
    const id = '0';
    const parent = service.categoryList[0];
    const item = {
      id: id,
      node_name: 'new',
      node_parent: parent.id,
      children: [],
    };
    service.addItem(parent, item);
    const result = parent.children[0];
    // to ignore generated id
    result.id = id;
    expect(result).toEqual(item);
  });

  it('should remove root category', () => {
    const itemToRemove = service.categoryList[0];
    const oldLastIndex = service.categoryList.length - 1;
    service.removeItem(itemToRemove);
    expect(service.categoryList[oldLastIndex]).toBeUndefined();
  });

  it('should rename an item', () => {
    const newName = 'new name';
    service.renameItem(service.categoryList[0], newName);
    expect(service.categoryList[0].node_name).toBe(newName);
  });
});
