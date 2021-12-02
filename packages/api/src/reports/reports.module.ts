import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Account } from 'src/accounts/entities/account.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Account]), AccountsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
