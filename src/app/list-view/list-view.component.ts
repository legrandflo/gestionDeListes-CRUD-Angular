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
  nameChangeLog: string[] = [];
  //states = states;
  //optionName = optionName;

  constructor(
    private fb: FormBuilder,
    private listService: ListService) {

    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.listForm = this.fb.group({
      listName: '',
      optionName: this.fb.array([]) //secretLairs = optionName
      //power: '',
      //sidekick: ''
    });
  }

  ngOnChanges() {
    this.listForm.reset({
      listName: this.list.listName
    });
    this.setOptions(this.list.options);
  }

  get optionName(): FormArray {
    return this.listForm.get('optionName') as FormArray;
  };

  setOptions(options: Options[]) {
    const optionFGs = options.map(option => this.fb.group(option));
    const optionFormArray = this.fb.array(optionFGs);
    this.listForm.setControl('optionName', optionFormArray);
  }

  addLair() {
    console.log('optionNamede AddLair AVANT PUSH',this.optionName)
    this.optionName.push(this.fb.group(new Options()));
    console.log('optionNamede AddLair APRES PUSH',this.optionName)

    //const newOption = this.fb.control(null, Validators.required);
    //this.optionName().push(newOption)
  }

  onSubmit() {
    console.log('list Onsubmit AVANT prepareSaveList',this.list)
    this.list = this.prepareSaveList();
    console.log('list Onsubmit APRES prepareSaveList',this.list)

    this.listService.updateList(this.list).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveList(): List {
    
    const formModel = this.listForm.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Options[] = formModel.optionName.map(
      (option: Options) => Object.assign({}, option)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveList: List = {
      id: this.list.id,
      listName: formModel.listName as string,
      // addresses: formModel.secretLairs // <-- bad!
      options: secretLairsDeepCopy
    };
    return saveList;
  }

  revert() { this.ngOnChanges(); }

  logNameChange() { 
    const nameControl = this.listForm.get('listName'); // le get va chercher le nom du formControlName de listForm
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}


