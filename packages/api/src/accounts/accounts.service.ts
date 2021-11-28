import {
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { META } from '@pb/lib/src';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repo: EntityRepository<Account>,
    private readonly transactions: TransactionsService,
  ) {}

  async create(account: CreateAccountDto): Promise<Account> {
    let startingAccount: Account;
    try {
      startingAccount = await this.findByName(META.START);
    } catch (NotFoundException) {
      throw new InternalServerErrorException(
        `${META.START} account was not found. Looks like something went wrong during initial db migration`,
      );
    }

    try {
      this.repo.persist(new Account(account.fullName));
      await this.repo.flush();
      const newAccount = await this.findByName(account.fullName);
      // if (account.startingBalance) {
      // TODO: possible solution - create tmp account_inbox entity with account id and pending starting balance, emit an event and transaction module will listen to it, add the transaction and remove tmp entity
      // console.log(account.startingBalance);
      // await this.transactions.create({
      //   date: new Date('1970-01-01'),
      //   info: `Starting balance for account ${account.name}`,
      //   lines: [
      //     {
      //       account: newAccount,
      //       amount: account.startingBalance,
      //     },
      //     {
      //       account: startingAccount,
      //       amount: -account.startingBalance,
      //     },
      //   ],
      // });
      // }
      return newAccount;
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new BadRequestException(
          `Account with name ${account.fullName} already exists`,
        );
      } else {
        throw new InternalServerErrorException(
          `Something went wrong during account creation: ${e.message}. Check application log for more info`,
        );
      }
    }
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
        fullName: name,
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
