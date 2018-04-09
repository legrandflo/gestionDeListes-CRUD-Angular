import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListView2Component } from './list-view-2.component';

describe('ListView2Component', () => {
  let component: ListView2Component;
  let fixture: ComponentFixture<ListView2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListView2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
