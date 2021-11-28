import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [MikroOrmModule.forFeature([Account]), TransactionsModule],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
