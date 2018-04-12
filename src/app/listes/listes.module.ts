import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from '../listes/lists/lists.component';
import { ListesService } from './listes.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormlyModule, FormlyBootstrapModule} from 'ng-formly';
import { ListViewComponent } from './list-view/list-view.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
  
  ],
  declarations: [
    ListsComponent,ListViewComponent
  ],
  providers : [ListesService],
  exports : [ListsComponent],
  entryComponents :[ListViewComponent]
})
export class ListesModule { }
