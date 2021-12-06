import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsDetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: AccountsDetailsComponent;
  let fixture: ComponentFixture<AccountsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
