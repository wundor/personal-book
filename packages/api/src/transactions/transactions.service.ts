import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { PERIOD_MONTH, PERIOD_ALL } from 'src/interfaces/requests.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SearchTransactionDto } from './dto/search-transaction.dto';
import { JournalLine } from './entities/journal_line.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repo: EntityRepository<Transaction>,
    @InjectRepository(JournalLine)
    private readonly lineRepo: EntityRepository<JournalLine>,
    private readonly account: AccountsService,
  ) {}

  async create(transaction: CreateTransactionDto): Promise<Transaction> {
    try {
      const initTransaction = new Transaction(
        new Date(transaction.date),
        transaction.info,
      );
      let transactionBalance = 0;
      // forEach() will swallow exception
      for (let i = 0; i < transaction.lines.length; i++) {
        transactionBalance += transaction.lines[i].amount;
        const account = await this.account.findByName(
          transaction.lines[i].accountName,
        );
        const initLine = new JournalLine(account, transaction.lines[i].amount);
        this.lineRepo.persist(initLine);
        initTransaction.lines.add(initLine);
      }
      Logger.debug(`Lines: ${JSON.stringify(transaction.lines)}`);
      if (transactionBalance !== 0) {
        const message = `Transaction '${transaction.info}' is not balanced! ${transactionBalance} != 0`;
        Logger.error(message);
        throw new BadRequestException(message);
      }
      this.repo.persist(initTransaction);
      await this.repo.flush();
      await this.lineRepo.flush();
      return initTransaction;
    } catch (e) {
      Logger.log(e);
      throw new InternalServerErrorException(
        'Unable to create transaction. Please check application logs',
      );
    }
  }

  async findAll(query: SearchTransactionDto): Promise<Transaction[]> {
    if (query.period === PERIOD_ALL) {
      return await this.repo.findAll(['lines', 'lines.account']);
    } else if (query.period === PERIOD_MONTH) {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return await this.repo.find(
        {
          date: {
            $gte: firstDay,
            $lte: lastDay,
          },
        },
        ['lines', 'lines.account'],
      );
    }
  }

  async findOne(id: number): Promise<Transaction> {
    try {
      const transaction = await this.repo.findOneOrFail(id, ['lines']);
      return transaction;
    } catch (err) {
      throw new NotFoundException('Transaction not found');
    }
  }

  // // async update(id: string, transaction: UpdateTransactionDto): Promise<Transactions> {
  // //   await this.transactions.update(id, transaction);
  // //   return this.findOne(id);
  // // }

  // async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
  //   try {
  //     await this.transactions.delete(id);
  //     return { deleted: true };
  //   } catch (err) {
  //     return { deleted: false, message: err.message };
  //   }
  // }
}
