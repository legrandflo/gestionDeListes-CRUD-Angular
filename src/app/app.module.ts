import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { AppComponent }        from './app.component';
import { ListService } from './list.service';
import { ListsComponent } from './lists/lists.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,// <-- #2 add to @NgModule imports
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,ListsComponent
    ,ListViewComponent
    
  ],
  exports: [ // export for the DemoModule
    AppComponent,ListsComponent
    ,ListViewComponent
    
  ],
  providers: [ ListService ], // <-- #4 provide HeroService
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/