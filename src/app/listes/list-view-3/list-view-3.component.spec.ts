import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListView3Component } from './list-view-3.component';

describe('ListView3Component', () => {
  let component: ListView3Component;
  let fixture: ComponentFixture<ListView3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListView3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
