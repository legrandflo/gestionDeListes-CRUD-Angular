import { Component, Input, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Options, List } from '../data-model';

import { ListService } from '../list.service';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnChanges {
  @Input() list: List;

  listForm: FormGroup;
  nameChangeList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private listService: ListService) {

    this.createForm();
    this.listNameChange();
  }

  createForm() {
    this.listForm = this.fb.group({
      listName: '',
      optionName: this.fb.array([]) 
    });
  }

  listNameChange() { //changement du nom de la liste
    const nameControl = this.listForm.get('listName'); // le get va chercher le nom du formControlName de listForm
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeList.push(value)
    );
  }

  get optionName(): FormArray { //initialisation de optionName en formArray
    return this.listForm.get('optionName') as FormArray;
  };

  setOptions(options: Options[]) { //crée un tableau d'options avec les champs remplis
    const optionFGs = options.map(option => this.fb.group(option));
    const optionFormArray = this.fb.array(optionFGs);
    this.listForm.setControl('optionName', optionFormArray);
  }

  addOption() { // appelé au bouton "ajouter une option"
    this.optionName.push(this.fb.group(new Options()));
  }

  prepareSaveList(): List { //mise à jour de la liste locale
    const formModel = this.listForm.value;
    const optionCopy: Options[] = formModel.optionName.map(
      (option: Options) => Object.assign({}, option)
    );
    const saveList: List = {
      id: this.list.id,
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

  revert() { this.ngOnChanges(); } // fonction "supprimer"

  onSubmit() {
    this.list = this.prepareSaveList();
    this.listService.updateList(this.list).subscribe(); // mise à jour de la liste dans le service (BDD)
    this.ngOnChanges();
  }

}


