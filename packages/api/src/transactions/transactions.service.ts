import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { PERIOD_MONTH, PERIOD_ALL } from '../interfaces/requests.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SearchTransactionDto } from './dto/search-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
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
      // forEach() will swallow exception
      for (let i = 0; i < transaction.lines.length; i++) {
        const account = await this.account.findByName(
          transaction.lines[i].account.fullName,
        );
        const initLine = new JournalLine(account, transaction.lines[i].amount);
        this.lineRepo.persist(initLine);
        initTransaction.lines.add(initLine);
      }
      if (await this.isTransactionBalanced(initTransaction)) {
        this.repo.persist(initTransaction);
        await this.repo.flush();
        await this.lineRepo.flush();
        return initTransaction;
      } else {
        throw new BadRequestException('Transaction is not balanced!');
      }
    } catch (e) {
      Logger.log(e);
      throw new InternalServerErrorException(
        `Unable to create transaction: ${e.message} `,
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
      const transaction = await this.repo.findOneOrFail(id, [
        'lines',
        'lines.account',
      ]);
      return transaction;
    } catch (err) {
      throw new NotFoundException('Transaction not found');
    }
  }

  async update(id: number, newT: UpdateTransactionDto): Promise<Transaction> {
    try {
      const existingT = await this.findOne(id);
      existingT.info = newT.info;
      existingT.date = new Date(newT.date);
      for (let i = 0; i < existingT.lines.length; i++) {
        const account = await this.account.findByName(
          existingT.lines[i].account.fullName,
        );
        account.lines.remove(existingT.lines[i]);
      }
      existingT.lines.removeAll();
      for (let i = 0; i < newT.lines.length; i++) {
        const account = await this.account.findByName(
          newT.lines[i].account.fullName,
        );
        const initLine = new JournalLine(account, newT.lines[i].amount);
        this.lineRepo.persist(initLine);
        existingT.lines.add(initLine);
      }
      if (await this.isTransactionBalanced(existingT)) {
        await this.repo.flush();
        await this.lineRepo.flush();
        return this.findOne(id);
      } else {
        throw new BadRequestException('Transaction is not balanced!');
      }
    } catch (e) {
      Logger.log(e);
      throw new InternalServerErrorException(
        `Unable to update transaction: ${e.message}`,
      );
    }
  }

  async isTransactionBalanced(t: Transaction): Promise<boolean> {
    let transactionBalance = 0;
    for (let i = 0; i < t.lines.length; i++) {
      transactionBalance += t.lines[i].amount;
    }
    Logger.debug(`Lines: ${JSON.stringify(t.lines)}`);
    if (transactionBalance !== 0) {
      const message = `Transaction '${t.info}' is not balanced! ${transactionBalance} != 0`;
      Logger.error(message);
      return false;
    }
    return true;
  }
}
