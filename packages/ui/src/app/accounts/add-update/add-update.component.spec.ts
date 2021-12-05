import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAddUpdateComponent } from './add-update.component';

describe('AddNewComponent', () => {
  let component: AccountsAddUpdateComponent;
  let fixture: ComponentFixture<AccountsAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsAddUpdateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
