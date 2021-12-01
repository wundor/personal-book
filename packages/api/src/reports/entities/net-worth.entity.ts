import { Entity, Property } from '@mikro-orm/core';
import { IsDate, IsDefined } from 'class-validator';
import { BaseEntity } from 'src/app/entities/base.entity';

@Entity()
export class NetWorthHistory extends BaseEntity {
  @IsDefined()
  @Property()
  @IsDate()
  date!: Date;

  @IsDefined()
  @Property({ columnType: 'DECIMAL(17,8)' })
  total!: number;

  @IsDefined()
  @Property({ columnType: 'DECIMAL(17,8)' })
  assets!: number;

  @IsDefined()
  @Property({ columnType: 'DECIMAL(17,8)' })
  liabilities!: number;

  constructor(date: Date, assets: number, liabilities: number) {
    super();
    this.date = date;
    this.assets = Number(assets);
    this.liabilities = Number(liabilities);
    this.total = Number(assets + liabilities);
  }
}
