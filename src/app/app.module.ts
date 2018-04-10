import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';

import { AppComponent }        from './app.component';
import { ListesModule } from './listes/listes.module';
import { ListViewComponent } from './listes/list-view/list-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListView2Component } from './listes/list-view-2/list-view-2.component';
import { ListView3Component } from './listes/list-view-3/list-view-3.component';



@NgModule({
  imports: [
    BrowserModule,
    ListesModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
  entryComponents :[ListViewComponent, ListView2Component, ListView3Component]
})
export class AppModule { }

