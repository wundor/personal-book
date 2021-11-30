import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { IsDate } from 'class-validator';

@Entity()
export class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ hidden: true })
  @IsDate()
  createdAt: Date = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  @IsDate()
  updatedAt: Date = new Date();
}
