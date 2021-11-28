import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAddNewComponent } from './add-new.component';

describe('AddNewComponent', () => {
  let component: AccountsAddNewComponent;
  let fixture: ComponentFixture<AccountsAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsAddNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
