import {
  Entity,
  Property,
  Collection,
  OneToMany,
  Unique,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from '../../app/entities/base.entity';
import { JournalLine } from '../../transactions/entities/journal_line.entity';

@Entity()
export class Account extends BaseEntity {
  @Exclude()
  @OneToMany({
    entity: () => JournalLine,
    mappedBy: (line: JournalLine) => line.account,
    hidden: true,
  })
  journal_lines = new Collection<JournalLine>(this);

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

  constructor(name: string) {
    super();
    this.name = name;
    this.fullName = name;
  }
}
