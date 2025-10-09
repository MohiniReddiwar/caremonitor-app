import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ListStore } from './list.store';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../services/item';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {
  items$!: Observable<Item[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private listStore: ListStore) {}

  ngOnInit() {
    this.items$ = this.listStore.items$;
    this.loading$ = this.listStore.loading$;
    this.error$ = this.listStore.error$;

    this.listStore.loadItems();
  }
}
