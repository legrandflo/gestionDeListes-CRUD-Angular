import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { ListesService } from '../listes.service';
import { List, Options } from '../data-model';
import { ListViewComponent } from '../list-view/list-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListView2Component } from '../list-view-2/list-view-2.component';
import { ListView3Component } from '../list-view-3/list-view-3.component';
import { element } from 'protractor';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: Observable<List[]>;
  selectedList: List;
  emptyList: List;
  options : Options;

  constructor(private listService: ListesService,
              private modalService: NgbModal) { } //NgbModal permet d'obtenir la méthode .open pour ouvrir un modal

  ngOnInit() { this.getLists();
  this.emptyList = {
    id: 0,
    listName: '' ,
    options : [{key:'', optionName :''}]
  };

  }

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

  openAdd3(element: List) { //ouvre un modal liste vide
    const emptyListSend = element;
    const modalRef = this.modalService.open(ListView3Component);
    modalRef.componentInstance.title = 'Ajouter une liste';
    modalRef.componentInstance.typeBouton = 'addListe'; 
    console.log('typeBouton passé');
    modalRef.componentInstance.list = emptyListSend;
    console.log('emptyList =', emptyListSend);
  }
  // openAdd2() { //ouvre un modal liste vide
  //   const modalRef = this.modalService.open(ListView2Component);
  //   //modalRef.componentInstance.title = 'Ajouter une liste';
  //  // modalRef.componentInstance.typeBouton = 'addListe'; 
  // }

  openSelectUpdate(elementlist: List) { //ouvre modal avec contenu
    this.selectedList = elementlist;
    const modalRef = this.modalService.open(ListViewComponent);
    modalRef.componentInstance.list = this.selectedList; //list = celui du @Input dans list-view comp
    modalRef.componentInstance.typeBouton = 'updateListe';
  }

  openSelectUpdate3(elementlist: List) { //ouvre modal avec contenu
    this.selectedList = elementlist;
    const modalRef = this.modalService.open(ListView3Component);
    modalRef.componentInstance.list = this.selectedList; //list = celui du @Input dans list-view comp
    modalRef.componentInstance.typeBouton = 'updateListe';
    modalRef.componentInstance.title = 'Modifier la liste';

  }
  // openSelectUpdate2(elementlist: List) { //ouvre modal avec contenu
  //   this.selectedList = elementlist;
  //   const modalRef = this.modalService.open(ListView2Component);
  //  // modalRef.componentInstance.list = this.selectedList;
  //   //modalRef.componentInstance.typeBouton = 'updateListe';
  // }

  delete(elementlist: List) {
    console.log("poubelle liste", elementlist);
    this.listService.deleteList(elementlist);
  }

}



