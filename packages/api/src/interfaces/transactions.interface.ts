import { IAccount } from './accounts.interface';

export interface ITransaction {
  id: number;
  date: Date;
  info: string;
  lines: IJournalLine[];
}

export interface IJournalLine {
  account: IAccount;
  accountName: string;
  amount: number;
}
