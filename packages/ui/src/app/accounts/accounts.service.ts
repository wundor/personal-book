import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IAccount } from '@pb/lib/src';

@Injectable()
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${env.apiUrl}/accounts`);
  }

  addAccount(account: IAccount): Observable<IAccount> {
    // Convert string to number before sending data to api
    // eslint-disable-next-line no-param-reassign
    // account.startingBalance = Number(account.startingBalance);
    return this.http.post<IAccount>(`${env.apiUrl}/accounts`, account);
  }
}
