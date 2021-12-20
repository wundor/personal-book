import {
  Entity,
  Property,
  Collection,
  OneToMany,
  Unique,
} from '@mikro-orm/core';
import {} from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IAccountGetShort } from 'src/interfaces/accounts.interface';
import { BaseEntity } from '../../app/entities/base.entity';
import { JournalLine } from '../../transactions/entities/journal_line.entity';

@Entity()
export class Account extends BaseEntity implements IAccountGetShort {
  @OneToMany({
    entity: () => JournalLine,
    mappedBy: (line: JournalLine) => line.account,
    orphanRemoval: true,
  })
  lines = new Collection<JournalLine>(this);

  @Property()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Property()
  @IsString()
  @IsNotEmpty()
  @Unique()
  fullName!: string;

  @Property({ persist: false })
  balance?: number;

  @Property({ persist: false })
  children: Account[];

  constructor(fullName: string) {
    super();
    if (fullName) {
      this.fullName = fullName;
      this.name = fullName.split(':')[fullName.split(':').length - 1];
    }
  }

  /**
   * Computes the account balance from it's journal lines
   */
  computeBalance(): Account {
    let balance = 0;
    for (const line of this.lines) {
      balance += Number(line.amount);
    }
    this.balance = balance;
    return this;
  }
}
