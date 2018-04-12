import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysComponent } from './surveys.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SurveysComponent],
  exports: [SurveysComponent]
})
export class SurveysModule { }
