import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBtnsComponent } from './nav-btns.component';

describe('NavBtnsComponent', () => {
  let component: NavBtnsComponent;
  let fixture: ComponentFixture<NavBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBtnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
