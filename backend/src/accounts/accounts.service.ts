import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Accounts } from './entities/accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly repo: Repository<Accounts>
  ) {}

  async create(account: CreateAccountDto): Promise<Accounts> {
    const newAccount = this.repo.create(account);
    await this.repo.save(newAccount);
    return newAccount;
  }

  async findAll(): Promise<Accounts[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Accounts> {
    try {
      const account = await this.repo.findOneOrFail(id);
      return account;
    } catch (err) {
      throw new NotFoundException('Account not found');
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Accounts> {
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
