import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivePlayerDialogComponent } from './inactive-player-dialog.component';

describe('InactivePlayerDialogComponent', () => {
  let component: InactivePlayerDialogComponent;
  let fixture: ComponentFixture<InactivePlayerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactivePlayerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivePlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
