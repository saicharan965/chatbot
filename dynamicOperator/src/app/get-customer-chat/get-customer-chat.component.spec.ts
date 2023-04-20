import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCustomerChatComponent } from './get-customer-chat.component';

describe('GetCustomerChatComponent', () => {
  let component: GetCustomerChatComponent;
  let fixture: ComponentFixture<GetCustomerChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCustomerChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCustomerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
