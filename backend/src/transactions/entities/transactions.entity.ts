import { IsDefined } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { JournalLines } from './journal_lines.entity';

@Entity()
export class Transactions {
  @OneToMany(() => JournalLines, line => line.transaction_id)
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @Column()
  timestamp: string;
  
  @Column()
  info: string;

  constructor() {
    this.timestamp = new Date().toISOString();
  }
}
