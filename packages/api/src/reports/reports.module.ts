import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { NetWorthHistory } from './entities/net-worth.entity';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Account } from 'src/accounts/entities/account.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([NetWorthHistory, Account]),
    AccountsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
