import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { ItemService, Item } from '../services/item';

export interface ListState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class ListStore extends ComponentStore<ListState> {
    constructor(private itemService: ItemService) {
        super({ items: [], loading: false, error: null });
    }

    // Selectors
    readonly items$ = this.select((state) => state.items);
    readonly loading$ = this.select((state) => state.loading);
    readonly error$ = this.select((state) => state.error);

    // Effect to load items
    readonly loadItems = this.effect<void>((trigger$) =>
        trigger$.pipe(
            tap(() => this.patchState({ loading: true, error: null })),
            switchMap(() =>
                this.itemService.getItems().pipe(
                    tap((items) => this.patchState({ items, loading: false })),
                    catchError((error:any) => {
                        this.patchState({ error: error.message || 'Failed to load items', loading: false });
                        return of([]);
                    })
                )
            )
        )
    );
}
