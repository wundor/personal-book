import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccountGetLong } from '@pb/api/src/interfaces/accounts.interface';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-accounts-details',
  templateUrl: './details.component.html',
  providers: [AccountsService, ApiService],
  styleUrls: ['./details.component.less'],
})
export class AccountsDetailsComponent implements OnInit {
  account!: IAccountGetLong;

  constructor(
    private accounts: AccountsService,
    private location: Location,
    private route: ActivatedRoute,
    private shared: ApiService,
  ) {}

  getAccountDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.accounts
      .getAccountsDetails(id)
      .pipe(catchError(this.shared.handleError))
      .subscribe((account) => (this.account = account));
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getAccountDetails();
  }
}
