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
import { IAccount, IJournalLine, ITransaction } from '@pb/lib/src';
import { TransactionsService } from '../transactions.service';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-transactions-add-new',
  templateUrl: './add-new.component.html',
  providers: [TransactionsService, AccountsService, SharedService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-new.component.less'],
})
export class TransactionsAddNewComponent implements OnInit {
  isOkLoading = false;
  isVisible = false;
  accountsList: string[] = [];
  @Output() added: EventEmitter<IAccount> = new EventEmitter<IAccount>();
  inputValue?: string;
  filteredOptions: string[] = [];
  linesForm!: FormGroup;
  lines!: FormArray;

  date = null;

  listOfLines: Array<{
    account: string;
    amount: string;
  }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }

    this.lines = this.linesForm.get('lines') as FormArray;
    const newItem = this.createItem();
    this.lines.push(newItem);
    newItem.addControl('account', new FormControl(null, Validators.required));
    newItem.addControl('amount', new FormControl(null, Validators.required));
  }

  removeField(i: { account: string; amount: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfLines.length > 1) {
      const index = this.listOfLines.indexOf(i);
      this.listOfLines.splice(index, 1);
      console.log(this.listOfLines);
      this.linesForm.removeControl(i.account);
      this.linesForm.removeControl(i.amount);
    }
  }

  showAccounts() {
    this.accounts
      .getAccounts()
      .pipe(catchError(this.shared.handleError))
      .subscribe((data: IAccount[]) => {
        this.accountsList = data.map(function (a) {
          console.log(a);
          return a.fullName;
        });
      });
  }

  submitForm(): void {
    this.isOkLoading = true;
    this.transactions
      .addTransaction(this.linesForm.value)
      .pipe(catchError(this.shared.handleError))
      .subscribe((account: ITransaction) => {
        // this.added.emit({
        //   fullName: account.fullName,
        // });
        this.notification.create(
          'success',
          'Success!',
          'Account was added successfully',
        );
        this.linesForm.reset();
        this.isVisible = false;
      });
    this.isOkLoading = false;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createItem(): FormGroup {
    return this.fb.group({
      account: '',
      amount: '',
    });
  }

  constructor(
    private fb: FormBuilder,
    private transactions: TransactionsService,
    private notification: NzNotificationService,
    private accounts: AccountsService,
    private shared: SharedService,
  ) {}

  ngOnInit(): void {
    this.showAccounts();
    this.linesForm = this.fb.group({
      date: '',
      info: '',
      lines: this.fb.array([this.createItem()]),
    });
    this.addField();
  }

  onChange(value: string): void {
    if (value !== undefined && value !== null) {
      this.filteredOptions = this.accountsList.filter(
        (account) => account.toLowerCase().indexOf(value.toLowerCase()) !== -1,
      );
    }
  }
}
