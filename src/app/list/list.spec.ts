import { ComponentFixture, TestBed } from '@angular/core/testing';
import { List } from './list';
import { ListStore } from './list.store';
import { of } from 'rxjs';
import { Item } from '../services/item';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';

describe('List Component', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let mockListStore: Partial<ListStore>;

  beforeEach(async () => {
    const mockItems: Item[] = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' }
    ];

    mockListStore = {
      items$: of(mockItems),
      loading$: of(false),
      error$: of(null),
      loadItems: jasmine.createSpy('loadItems')
    };

    await TestBed.configureTestingModule({
      imports: [
        List,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule
      ],
      providers: [
        { provide: ListStore, useValue: mockListStore },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadItems on ngOnInit', () => {
    expect(mockListStore.loadItems).toHaveBeenCalled();
  });

  it('should display the correct number of item cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(cards.length).toBe(2);
  });

  it('should display item names correctly', () => {
    const cards = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(cards[0].nativeElement.textContent).toContain('Item 1');
    expect(cards[1].nativeElement.textContent).toContain('Item 2');
  });
});
