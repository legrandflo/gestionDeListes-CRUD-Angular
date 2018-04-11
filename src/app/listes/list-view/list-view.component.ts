import { Component, Input, OnChanges, Renderer2, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ListesService } from '../listes.service';
import { List, Options } from '../data-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnChanges, OnInit {
  @Input() list: List; //import de listComp
  @Input() typeBouton: string;
  @Input() title: string;
  listForm: FormGroup;
  copyList: List = this.list; //copie de la liste importée
  emptyOption : Options;

  constructor(
    private fb: FormBuilder,
    private listService: ListesService,
    public activeModal: NgbActiveModal,
    private renderer: Renderer2) {
    this.createForm();
  }

  ngOnInit(){
    let inputElement = this.renderer.selectRootElement('#focusMe');
    inputElement.focus();

  }

  createForm() { //création du form vide
    this.listForm = this.fb.group({
      listName: '',
      optionName: this.fb.array([])
    });
  }

  setOptions(options: Options[]) { //crée un tableau d'options avec les champs remplis
    // const optionFGs = options.map(option => this.fb.group(option));
    // const optionFormArray = this.fb.array(optionFGs);
    // this.listForm.setControl('optionName', optionFormArray);
    console.log('fonction setOptions');
  }

  addOption() { // appelé au bouton "ajouter une option"
  this.emptyOption ={
      key:'',
      optionName:''
    }
    console.log('et Empty option is :', this.emptyOption)
    console.log('que fait addOptions ?', this.list.options)
    this.list.options.push({
      key: this.emptyOption.key,
      optionName: this.emptyOption.optionName
    })
    console.log('APRES push', this.list.options);

  }

  prepareSaveList(): List { //mise à jour de la liste locale / création d'une nouvelle liste
    console.log('récup name :', this.list.listName)
    console.log('récup option', this.list.options.length)
    console.log('id existant', this.list.id);
    
    let newId = 0;
    if (this) {
      newId = this.list.id;
      console.log(' t es dans le if =')
    } //list vient avec l'@Input (elem of lists) de listComp
    else {
      newId = this.listService.listes.length;
      console.log('t es dans le else');
    }
    let tabOption = [];
    for (let i = 0; i < this.list.options.length; i++) {
      tabOption.push({
        key: this.list.options[i].key,
        optionName: this.list.options[i].optionName
      })
    };
    console.log('tableau = ', tabOption);
    const saveNewList: List = {
      id: newId,
      listName: this.list.listName as string,
      options: tabOption
    };
    console.log('saveNewList =', saveNewList);
    return saveNewList;
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


