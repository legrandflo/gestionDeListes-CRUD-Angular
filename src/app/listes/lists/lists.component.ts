import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { ListesService } from '../listes.service';
import { List, Options } from '../data-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { ListViewComponent } from '../list-view/list-view.component';

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

  ngOnInit() { 
    this.getLists();//copie de la listes (celle du service)
  this.emptyList = { //initialisation d'une liste vide pour "créer une liste"
    id: this.listService.listes.length, //pour partir du dernier id existant dans la liste du service
    listName: '' ,
    options : [{key:'', optionName :''}]
  };

  }

  // CRUD en front

  // R
  getLists() {
    this.lists = this.listService.getLists();
    this.selectedList = undefined;
  }

  // C / Création de liste 
  openAdd(element: List) { //ouvre un modal liste vide
    const emptyListSend = element;
    const modalRef = this.modalService.open(ListViewComponent);
    modalRef.componentInstance.title = 'Ajouter une liste';
    modalRef.componentInstance.typeBouton = 'addListe'; 
    modalRef.componentInstance.list = emptyListSend;
    this.emptyList = { //pour vider les champs pour la création d'une liste après
      id: this.listService.listes.length+1, //+1 pour incrémenter les id des nouvelles listes créées
      listName: '' ,
      options : [{key:'', optionName :''}]
    };
  }

  // U / Modificiation des listes
  openSelectUpdate(elementlist: List) { //ouvre modal avec contenu
    //stringify transforme l'objet elementlist en string
    //parse remet la string en objet
    //permet de modifier elementlist avant de l'envoyer dans selectedList pour eviter que ngModel modifie en meme temps la liste du modal et celle de la vue
    this.selectedList = JSON.parse(JSON.stringify(elementlist));
    const modalRef = this.modalService.open(ListViewComponent);
    modalRef.componentInstance.list = this.selectedList; //list = celui du @Input dans list-view comp
    modalRef.componentInstance.typeBouton = 'updateListe';
    modalRef.componentInstance.title = 'Modifier la liste';
  }

  // D / Effacer la liste
  delete(elementlist: List) {
    this.listService.deleteList(elementlist);
  }
}



