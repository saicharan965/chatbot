import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerChatComponent } from './new-customer-chat.component';

describe('NewCustomerChatComponent', () => {
  let component: NewCustomerChatComponent;
  let fixture: ComponentFixture<NewCustomerChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomerChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
