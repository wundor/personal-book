import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repo: Repository<Transaction>
  ) {}

  async create(transaction: CreateTransactionDto): Promise<Transaction> {
    const newTransaction = this.repo.create(transaction);
    await this.repo.save(newTransaction);
    return newTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Transaction> {
    try {
      const account = await this.repo.findOneOrFail(id);
      return account;
    } catch (err) {
      throw new NotFoundException('Transaction not found');
    }
  }

  async update(id: string, transaction: UpdateTransactionDto): Promise<Transaction> {
    await this.repo.update(id, transaction);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.repo.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
