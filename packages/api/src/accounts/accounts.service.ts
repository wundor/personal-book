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
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly repo: EntityRepository<Account>,
  ) {}

  async create(account: CreateAccountDto): Promise<Account> {
    try {
      await this.repo.persistAndFlush(new Account(account.fullName));
      const newAccount = await this.findByName(account.fullName);
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
    return this.findAndComputeBalance({ id: id });
  }
  async findByName(name: string): Promise<Account> {
    return this.findAndComputeBalance({ fullName: name });
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.findOne(id);
    account.fullName = updateAccountDto.fullName;
    account.name = updateAccountDto.fullName;
    this.repo.flush();
    return this.findOne(id);
  }

  async findAndComputeBalance(
    search: Record<string, unknown>,
  ): Promise<Account> {
    try {
      let balance = 0;
      const account = await this.repo.findOneOrFail(search, [
        'lines',
        'lines.transaction',
      ]);
      for (const line of account.lines) {
        balance += Number(line.amount);
      }
      account.balance = balance;
      return account;
    } catch (err) {
      throw new NotFoundException('Account not found');
    }
  }
}
