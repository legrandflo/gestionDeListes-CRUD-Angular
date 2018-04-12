import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { ListesService } from '../listes.service';
import { List } from '../data-model';
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


  constructor(private listService: ListesService,
    private modalService: NgbModal) { } //NgbModal permet d'obtenir la méthode .open pour ouvrir un modal

  ngOnInit() {
    this.get();//copie de la listes (celle du service)

  }

  // CRUD en front

  // R
  get() {
    this.lists = this.listService.getLists();
  }

  // U / Modificiation des listes
  open(elementlist?: List) { //ouvre modal avec contenu
    //stringify transforme l'objet elementlist en string
    //parse remet la string en objet
    //permet de modifier elementlist avant de l'envoyer dans selectedList pour eviter que ngModel modifie en meme temps la liste du modal et celle de la vue
    

    const modalRef = this.modalService.open(ListViewComponent);

    if(elementlist)
    {
      let copyList = JSON.parse(JSON.stringify(elementlist));
      modalRef.componentInstance.list = copyList; //list = celui du @Input dans list-view comp
    }

    modalRef.result.then((list) => {
      console.log('list', list)

      if (list) {
        if (typeof list.id !== 'undefined') {
          
          this.listService.updateList(list).subscribe();
        }
        else {
          this.listService.addList(list);
        }
      }
    }, (reason) => {
      //console.log('error',reason)
    });
  }

  // D / Effacer la liste
  delete(elementlist: List) {
    this.listService.deleteList(elementlist);
  }
}



