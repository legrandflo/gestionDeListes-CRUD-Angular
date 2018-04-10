import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ListesService } from '../listes.service';
import { List,Options } from '../data-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'list-view',
  templateUrl: './list-view-3.component.html',
  styleUrls: ['./list-view-3.component.css']
})
export class ListView3Component /*implements OnChanges*/ {
  @Input() list: List; //import de listComp
  @Input() typeBouton: string;
  @Input() title : string;


  listForm: FormGroup;
  copyList :List = this.list; //copie de la liste importée

  constructor(
    private fb: FormBuilder,
    private listService: ListesService,
    public activeModal: NgbActiveModal) {
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
  console.log('récup name :', this.list.listName)
   console.log('récup option', this.list.options.length)
   let tabOption =[];
  for (let i=0; i < this.list.options.length; i++){
    tabOption.push({key : this.list.options[i].key,
   name: this.list.options[i].optionName })};
   console.log ('tableau = ', tabOption);
   console.log('id', this.list.id);
   let newId = 0;
   if (this.list) {
     newId = this.list.id;
   } //list vient avec l'@Input (elem of lists) de listComp
   else {
     newId = this.listService.listes.length;
   }
   const saveNewList: List = {
     id: newId,
     listName: this.list.listName as string,
     options: tabOption
   };
   console.log('saveNewList =', saveNewList);
   return saveNewList;}


  // ngOnChanges(changes) { //réinitialisation du formulaire
  //   console.log("changes = ", changes);
  //   this.listForm.reset({ //fait la modif en visuel : si on a modifié qqch, il le garde et l'affiche en visuel
  //     listName: this.list.listName
  //   });
  //   this.setOptions(this.list.options);
  // }

 // revert() { this.ngOnChanges(); } // fonction "effacer"

  onSubmit() {

    this.list = this.prepareSaveList();
    console.log('list à pusher au submit : ', this.list)
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
    this.activeModal.close(); //activeModal vient de NgbModule pour utliser close et dismiss sur le modal
    //this.ngOnChanges();
  }

}


