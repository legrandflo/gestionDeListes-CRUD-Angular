import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { ListesService } from '../listes.service';
import { List } from '../data-model';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: Observable<List[]>;
  showBtn: Boolean; //bouton retour modal
  selectedList: List;

  constructor(private listService: ListesService) { }

  ngOnInit() { this.getLists(); }

  getLists() {
    //this.isLoading = true;
    this.lists = this.listService.getLists()
    this.selectedList = undefined;
  }

  select(list: List) {
    this.selectedList = list;
  }
  delete(list: List) {
    console.log("poubelle liste", list);
    this.listService.deleteList(list);
  }
}


