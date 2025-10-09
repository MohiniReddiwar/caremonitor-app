import { TestBed } from '@angular/core/testing';
import { ItemService } from './item';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Item Service', () => {
  let service: ItemService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ItemService,
        { provide: HttpClient, useValue: spy }
      ]
    });

    service = TestBed.inject(ItemService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of items', (done: DoneFn) => {
    const mockItems = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' }
    ];

    httpClientSpy.get.and.returnValue(of(mockItems));

    service.getItems().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(mockItems);
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('/api/items');
  });
});
