import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Accounts } from './entities/accounts.entity';

const START = 'META:Starting-Balance';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly repo: Repository<Accounts>,
    private readonly transactions: TransactionsService
  ) {}

  async create(account: CreateAccountDto): Promise<Accounts> {
    let startingAccount: Accounts;
    try {
      startingAccount = await this.findByName(START);
    } catch (NotFoundException) {
      throw new InternalServerErrorException(
        `${START} account was not found. Looks like something went wrong during initial db migration`
      );
    }
    const newAccount = this.repo.create(account);
    const writtenAccount = await this.repo.save(newAccount);
    this.transactions.create({
      info: `Starting balance for ${account.name}`,
      lines: [
        {
          account: writtenAccount.id,
          amount: account.startingBalance
        },
        {
          account: startingAccount.id,
          amount: -account.startingBalance
        }
      ]
    });
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

  // async findLatestBalance(id: string): Promise<number> {
  //   try {
  //     const account = await this.repo.findOneOrFail(id);
  //     return account;
  //   } catch (err) {
  //     throw new NotFoundException('Account not found');
  //   }
  // }

  async findByName(name: string): Promise<Accounts> {
    try {
      const account = await this.repo.findOneOrFail({
        name: name
      });
      return account;
    } catch (err) {
      throw new NotFoundException('Account with that name was not found');
    }
  }

  // async update(
  //   id: string,
  //   updateAccountDto: UpdateAccountDto
  // ): Promise<Accounts> {
  //   await this.repo.update(id, updateAccountDto);
  //   return this.findOne(id);
  // }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.repo.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
