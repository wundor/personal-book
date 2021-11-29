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
