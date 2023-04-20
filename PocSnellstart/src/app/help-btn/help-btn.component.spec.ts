import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBtnComponent } from './help-btn.component';

describe('HelpBtnComponent', () => {
  let component: HelpBtnComponent;
  let fixture: ComponentFixture<HelpBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
