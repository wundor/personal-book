import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repo: Repository<Account>
  ) {}

  async create(account: CreateAccountDto): Promise<Account> {
    const newAccount = this.repo.create(account);
    await this.repo.save(newAccount);
    return newAccount;
  }

  async findAll(): Promise<Account[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Account> {
    try {
      const account = await this.repo.findOneOrFail(id);
      return account;
    } catch (err) {
      throw new NotFoundException('Account not found');
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
    await this.repo.update(id, updateAccountDto);
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
