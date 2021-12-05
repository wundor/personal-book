import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ITransactionCreate,
  ITransactionUpdate,
} from '@pb/api/src/interfaces/transactions.interface';

@Injectable()
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<ITransactionUpdate[]> {
    return this.http.get<ITransactionUpdate[]>(`transactions`);
  }

  addTransaction(
    transaction: ITransactionCreate,
  ): Observable<ITransactionCreate> {
    return this.http.post<ITransactionCreate>(`transactions`, transaction);
  }

  updateTransaction(
    transaction: ITransactionUpdate,
  ): Observable<ITransactionUpdate> {
    return this.http.patch<ITransactionUpdate>(
      `transactions/${transaction.id}`,
      transaction,
    );
  }
}
