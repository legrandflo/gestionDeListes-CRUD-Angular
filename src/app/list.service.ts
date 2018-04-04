import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';

import { List, lists } from './data-model'; //import du type List et de la liste

@Injectable()
export class ListService {
  
  getLists(): Observable<List[]> {
    return of(lists);
  }

  // fonction d'update OU création de liste
  updateList(liste: List): Observable<List>  { //liste = this.list du listViewCom
    const oldList = lists.find(res => res.id === liste.id); //va chercher l'id de la liste du model
    if(oldList){ //update de liste : si l'id de la liste existe, modifie 
    const newList = Object.assign(oldList, liste); // assigne les modifs à l'ancienne liste
    return of(newList);}
    else {lists.push(liste);} // création d'une nouvelle liste : si pas de liste existante, on push celle rentrée
  }
}


