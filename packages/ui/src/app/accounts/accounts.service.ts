import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAccountCreate,
  IAccountGetLong,
  IAccountGetShort,
  IAccountUpdate,
} from '@pb/api/src/interfaces/accounts.interface';

@Injectable()
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<IAccountGetShort[]> {
    return this.http.get<IAccountGetShort[]>(`accounts`);
  }

  getAccountTree(): Observable<IAccountGetLong[]> {
    return this.http.get<IAccountGetLong[]>(`accounts/tree`);
  }

  getAccountsDetails(id: number): Observable<IAccountGetLong> {
    return this.http.get<IAccountGetLong>(`accounts/${id}`);
  }

  addAccount(account: IAccountCreate): Observable<IAccountCreate> {
    return this.http.post<IAccountCreate>(`accounts`, account);
  }

  updateAccount(account: IAccountUpdate): Observable<IAccountUpdate> {
    return this.http.patch<IAccountUpdate>(`accounts/${account.id}`, account);
  }
}
