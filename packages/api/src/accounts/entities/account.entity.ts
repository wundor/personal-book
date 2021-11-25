import { JournalLine } from 'src/transactions/entities/journal_line.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  @OneToMany(() => JournalLine, (line) => line.accountId)
  id: number;

  @Column()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  // TODO: add tree hierarchy https://orkhan.gitbook.io/typeorm/docs/tree-entities - account name should be unique amongst all children of another account
}
