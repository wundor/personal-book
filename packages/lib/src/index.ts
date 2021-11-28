export interface IAccount {
  fullName: string;
}

export interface ITransaction {
  date: Date;
  info: string;
  lines: IJournalLine[];
}

export interface IJournalLine {
  account: string;
  amount: number;
}

export const enum META {
  START = 'META:Starting-Balance',
}
