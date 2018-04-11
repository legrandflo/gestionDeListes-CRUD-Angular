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
  emptyOption: Options;

  constructor(private fb: FormBuilder,
              private listService: ListesService,
              public activeModal: NgbActiveModal,
              private renderer: Renderer2) {    //import renderer2 pour créer le focus
      this.createForm();
  }

  ngOnInit() {
    let inputElement = this.renderer.selectRootElement('#focusMe');//recuperation de input grace a id focusMe 
    inputElement.focus();//appel de la fonction focus sur l'input
  }

  createForm() { //création du form vide
    this.listForm = this.fb.group({
      listName: '',
      optionName: this.fb.array([])
    });
  }


  addOption() { // appelé au bouton "ajouter une option"
    this.emptyOption = {
      key: '',
      optionName: ''
    }
    this.list.options.push({
      key: this.emptyOption.key,
      optionName: this.emptyOption.optionName
    })
  }

  prepareSaveList(): List { //mise à jour de la liste locale / création d'une nouvelle liste
    let newId = 0;
    if (this) {
      newId = this.list.id;
    } //list vient avec l'@Input (elem of lists) de listComp
    else {
      newId = this.listService.listes.length;
    }
    let tabOption = [];
    for (let i = 0; i < this.list.options.length; i++) {
      tabOption.push({
        key: this.list.options[i].key,
        optionName: this.list.options[i].optionName
      })
    };
    const saveNewList: List = {
      id: newId,
      listName: this.list.listName as string,
      options: tabOption
    };
    return saveNewList;
  }

  ngOnChanges() { //réinitialisation du formulaire
    this.listForm.reset({ //fait la modif en visuel : si on a modifié qqch, il le garde et l'affiche en visuel
      listName: this.list.listName
    });
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
    this.activeModal.close(); //activeModal vient de NgbModule pour utliser close et dismiss sur le modal
    //this.ngOnChanges();
  }

}


