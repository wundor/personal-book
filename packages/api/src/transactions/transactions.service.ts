import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JournalLine } from './entities/journal_line.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repo: EntityRepository<Transaction>,
    private readonly account: AccountsService,
  ) {}

  async create(transaction: CreateTransactionDto): Promise<Transaction> {
    const initTransaction = new Transaction(
      new Date(transaction.date),
      transaction.info,
    );
    let transactionBalance = 0;
    transaction.lines.forEach(async (line) => {
      transactionBalance += line.amount;
      const account = await this.account.findByName(line.account);
      initTransaction.journal_lines.add(new JournalLine(account, line.amount));
    });
    Logger.debug(`Lines: ${JSON.stringify(transaction.lines)}`);
    if (transactionBalance !== 0) {
      const message = `Transaction '${transaction.info}' is not balanced! ${transactionBalance} != 0`;
      Logger.error(message);
      throw new BadRequestException(message);
    }
    this.repo.persist(initTransaction);
    await this.repo.flush();
    console.log(initTransaction);
    return initTransaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.repo.findAll();
  }

  // async findOne(id: string): Promise<Transaction> {
  //   try {
  //     const account = await this.transactions.findOneOrFail(id);
  //     return account;
  //   } catch (err) {
  //     throw new NotFoundException('Transaction not found');
  //   }
  // }

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
