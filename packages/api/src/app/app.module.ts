import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TransactionsModule } from '../transactions/transactions.module';
import { AccountsModule } from '../accounts/accounts.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from 'src/reports/reports.module';
import { BudgetsModule } from 'src/budgets/budgets.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({}),
    AccountsModule,
    TransactionsModule,
    ReportsModule,
    BudgetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
