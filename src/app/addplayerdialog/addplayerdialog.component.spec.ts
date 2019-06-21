import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplayerdialogComponent } from './addplayerdialog.component';

describe('AddplayerdialogComponent', () => {
  let component: AddplayerdialogComponent;
  let fixture: ComponentFixture<AddplayerdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplayerdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplayerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
