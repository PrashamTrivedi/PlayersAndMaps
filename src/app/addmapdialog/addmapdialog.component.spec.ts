import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmapdialogComponent } from './addmapdialog.component';

describe('AddmapdialogComponent', () => {
  let component: AddmapdialogComponent;
  let fixture: ComponentFixture<AddmapdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmapdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmapdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
