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
      console.log(fullName);
      this.name = fullName.split(':')[fullName.split(':').length - 1];
    }
  }
}
