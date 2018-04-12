import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Subject } from 'rxjs/Rx';
import { List } from './data-model';

@Injectable()
export class ListesService {

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

 // fonction d'update de liste existante
 updateList(liste: List): Observable<List> { //liste = this.list du listViewCom
  const oldList = this.listes.find(res => res.id === liste.id); //va chercher l'id de la liste du model
    const newList = Object.assign(oldList, liste); // assigne les modifs à l'ancienne liste
    return of(newList);
}
//fonction de création de liste d'options dans la listes
  addList(liste: List){

    liste.id = this.listes[this.listes.length-1].id + 1

    this.listes.push(liste);
  }

  //supprime une liste d'options dans listes
  deleteList(liste:List){    
    //result.id avec id propriete du tableau listes et liste.id valeur de id dans la liste qui est en parametre
    //NewIndexOfListe index de la liste dans le tableau d'objets different de id de la liste
    let NewIndexOfListe = this.listes.findIndex(result => result.id === liste.id); 
    this.listes.splice(NewIndexOfListe,1);//supprime 1 element a la position NewIndexOfListe
  }
}


