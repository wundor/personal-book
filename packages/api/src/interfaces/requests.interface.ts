export interface IQuery {
  period: string;
}

// I get circular dependency if I import all period as object
export const PERIOD_MONTH = 'month';
export const PERIOD_ALL = 'all';
