import { EntityRepository } from '.pnpm/@mikro-orm+knex@4.5.9_220abf59d18ce1fff103fb2a30c3f30b/node_modules/@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/entities/account.entity';
import { INetWorth } from 'src/interfaces/reports.interface';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepo: EntityRepository<Account>,
    private readonly account: AccountsService,
  ) {}

  async getNetWorth(): Promise<INetWorth> {
    // get all assets balance
    // get all liabilities balance
    // return sum
    let allAssets = 0;
    let allLiabilities = 0;
    const assets = await this.accountsRepo.find({
      fullName: { $like: 'ASSETS:%' },
    });
    for (const account of assets) {
      const rawAccount = await this.account.findOne(account.id);
      allAssets += rawAccount.balance;
    }
    const liabilities = await this.accountsRepo.find({
      fullName: { $like: 'LIABILITIES:%' },
    });
    for (const account of liabilities) {
      const rawAccount = await this.account.findOne(account.id);
      allLiabilities += rawAccount.balance;
    }
    return {
      total: allAssets + allLiabilities,
      assets: allAssets,
      liabilities: allLiabilities,
    };
  }

  createNetWorth() {
    // get all assets balance
    // get all liabilities balance
    // return sum
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }
}
