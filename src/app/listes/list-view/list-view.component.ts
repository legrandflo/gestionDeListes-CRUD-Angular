import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ListesService } from '../listes.service';
import { List,Options } from '../data-model';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnChanges {
  @Input() list: List; //import de listComp
  @Input() showBtn: Boolean;
  @Input() typeBouton: string;


  listForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private listService: ListesService) {
    this.createForm();
  }


  createForm() { //création du form vide
    this.listForm = this.fb.group({
      listName: '',
      optionName: this.fb.array([])
    });
  }

  optionName(): FormArray { //initialisation de optionName en formArray
    return this.listForm.get('optionName') as FormArray;
  };

  setOptions(options: Options[]) { //crée un tableau d'options avec les champs remplis
    const optionFGs = options.map(option => this.fb.group(option));
    const optionFormArray = this.fb.array(optionFGs);
    this.listForm.setControl('optionName', optionFormArray);
  }

  addOption() { // appelé au bouton "ajouter une option"
    this.optionName().push(this.fb.group(new Options()));
  }

  prepareSaveList(): List { //mise à jour de la liste locale / création d'une nouvelle liste
    const formModel = this.listForm.value;
    let newId = 0;
    if (this.list) {
      newId = this.list.id;
    } //list vient avec l'@Input (elem of lists) de listComp
    else {
      newId = this.listService.listes.length;
    } //length = longueur de la liste qui est dans le model
    const optionCopy: Options[] = formModel.optionName.map(
      (option: Options) => Object.assign({}, option)
    );
    const saveList: List = {
      id: newId,
      listName: formModel.listName as string,
      options: optionCopy
    };
    return saveList;
  }

  ngOnChanges() { //réinitialisation du formulaire
    this.listForm.reset({ //fait la modif en visuel : si on a modifié qqch, il le garde et l'affiche en visuel
      listName: this.list.listName
    });
    this.setOptions(this.list.options);
  }

  revert() { this.ngOnChanges(); } // fonction "effacer"

  onSubmit() {
    this.list = this.prepareSaveList();
    if (this.typeBouton == "addListe") {
      this.listService.addList(this.list); // mise à jour de la liste dans le service (BDD)
      this.listForm = this.fb.group({
        listName: '',
        optionName: this.fb.array([])
      });
    }
    else if (this.typeBouton == "updateListe") {
      this.listService.updateList(this.list).subscribe(); // mise à jour de la liste dans le service (BDD)
    }
    //this.ngOnChanges();
  }

}


