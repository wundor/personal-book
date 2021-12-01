import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SharedService } from 'src/app/shared/shared.service';
import { IAccount } from '@pb/api/src/interfaces/accounts.interface';

@Component({
  selector: 'app-accounts-add-new',
  templateUrl: './add-new.component.html',
  providers: [AccountsService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-new.component.less'],
})
export class AccountsAddNewComponent implements OnInit {
  isOkLoading = false;
  isVisible = false;
  @Input() accountList: string[] = [];
  @Output() added: EventEmitter<IAccount> = new EventEmitter<IAccount>();
  inputValue?: string;
  filteredOptions: string[] = [];

  validateForm!: FormGroup;

  submitForm(): void {
    this.isOkLoading = true;
    this.accountsService
      .addAccount(this.validateForm.value)
      .pipe(catchError(this.shared.handleError))
      .subscribe((account: IAccount) => {
        this.added.emit({
          fullName: account.fullName,
        });
        this.notification.create(
          'success',
          'Success!',
          'Account successfully created!',
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
    private accountsService: AccountsService,
    private notification: NzNotificationService,
    private shared: SharedService,
  ) {
    this.filteredOptions = this.accountList;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      startingBalance: [
        null,
        [
          // DECIMAL(17,8) - 9 digits before the dot, 8 after
          Validators.pattern(/^(\d{1,9}|\d{1,9}\.\d{1,8})$/),
        ],
      ],
    });
  }

  onChange(value: string): void {
    if (value !== undefined && value !== null) {
      this.filteredOptions = this.accountList.filter(
        (account) => account.toLowerCase().indexOf(value.toLowerCase()) !== -1,
      );
    }
  }
}
