import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { List, lists } from './data-model'; //import du type List et de la liste

@Injectable()
export class ListService {

  delayMs = 500;

  // Fake server get; assume nothing can go wrong
  getLists(): Observable<List[]> {
    return of(lists).delay(this.delayMs); // simulate latency with delay
  }

  // Fake server update; assume nothing can go wrong
  updateList(list: List): Observable<List>  {
    const oldList = lists.find(res => res.id === list.id);
    const newList = Object.assign(oldList, list); // Demo: mutate cached hero
    return of(newList).delay(this.delayMs); // simulate latency with delay
  }
}


