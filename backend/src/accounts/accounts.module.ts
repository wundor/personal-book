import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './entities/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
