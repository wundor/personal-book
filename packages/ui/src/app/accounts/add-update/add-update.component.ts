import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/app/shared/api.service';
import {
  IAccountGetShort,
  IAccountUpdate,
} from '@pb/api/src/interfaces/accounts.interface';

@Component({
  selector: 'app-accounts-add-update',
  templateUrl: './add-update.component.html',
  providers: [AccountsService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-update.component.less'],
})
export class AccountsAddUpdateComponent implements OnInit {
  isOkLoading = false;
  isVisible = false;
  accountList: IAccountGetShort[] = [];
  @Output() added: EventEmitter<boolean> = new EventEmitter<boolean>();
  inputValue?: string;
  filteredOptions: IAccountGetShort[] = [];
  inEditMode: boolean = false;
  accountForm!: FormGroup;

  submitForm(): void {
    this.isOkLoading = true;
    if (this.inEditMode) {
      this.accounts
        .updateAccount(this.accountForm.value)
        .pipe(catchError(this.shared.handleError))
        .subscribe(() => {
          this.added.emit(true);
          this.notification.create(
            'success',
            'Success!',
            'Account successfully updated',
          );
        });
    } else {
      this.accounts
        .addAccount(this.accountForm.value)
        .pipe(catchError(this.shared.handleError))
        .subscribe(() => {
          this.added.emit(true);
          this.notification.create(
            'success',
            'Success!',
            'Account successfully created',
          );
        });
    }
    this.accountForm.reset();
    this.isVisible = false;
    this.isOkLoading = false;
  }

  showModal(a?: IAccountUpdate): void {
    this.accounts
      .getAccounts()
      .pipe(catchError(this.shared.handleError))
      .subscribe((data: IAccountGetShort[]) => {
        this.accountList = data;
      });
    if (a) {
      this.inEditMode = true;
      this.prefillForm(a);
    } else {
      this.inEditMode = false;
      this.accountForm.reset();
    }
    this.isVisible = true;
  }

  prefillForm(account: IAccountUpdate): void {
    this.accountForm.reset();
    this.accountForm.patchValue({
      id: account.id,
      fullName: account.fullName,
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(
    private fb: FormBuilder,
    private accounts: AccountsService,
    private notification: NzNotificationService,
    private shared: ApiService,
  ) {
    this.filteredOptions = this.accountList;
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      id: [null],
      fullName: [null, [Validators.required]],
      // TODO: not used for now, will do if I need to create account with initial transaction
      // startingBalance: [
      //   null,
      //   [
      //     // DECIMAL(17,8) - 9 digits before the dot, 8 after
      //     Validators.pattern(/^(\d{1,9}|\d{1,9}\.\d{1,8})$/),
      //   ],
      // ],
    });
  }

  onChange(value: string): void {
    if (value !== undefined && value !== null) {
      this.filteredOptions = this.accountList.filter(
        (account: IAccountUpdate) => {
          return (
            account.fullName.toLowerCase().indexOf(value.toLowerCase()) !== -1
          );
        },
      );
    }
  }
}
