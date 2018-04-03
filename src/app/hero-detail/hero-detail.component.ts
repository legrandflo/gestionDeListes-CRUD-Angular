import { Component, Input, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Options, List } from '../data-model';

import { ListService } from '../list.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnChanges {
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
      optionName: this.fb.array([]), //secretLairs = optionName
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

  /*get*/ optionName(): FormArray {
    return this.listForm.get('optionName') as FormArray;
  };

  setOptions(options: Options[]) {
    const optionFGs = options.map(option => this.fb.group(option));
    const optionFormArray = this.fb.array(optionFGs);
    this.listForm.setControl('optionName', optionFormArray);
  }

  addLair() {
    this.optionName().push(this.fb.group(new Option()));
    //const newOption = this.fb.control(null, Validators.required);
    //this.optionName().push(newOption)
  }

  onSubmit() {
    this.list = this.prepareSaveList();
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


