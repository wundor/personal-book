import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
// import { TransactionsModule } from '../../transactions/transactions.module';
import { Account } from './entities/account.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  // imports: [MikroOrmModule.forFeature([Account]), TransactionsModule],
  imports: [MikroOrmModule.forFeature([Account])],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
