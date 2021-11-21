import { JournalLines } from 'src/transactions/entities/journal_lines.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  @OneToMany(() => JournalLines, line => line.account_id)
  id: number;

  @Column()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  // TODO: add tree hierarchy https://orkhan.gitbook.io/typeorm/docs/tree-entities - account name should be unique amongst all children of another account
}
