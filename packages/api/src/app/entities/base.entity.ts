import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { IsDate } from 'class-validator';

@Entity()
export class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  @IsDate()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @IsDate()
  updatedAt: Date = new Date();
}
