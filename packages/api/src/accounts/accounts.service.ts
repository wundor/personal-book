import {
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TYPES } from '../interfaces/accounts.interface';
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
      // TODO: check if parent account is here
      await this.repo.persistAndFlush(new Account(account.fullName));
      const newAccount = await this.findByName(account.fullName);
      return newAccount;
    } catch (err) {
      Logger.error(err);
      if (err instanceof UniqueConstraintViolationException) {
        throw new BadRequestException(
          `Account with name ${account.fullName} already exists`,
        );
      } else {
        throw new InternalServerErrorException(
          `Something went wrong during account creation: ${err.message}. Check application log for more info`,
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

  async generateAccountTree(types: TYPES[]): Promise<Account[]> {
    const typesFilter = [];
    types.forEach((type) => {
      typesFilter.push({ fullName: { $like: `${type}%` } });
    });
    const accountList = await this.repo.find(
      {
        $or: typesFilter,
      },
      ['lines', 'lines.transaction'], // populate collections
      { full_name: 'asc' }, // order by
    );

    const accountMap = Object.create(null);

    accountList.forEach((item) => {
      item.computeBalance();
      accountMap[item.fullName] = item;
    });

    const accountTree = [];

    accountList.forEach((item) => {
      const namePath = item.fullName.split(':');
      namePath.pop();
      if (namePath.length) {
        const parentName = namePath.join(':');
        accountMap[parentName].children = accountMap[parentName].children || [];
        accountMap[parentName].children.push(accountMap[item.fullName]);
      } else {
        accountTree.push(accountMap[item.fullName]);
      }
    });
    return accountTree;
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
      const account = await this.repo.findOneOrFail(search, [
        'lines',
        'lines.transaction',
      ]);
      return account.computeBalance();
    } catch (err) {
      Logger.error(err);
      throw new NotFoundException('Account not found');
    }
  }
}
