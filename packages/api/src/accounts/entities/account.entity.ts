import { Entity, Property, Collection, OneToMany } from '@mikro-orm/core';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/app/entities/base.entity';
import { JournalLine } from 'src/transactions/entities/journal_line.entity';

@Entity()
export class Account extends BaseEntity {
  @OneToMany(() => JournalLine, (line) => line.accountId)
  journal_lines = new Collection<JournalLine>(this);

  @Property()
  @IsString()
  @IsNotEmpty()
  name!: string;

  // type
  constructor(name: string) {
    super();
    this.name = name;
  }
  // TODO: add tree hierarchy - account name should be unique amongst all children of another account
}
