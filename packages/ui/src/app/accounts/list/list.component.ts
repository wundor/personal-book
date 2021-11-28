import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { IAccount } from '@pb/lib/src';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './list.component.html',
  providers: [AccountsService, SharedService],
  styleUrls: ['./list.component.less'],
})
export class AccountsListComponent implements OnInit {
  accounts: IAccount[] = [];
  accountsList: string[] = [];

  showAccounts() {
    this.accountsService
      .getAccounts()
      .pipe(catchError(this.shared.handleError))
      .subscribe((data: IAccount[]) => {
        this.accounts = data;
        this.accountsList = this.accounts.map(function (a) {
          return a.fullName;
        });
      });
  }

  constructor(
    private accountsService: AccountsService,
    private shared: SharedService,
  ) {}

  ngOnInit(): void {
    this.showAccounts();
  }
}
