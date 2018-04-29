import { Component, Input, Renderer2, OnInit } from '@angular/core';
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
export class ListViewComponent implements OnInit {
  @Input() list: List; //import de listComp
  title: string;
  listForm: FormGroup;
  emptyOption: Options;

  constructor(private fb: FormBuilder,
    //private listService: ListesService,
    public activeModal: NgbActiveModal,
    private renderer: Renderer2) {    //import renderer2 pour créer le focus
    this.createForm();
  }

  ngOnInit() {
    if (this.list && (typeof this.list.id !== 'undefined')) {
      this.title = "Modification d'une liste"
    }
    else {
      this.list =
        { //initialisation d'une liste vide pour "créer une liste"
          listName: '',
          options: [{ key: '', optionName: '' }]
        };
      this.title = 'Ajouter une liste'
    }

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

  deleteOption(i){
    console.log('poubelle i', i)
    console.log('liste d options avant', this.list.options)
    this.list.options.splice(i,1);
    console.log('liste d options après delete', this.list.options)
  }

  onSubmit() {
    this.activeModal.close(this.list);//ferme la modal en envoie la liste 
  }

}


