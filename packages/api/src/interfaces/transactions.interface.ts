import { IAccountGetShort, IAccountUpdate } from './accounts.interface';

export interface ITransactionCreate {
  date: Date;
  info: string;
  lines: IJournalLineCreate[];
}

export interface ITransactionUpdate {
  id: number;
  date: Date;
  info: string;
  lines: IJournalLineUpdate[];
}

export interface ITransactionGetShort {
  id: number;
  date: Date;
  info: string;
}

export interface ITransactionGetLong {
  id: number;
  date: Date;
  info: string;
  lines: IJournalLineUpdate[];
}

export interface IJournalLineCreate {
  account: IAccountUpdate;
  amount: number;
}

export interface IJournalLineUpdate {
  id: number;
  account: IAccountUpdate;
  amount: number;
}

export interface IJournalLineGetAccount {
  id: number;
  transaction: ITransactionGetShort;
  account: number;
  amount: number;
}

export interface IJournalLineGetTransaction {
  id: number;
  transaction: number;
  account: IAccountGetShort;
  amount: number;
}
