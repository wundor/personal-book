import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IAccount } from '@pb/api/src/interfaces/accounts.interface';

@Injectable()
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${env.apiUrl}/accounts`);
  }

  addAccount(account: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(`${env.apiUrl}/accounts`, account);
  }
}
