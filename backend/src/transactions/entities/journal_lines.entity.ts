import { Accounts } from 'src/accounts/entities/accounts.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Transactions } from './transactions.entity';

@Entity()
export class JournalLines {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => Transactions, transaction => transaction.id)
  transaction_id: number;
  
  @Column()
  @ManyToOne(() => Accounts, account => account.id)
  account_id: number;
  
  @Column("decimal", { precision: 17, scale: 8 })
  debit: number;

  @Column("decimal", { precision: 17, scale: 8 })
  credit: number;

  @Column("decimal", { precision: 17, scale: 8 })
  balance: number;

  constructor() {
    // this.timestamp = new Date().toISOString();
  }
}
