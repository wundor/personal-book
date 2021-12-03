import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { IAccount } from '@pb/api/src/interfaces/accounts.interface';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './list.component.html',
  providers: [AccountsService, ApiService],
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
    private shared: ApiService,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.showAccounts();
    this.title.setTitle('Accounts');
  }
}
