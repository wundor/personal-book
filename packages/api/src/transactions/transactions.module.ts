import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { JournalLine } from './entities/journal_line.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Transaction, JournalLine]),
    AccountsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
