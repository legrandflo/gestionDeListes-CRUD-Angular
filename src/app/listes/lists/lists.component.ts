import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { ListesService } from '../listes.service';
import { List } from '../data-model';
import { ListViewComponent } from '../list-view/list-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: Observable<List[]>;
  selectedList: List;

  constructor(private listService: ListesService,
              private modalService: NgbModal) { } //NgbModal permet d'obtenir la méthode .open pour ouvrir un modal

  ngOnInit() { this.getLists(); }

  getLists() {
    //this.isLoading = true;
    this.lists = this.listService.getLists()
    this.selectedList = undefined;
  }

  openAdd() { //ouvre un modal liste vide
    const modalRef = this.modalService.open(ListViewComponent);
    modalRef.componentInstance.title = 'Ajouter une liste';
    modalRef.componentInstance.typeBouton = 'addListe'; 
  }

  openSelectUpdate(elementlist: List) { //ouvre modal avec contenu
    this.selectedList = elementlist;
    const modalRef = this.modalService.open(ListViewComponent);
    modalRef.componentInstance.list = this.selectedList;
    modalRef.componentInstance.typeBouton = 'updateListe';
  }

  delete(elementlist: List) {
    console.log("poubelle liste", elementlist);
    this.listService.deleteList(elementlist);
  }

}



