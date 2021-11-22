import { IsDefined } from 'class-validator';
import { Accounts } from 'src/accounts/entities/accounts.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Transactions } from './transactions.entity';

@Entity()
export class JournalLines {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @ManyToOne(() => Transactions, transaction => transaction.id)
  @JoinColumn({ name: "transaction_id" })
  @Column()
  transaction_id: number;
  
  @IsDefined()
  @ManyToOne(() => Accounts, account => account.id)
  @JoinColumn({ name: "account_id" })
  @Column()
  account_id: number;
  
  @IsDefined()
  @Column("decimal", { precision: 17, scale: 8 })
  amount: number;

  constructor() {
    // this.timestamp = new Date().toISOString();
  }
}
