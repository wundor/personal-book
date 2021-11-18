import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  // TODO: add tree hierarchy https://orkhan.gitbook.io/typeorm/docs/tree-entities - account name should be unique amongst all children of another account
}
