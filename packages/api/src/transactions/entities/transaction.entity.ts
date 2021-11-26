import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { IsDate, IsDefined, IsString } from 'class-validator';
import { BaseEntity } from 'src/app/entities/base.entity';
import { JournalLine } from './journal_line.entity';

@Entity()
export class Transaction extends BaseEntity {
  @OneToMany(() => JournalLine, (line) => line.transactionId)
  journal_lines = new Collection<JournalLine>(this);

  @IsDefined()
  @IsDate()
  date!: Date;

  @Property()
  @IsString()
  info: string;

  //status
  constructor(date: Date, info: string) {
    super();
    this.date = date;
    this.info = info;
  }
}
