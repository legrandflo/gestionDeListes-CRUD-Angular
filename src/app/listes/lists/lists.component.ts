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

  // U / Modification et creation des listes
  open(elementlist?: List) { 
    //stringify transforme l'objet elementlist en string
    //parse remet la string en objet
    //permet de modifier elementlist avant de l'envoyer dans selectedList pour eviter que ngModel modifie en meme temps la liste du modal et celle de la vue
    
    //ouverture du modal avec composant ListViewComponent
    const modalRef = this.modalService.open(ListViewComponent);
    //si ya elemenlist en parametre (donner dans lists.html)alors on lui envoie une copie de la liste (CAS update)
    if (elementlist) {
      let copyList = JSON.parse(JSON.stringify(elementlist));
      modalRef.componentInstance.list = copyList; //on envoie copylist dans input list de listView
    }
    //cette promise attend le close de activeModal du listviewComponent
    modalRef.result.then((reslist) => {//reslist est le parametre du close listviewComponent
      console.log('list', reslist)
      if (reslist) {
        if (typeof reslist.id !== 'undefined') {//verifie si le type id existe dans la liste recu
          this.listService.updateList(reslist).subscribe();
        }
        else {
          this.listService.addList(reslist);
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



