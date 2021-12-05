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
}

export interface IAccountGetLong {
  id: number;
  name: string;
  fullName: string;
  balance: number;
  lines: IJournalLineGetAccount[];
}

export const enum ACCOUNTS {
  START = 'EQUITY:Starting-Balance',
}
