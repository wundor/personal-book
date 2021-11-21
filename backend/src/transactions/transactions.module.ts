import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transactions.entity';
import { JournalLines } from './entities/journal_lines.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, JournalLines])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
