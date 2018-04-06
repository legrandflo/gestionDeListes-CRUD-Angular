import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';

import { AppComponent }        from './app.component';
import { ListesModule } from './listes/listes.module';



@NgModule({
  imports: [
    BrowserModule,
    ListesModule
  ],
  declarations: [
    AppComponent   
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

