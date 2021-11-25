import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTransactionDto,
  JournalLineDto
} from './dto/create-transaction.dto';
import { JournalLine } from './entities/journal_line.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactions: Repository<Transaction>,
    @InjectRepository(JournalLine)
    private readonly journalLines: Repository<JournalLine>
  ) {}

  async create(transaction: CreateTransactionDto): Promise<Transaction> {
    const newTransaction = this.transactions.create(transaction);
    const writtenTransaction = await this.transactions.save(newTransaction);
    transaction.lines.forEach((line: JournalLineDto) => {
      this.journalLines.save({
        account_id: line.account,
        amount: line.amount,
        transaction_id: writtenTransaction.id
      });
    });
    return newTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions.find();
  }

  async findOne(id: string): Promise<Transaction> {
    try {
      const account = await this.transactions.findOneOrFail(id);
      return account;
    } catch (err) {
      throw new NotFoundException('Transaction not found');
    }
  }

  // async update(id: string, transaction: UpdateTransactionDto): Promise<Transactions> {
  //   await this.transactions.update(id, transaction);
  //   return this.findOne(id);
  // }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.transactions.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
