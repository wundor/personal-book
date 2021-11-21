import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transactions } from './entities/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly repo: Repository<Transactions>
  ) {}

  async create(transaction: CreateTransactionDto): Promise<Transactions> {
    // TODO: this needs to be a db transaction in 2 separate tables
    const newTransaction = this.repo.create(transaction);
    await this.repo.save(newTransaction);
    return newTransaction;
  }

  async findAll(): Promise<Transactions[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Transactions> {
    try {
      const account = await this.repo.findOneOrFail(id);
      return account;
    } catch (err) {
      throw new NotFoundException('Transaction not found');
    }
  }

  async update(id: string, transaction: UpdateTransactionDto): Promise<Transactions> {
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
