import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timestamp: string;

  constructor() {
    this.timestamp = new Date().toISOString();
  }
}
