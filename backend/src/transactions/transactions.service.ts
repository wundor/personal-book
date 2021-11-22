import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto, JournalLineDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JournalLines } from './entities/journal_lines.entity';
import { Transactions } from './entities/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactions: Repository<Transactions>,
    @InjectRepository(JournalLines)
    private readonly journalLines: Repository<JournalLines>,
  ) {}

  async create(transaction: CreateTransactionDto): Promise<Transactions> {
    const newTransaction = this.transactions.create(transaction);
    const writtenTransaction = await this.transactions.save(newTransaction);
    transaction.lines.forEach((line: JournalLineDto) => {
      this.journalLines.save({
        account_id: line.account,
        amount: line.amount,
        transaction_id: writtenTransaction.id,
      })
    })
    return newTransaction;
  }

  async findAll(): Promise<Transactions[]> {
    return this.transactions.find();
  }

  async findOne(id: string): Promise<Transactions> {
    try {
      const account = await this.transactions.findOneOrFail(id);
      return account;
    } catch (err) {
      throw new NotFoundException('Transaction not found');
    }
  }

  async update(id: string, transaction: UpdateTransactionDto): Promise<Transactions> {
    await this.transactions.update(id, transaction);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.transactions.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
