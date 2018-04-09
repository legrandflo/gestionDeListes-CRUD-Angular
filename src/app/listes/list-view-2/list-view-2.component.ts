import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { List } from '../data-model';

@Component({
  selector: 'list-view-2',
  templateUrl: './list-view-2.component.html',
  styleUrls: ['./list-view-2.component.css']
})
export class ListView2Component {
  @Input() list: List;
  //nom  = this.list.listName;

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    
    {
      className: 'row',
      fieldGroup: [
        {
          className: 'col-md-12',
          key: 'liste F** 1',
          type: 'input',
         defaultValue:'liste1',
          templateOptions: {
            type: 'text',
            label: ' liste1',
            placeholder: 'F** Liste 1'
          },
          validators: {
          //  validation: Validators.compose([Validators.required, ValidationService.emailValidator])
          }
        },
        {
          className: 'col-md-12',
          fieldGroup: [
                  {
                    className: 'col-md-12',
                    key: 'opt 1 L 1',
                    type: 'input',
                    defaultValue : "option 1 L1",
                    templateOptions: {
                      type: 'text',
                      label: 'option1',
                      placeholder: 'F*** option 1 liste 1'
                    },
                    validators: {
                     // validation: Validators.compose([Validators.required, ValidationService.emailValidator])
                    }
                  },
                  {
                    className: 'col-md-12',
                    key: 'opt 2 L 2',
                    type: 'input',
                    defaultValue : "option 2 L1",
                    templateOptions: {
                      type: 'text',
                      label: 'option2',
                      placeholder: 'F*** option 2 liste 1'
                    },
                    validators: {
                    //  validation: Validators.compose([Validators.required, ValidationService.emailValidator])
                    }
                  }
          ]
        }
      ]
    },
    
    {
      className: 'row',
      fieldGroup: [
        {
          className: 'col-md-12',
          key: 'F** L 2',
          type: 'input',
          defaultValue : "F** Liste 2",
          templateOptions: {
            type: 'text',
            label: ' liste2',
            placeholder: 'F**** Liste 2',
            //value:'coucou'
          },
          validators: {
           // validation: Validators.compose([Validators.required, ValidationService.emailValidator])
          }
        },
        {
          className: 'col-md-12',
          fieldGroup: [
                  {
                    className: 'col-md-12',
                    key: 'opt 1 L 2',
                    type: 'input',
                    defaultValue : "option 1 L2",
                    templateOptions: {
                      type: 'text',
                      label: 'option1',
                      placeholder: 'F**** option 1 liste 2'
                    },
                    validators: {
                    //  validation: Validators.compose([Validators.required, ValidationService.emailValidator])
                    }
                  },
                  {
                    className: 'col-md-12',
                    key: 'opt 2 L 2',
                    type: 'input',
                    defaultValue : "option 2 L2",
                    templateOptions: {
                      type: 'text',
                      label: 'option2',
                      placeholder: 'F**** option 2 liste 2'
                    },
                    validators: {
                     // validation: Validators.compose([Validators.required, ValidationService.emailValidator])
                    }
                  }
          ]
        }
      ]
    }
    
  ];
    
    
    
    
    
    
    
    
    
    
    /*{
      className: "Personal Info",
      type: "input",
      templateOptions: {
        defaultValue: "bidule machin chose"
      },
      fieldGroup: [
        {
          type: "input",
          templateOptions: {
            label: "F*** Liste 1"
          }},

        {
          "className": "flex-1",
          "fieldGroup": [{
            "type": "input",
            "key": "lastName",
            "templateOptions": {
              "label": "F**** option 1 liste 1"
            }}]
          },

          {
            "className": "flex-1",
            fieldGroup: [{
              "type": "input",
              "key": "lastName",
              "templateOptions": {
                "label": "F**** option 2 liste 1"
              }
            }]},

    }]*/

            

 
 
  user = {
              // email: 'email@gmail.com',
             // checked: false
            };

            submit(user) {
              console.log(user);
            }
            /* constructor() { }
           
             ngOnInit() {
             }*/

          }
