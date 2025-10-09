import { TestBed } from '@angular/core/testing';
import { ListStore, ListState } from './list.store';
import { ItemService, Item } from '../services/item';
import { of, throwError } from 'rxjs';

describe('ListStore', () => {
  let store: ListStore;
  let mockItemService: jasmine.SpyObj<ItemService>;

  const mockItems: Item[] = [
    { id: 1, name: 'Item 1', description: 'Desc 1' },
    { id: 2, name: 'Item 2', description: 'Desc 2' }
  ];

  beforeEach(() => {
    mockItemService = jasmine.createSpyObj('ItemService', ['getItems']);

    TestBed.configureTestingModule({
      providers: [
        ListStore,
        { provide: ItemService, useValue: mockItemService }
      ]
    });

    store = TestBed.inject(ListStore);
  });

  it('should be created with initial state', () => {
    expect(store).toBeTruthy();
    store.items$.subscribe(items => expect(items).toEqual([]));
    store.loading$.subscribe(loading => expect(loading).toBeFalse());
    store.error$.subscribe(error => expect(error).toBeNull());
  });

  it('should load items successfully', (done) => {
    mockItemService.getItems.and.returnValue(of(mockItems));

    store.loadItems();

    setTimeout(() => {
      store.items$.subscribe(items => expect(items).toEqual(mockItems));
      store.loading$.subscribe(loading => expect(loading).toBeFalse());
      store.error$.subscribe(error => expect(error).toBeNull());
      done();
    }, 0);
  });

  it('should handle error when loadItems fails', (done) => {
    const errorMsg = 'Network Error';
    mockItemService.getItems.and.returnValue(throwError(() => new Error(errorMsg)));

    store.loadItems();

    setTimeout(() => {
      store.items$.subscribe(items => expect(items).toEqual([]));
      store.loading$.subscribe(loading => expect(loading).toBeFalse());
      store.error$.subscribe(error => expect(error).toBe(errorMsg));
      done();
    }, 0);
  });
});
