import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAddUpdateComponent } from './add-update.component';

describe('AddNewComponent', () => {
  let component: TransactionsAddUpdateComponent;
  let fixture: ComponentFixture<TransactionsAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsAddUpdateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
