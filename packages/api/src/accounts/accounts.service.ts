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
import { TYPES } from 'src/interfaces/accounts.interface';
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

  async generateTree(type?: TYPES): Promise<Account[]> {
    const rawList = await this.repo.find(
      {
        $or: [
          { fullName: { $like: `${TYPES.ASSETS}%` } },
          { fullName: { $like: `${TYPES.EXPENSES}%` } },
          { fullName: { $like: `${TYPES.INCOME}%` } },
          { fullName: { $like: `${TYPES.LIABILITIES}%` } },
        ],
      },
      {
        orderBy: { full_name: 'asc' },
      },
    );
    const tree = this.listToTree(rawList);
    return tree;
  }

  listToTree(list: Account[]) {
    const result = [];

    list.forEach(function (acc) {
      const path = acc.fullName.split(':');
      buildFromSegments(result, path, acc);
    });

    return result;

    function buildFromSegments(scope: Account[], path: string[], acc: Account) {
      const current = path.shift();

      const found = findInScope(scope, current);

      if (!found) {
        scope.push(acc);
      }

      if (path.length) {
        found.children = found.children || [];
        buildFromSegments(found.children, path, acc);
      }
    }
    function findInScope(scope: Account[], find: string): Account {
      for (let i = 0; i < scope.length; i++) {
        if (scope[i].name === find) {
          return scope[i];
        }
      }
    }
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
      return this.computeBalance(account);
    } catch (err) {
      throw new NotFoundException('Account not found');
    }
  }

  computeBalance(account: Account): Account {
    let balance = 0;
    for (const line of account.lines) {
      balance += Number(line.amount);
    }
    account.balance = balance;
    return account;
  }
}
