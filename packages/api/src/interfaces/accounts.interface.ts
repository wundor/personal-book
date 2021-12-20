import { IJournalLineGetAccount } from './transactions.interface';

export interface IAccountCreate {
  fullName: string;
}

export interface IAccountUpdate {
  id: number;
  fullName: string;
}

export interface IAccountGetShort {
  id: number;
  name: string;
  fullName: string;
  children?: IAccountGetShort[];
}

export interface IAccountGetLong {
  id: number;
  name: string;
  fullName: string;
  balance: number;
  lines: IJournalLineGetAccount[];
  children?: IAccountGetLong[];
}

export enum TYPES {
  ASSETS = 'ASSETS',
  EXPENSES = 'EXPENSES',
  INCOME = 'INCOME',
  EQUITY = 'EQUITY',
  LIABILITIES = 'LIABILITIES',
}

export const enum ACCOUNTS {
  START = 'EQUITY:Starting-Balance',
}
