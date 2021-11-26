import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JournalLine } from 'src/transactions/entities/journal_line.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

const START = 'META:Starting-Balance';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repo: EntityRepository<Account>,
    private readonly transactions: TransactionsService,
  ) {}

  async create(account: CreateAccountDto): Promise<Account> {
    // let startingAccount: Account;
    try {
      // startingAccount = await this.findByName(START);
    } catch (NotFoundException) {
      throw new InternalServerErrorException(
        `${START} account was not found. Looks like something went wrong during initial db migration`,
      );
    }
    const newAccount = new Account(account.name);
    const initTransaction = new Transaction(
      new Date('1970-01-01'),
      `Starting balance for ${account.name}`,
    );
    const initLines = [
      new JournalLine(account.startingBalance),
      new JournalLine(-account.startingBalance),
    ];
    try {
      this.repo.persist(newAccount);
      for (const line of initLines) {
        initTransaction.journal_lines.add(line);
        newAccount.journal_lines.add(line);
      }
      this.repo.flush();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return newAccount;
  }

  async findAll(): Promise<Account[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<Account> {
    try {
      const account = await this.repo.findOneOrFail({ id: id });
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

  async findByName(name: string): Promise<Account> {
    try {
      const account = await this.repo.findOneOrFail({
        name: name,
      });
      return account;
    } catch (err) {
      throw new NotFoundException('Account with that name was not found');
    }
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = this.findOne(id);
    (await account).name = updateAccountDto.name;
    this.repo.flush();
    return this.findOne(id);
  }

  // async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
  //   try {
  //     await this.repo.delete(id);
  //     return { deleted: true };
  //   } catch (err) {
  //     return { deleted: false, message: err.message };
  //   }
  // }
}
