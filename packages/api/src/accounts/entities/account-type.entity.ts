import {
  Entity,
  Property,
  Collection,
  OneToMany,
  Unique,
} from '@mikro-orm/core';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from '../../app/entities/base.entity';
import { JournalLine } from '../../transactions/entities/journal_line.entity';

@Entity()
export class AccountType extends BaseEntity {
  @OneToMany(() => JournalLine, (line) => line.account)
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

  // type
  constructor(name: string) {
    super();
    this.name = name;
    this.fullName = name;
  }
  // TODO: add tree hierarchy - account name should be unique amongst all children of another account
}
