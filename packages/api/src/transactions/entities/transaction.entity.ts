import { IsDefined } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { JournalLine } from './journal_line.entity';

@Entity()
export class Transaction {
  @OneToMany(() => JournalLine, (line) => line.transactionId)
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
