import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from '../listes/lists/lists.component';
import { ListesService } from './listes.service';
import { ListViewComponent } from '../listes/list-view/list-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ListsComponent,ListViewComponent
  ],
  providers : [ListesService],
  exports : [ListsComponent]
})
export class ListesModule { }
