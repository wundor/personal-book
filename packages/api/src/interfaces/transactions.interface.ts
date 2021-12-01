export interface ITransaction {
  date: Date;
  info: string;
  lines: IJournalLine[];
}

export interface IJournalLine {
  account: string;
  amount: number;
}
