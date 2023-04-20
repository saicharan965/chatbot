import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderDialogComponent } from './calander-dialog.component';

describe('CalanderDialogComponent', () => {
  let component: CalanderDialogComponent;
  let fixture: ComponentFixture<CalanderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalanderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalanderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
