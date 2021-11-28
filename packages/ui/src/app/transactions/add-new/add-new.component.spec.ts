import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAddNewComponent } from './add-new.component';

describe('AddNewComponent', () => {
  let component: TransactionsAddNewComponent;
  let fixture: ComponentFixture<TransactionsAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsAddNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
