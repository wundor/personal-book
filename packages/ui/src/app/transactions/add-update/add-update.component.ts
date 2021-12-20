import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAccountUpdate } from '@pb/api/src/interfaces/accounts.interface';
import {
  IJournalLineCreate,
  IJournalLineUpdate,
  ITransactionCreate,
  ITransactionUpdate,
} from '@pb/api/src/interfaces/transactions.interface';
import { TransactionsService } from '../transactions.service';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-transactions-add-update',
  templateUrl: './add-update.component.html',
  providers: [TransactionsService, AccountsService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-update.component.less'],
})
export class TransactionsAddUpdateComponent implements OnInit {
  isOkLoading = false;
  isVisible = false;
  accountsList: IAccountUpdate[] = [];
  @Output() added: EventEmitter<boolean> = new EventEmitter<boolean>();
  filteredOptions: IAccountUpdate[] = [];
  // TODO: automatically create account if it's not there
  // enteredAccounts: string[] = [];
  transactionForm!: FormGroup;
  lines!: FormArray;
  inEditMode: boolean = false;

  listOfLines: Array<IJournalLineCreate> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }

    this.lines = this.transactionForm.get('lines') as FormArray;
    const newItem = this.createLine();
    this.lines.push(newItem);
  }

  removeField(i: number, e: MouseEvent): void {
    e.preventDefault();
    if (this.lines.length > 2) {
      this.lines.removeAt(i);
    }
  }

  submitForm(): void {
    this.isOkLoading = true;
    if (this.inEditMode) {
      this.transactions
        .updateTransaction(this.transactionForm.value)
        .pipe(catchError(this.shared.handleError))
        .subscribe((transaction: ITransactionCreate) => {
          this.added.emit(true);
          this.notification.create(
            'success',
            'Success!',
            'Transaction successfully updated',
          );
        });
    } else {
      this.transactions
        .addTransaction(this.transactionForm.value)
        .pipe(catchError(this.shared.handleError))
        .subscribe((transaction: ITransactionCreate) => {
          this.added.emit(true);
          this.notification.create(
            'success',
            'Success!',
            'Transaction successfully added',
          );
        });
    }
    this.transactionForm.reset();
    this.isVisible = false;
    this.isOkLoading = false;
  }

  showModal(t?: ITransactionUpdate): void {
    this.isVisible = true;
    this.accounts
      .getAccounts()
      .pipe(catchError(this.shared.handleError))
      .subscribe((data: IAccountUpdate[]) => {
        this.accountsList = data;
      });
    if (t) {
      this.inEditMode = true;
      this.generateEditForm(t);
    } else {
      this.inEditMode = false;
      this.transactionForm.reset();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createLine(data?: IJournalLineUpdate): FormGroup {
    const account = this.fb.group({
      id: data?.account.id || 0,
      fullName: data?.account.fullName || '',
    });
    return this.fb.group({
      id: data?.id || 0,
      account: account,
      amount: data?.amount || '',
    });
  }

  // TODO: maybe I should get this transaction from db by it's id and populate the form with those values
  generateEditForm(transaction: ITransactionUpdate): void {
    this.transactionForm.reset();
    this.lines.clear();
    this.transactionForm.patchValue({
      id: transaction.id,
      date: transaction.date,
      info: transaction.info,
    });
    const lines = this.transactionForm.get('lines') as FormArray;
    for (const line of transaction.lines) {
      lines.push(this.createLine(line));
    }
  }

  constructor(
    private fb: FormBuilder,
    private transactions: TransactionsService,
    private notification: NzNotificationService,
    private accounts: AccountsService,
    private shared: ApiService,
  ) {}

  ngOnInit(): void {
    const date = new Date();
    this.transactionForm = this.fb.group({
      id: 0,
      date: [date, Validators.required],
      info: '',
      lines: this.fb.array([this.createLine()]),
    });
    this.addField();
  }

  onChange(value: string, i: number): void {
    if (value !== undefined && value !== null) {
      this.filteredOptions = this.accountsList.filter(
        (account: IAccountUpdate) => {
          return (
            account.fullName.toLowerCase().indexOf(value.toLowerCase()) !== -1
          );
        },
      );
      // TODO: automatically create account if it's not there
      // this.enteredAccounts[i] = value;
    }
  }
}
