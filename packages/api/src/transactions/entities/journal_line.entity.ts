import { IsDefined } from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class JournalLine {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @ManyToOne(() => Transaction, (transaction) => transaction.id)
  @Column()
  transactionId: number;

  @IsDefined()
  @ManyToOne(() => Account, (account) => account.id)
  @Column()
  accountId: number;

  @IsDefined()
  @Column('decimal', { precision: 17, scale: 8 })
  amount: number;

  constructor() {
    // this.timestamp = new Date().toISOString();
  }
}
