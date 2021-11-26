import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IsDefined, IsNumber } from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';
import { BaseEntity } from 'src/app/entities/base.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class JournalLine extends BaseEntity {
  @IsDefined()
  @ManyToOne()
  @IsNumber()
  transactionId!: Transaction;

  @IsDefined()
  @ManyToOne()
  @IsNumber()
  accountId!: Account;

  @IsDefined()
  @Property({ columnType: 'DECIMAL(17,8)' })
  amount!: number;

  constructor(amount: number) {
    super();
    this.amount = amount;
  }
}
