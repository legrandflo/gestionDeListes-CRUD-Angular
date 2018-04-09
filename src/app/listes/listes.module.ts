import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from '../listes/lists/lists.component';
import { ListesService } from './listes.service';
import { ListViewComponent } from '../listes/list-view/list-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListView2Component } from './list-view-2/list-view-2.component';
import {FormlyModule, FormlyBootstrapModule} from 'ng-formly';

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
    ListsComponent,ListViewComponent, ListView2Component
  ],
  providers : [ListesService],
  exports : [ListsComponent]
})
export class ListesModule { }
