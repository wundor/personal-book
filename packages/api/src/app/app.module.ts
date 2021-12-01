import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TransactionsModule } from '../transactions/transactions.module';
import { AccountsModule } from '../accounts/accounts.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({}),
    AccountsModule,
    TransactionsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
