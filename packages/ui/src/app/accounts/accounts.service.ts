import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './accounts.interface';
import { environment as env } from '../../environments/environment';

@Injectable()
export class ListService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${env.apiUrl}/accounts`);
  }
}
