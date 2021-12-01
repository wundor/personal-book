import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ITransaction } from '@pb/api/src/interfaces/transactions.interface';

@Injectable()
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(`${env.apiUrl}/transactions`);
  }

  addTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(
      `${env.apiUrl}/transactions`,
      transaction,
    );
  }
}
