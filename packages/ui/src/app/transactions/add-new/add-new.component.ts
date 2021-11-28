import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import {
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

  validateForm!: FormGroup;

  date = null;

  listOfLines: Array<{
    id: number;
    data: IJournalLine;
  }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.listOfLines.length > 0
        ? this.listOfLines[this.listOfLines.length - 1].id + 1
        : 0;

    const line = {
      id: id,
      data: { account: 'number', amount: 123 },
    };

    const index = this.listOfLines.push(line);
    console.log(this.listOfLines[this.listOfLines.length - 1]);
    this.validateForm.addControl(
      this.listOfLines[index - 1].data.account,
      new FormControl(null, Validators.required),
    );
  }

  removeField(i: { id: number; data: IJournalLine }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfLines.length > 1) {
      const index = this.listOfLines.indexOf(i);
      this.listOfLines.splice(index, 1);
      console.log(this.listOfLines);
      this.validateForm.removeControl(i.data.account);
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
      .addTransaction(this.validateForm.value)
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
        this.validateForm.reset();
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

  constructor(
    private fb: FormBuilder,
    private transactions: TransactionsService,
    private notification: NzNotificationService,
    private accounts: AccountsService,
    private shared: SharedService,
  ) {}

  ngOnInit(): void {
    this.showAccounts();
    this.validateForm = this.fb.group({
      date: [null, [Validators.required]],
      info: [null, []],
      fullName: [null, [Validators.required]],
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
