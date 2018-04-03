import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { List } from '../data-model';
import { ListService } from '../list.service';


@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: Observable<List[]>;
  isLoading = false;
  selectedList: List;

  constructor(private listService: ListService) { }

  ngOnInit() { this.getLists(); }

  getLists() {
    this.isLoading = true;
    this.lists = this.listService.getLists()
                      // Todo: error handling
                      .finally(() => this.isLoading = false);
    this.selectedList = undefined;
  }

  select(list: List) { this.selectedList = list; }
}

