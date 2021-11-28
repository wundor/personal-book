import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { IsDefined, IsNumber } from 'class-validator';
import { Account } from '../../accounts/entities/account.entity';
import { BaseEntity } from '../..//app/entities/base.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class JournalLine extends BaseEntity {
  @IsDefined()
  @ManyToOne({ entity: () => Transaction })
  @IsNumber()
  transaction!: Transaction;

  @IsDefined()
  @ManyToOne({ entity: () => Account })
  @IsNumber()
  account!: Account;

  @IsDefined()
  @Property({ columnType: 'DECIMAL(17,8)' })
  amount!: number;

  constructor(account: Account, amount: number) {
    super();
    this.amount = amount;
    this.account = account;
  }
}
