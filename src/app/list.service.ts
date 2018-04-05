import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { List } from './data-model'; //import du type List et de la liste
import { Subject } from 'rxjs/Rx';

@Injectable()
export class ListService {

  public listes: List[] = [
    {
      id: 0,
      listName: "Liste 1",
      options: [
          { key: 'OPT1 de liste1', optionName: 'option1 de liste1'},
          { key: 'OPT2 de liste1', optionName: 'option2 de liste1'},
          { key: 'OPT3 de liste1', optionName: 'option3 de liste1'}
      ]
  },
  {
      id: 1,
      listName: "Liste 2",
      options: [
          { key: 'OPT1 de liste2', optionName: 'option1 de liste2'},
          { key: 'OPT2 de liste2', optionName: 'option2 de liste2'},
          { key: 'OPT3 de liste2', optionName: 'option3 de liste2'}
      ]
  },
  {
      id: 2,
      listName: "Liste 3",
      options: [
          { key: 'OPT1 de liste3', optionName: 'option1 de liste3'},
          { key: 'OPT2 de liste3', optionName: 'option2 de liste3'},
          { key: 'OPT3 de liste3', optionName: 'option3 de liste3'}
      ]
  },
  {
      id: 3,
      listName: "Liste 4",
      options: [
          { key: 'OPT1 de liste4', optionName: 'option1 de liste4'},
          { key: 'OPT2 de liste4', optionName: 'option2 de liste4'},
          { key: 'OPT3 de liste4', optionName: 'option3 de liste4'}
      ]
  }
  ]

  getLists(): Observable<List[]> {
    return of(this.listes);
  }

  // fonction d'update OU création de liste
  updateList(liste: List): Observable<List> { //liste = this.list du listViewCom
    const oldList = this.listes.find(res => res.id === liste.id); //va chercher l'id de la liste du model
    if (oldList) { //update de liste : si l'id de la liste existe, modifie 
      const newList = Object.assign(oldList, liste); // assigne les modifs à l'ancienne liste
      return of(newList);
    }
    else {
      this.listes.push(liste);
    } // création d'une nouvelle liste : si pas de liste existante, on push celle rentrée
  }
}


