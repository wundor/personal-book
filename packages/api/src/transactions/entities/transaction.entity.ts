import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsString } from 'class-validator';
import { BaseEntity } from '../../app/entities/base.entity';
import { JournalLine } from './journal_line.entity';

@Entity()
export class Transaction extends BaseEntity {
  @OneToMany({
    entity: () => JournalLine,
    mappedBy: (line: JournalLine) => line.transaction,
  })
  @Type(() => JournalLine)
  lines = new Collection<JournalLine>(this);

  @IsDefined()
  @Property()
  @IsDate()
  @Type(() => Date)
  date!: Date;

  @Property()
  @IsString()
  info: string;

  constructor(date: Date, info: string) {
    super();
    this.date = date;
    this.info = info;
  }
}
