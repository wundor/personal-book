import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { IsDate, IsDefined, IsString } from 'class-validator';
import { BaseEntity } from '../../app/entities/base.entity';
import { JournalLine } from './journal_line.entity';

@Entity()
export class Transaction extends BaseEntity {
  @OneToMany({
    entity: () => JournalLine,
    mappedBy: (line: JournalLine) => line.transaction,
    hidden: true,
  })
  journal_lines = new Collection<JournalLine>(this);

  @IsDefined()
  @Property()
  @IsDate()
  date!: Date;

  @Property()
  @IsString()
  info: string;

  @Property({ persist: false })
  lines?: {
    account: string;
    amount: number;
  }[];

  constructor(date: Date, info: string) {
    super();
    this.date = date;
    this.info = info;
  }
}
