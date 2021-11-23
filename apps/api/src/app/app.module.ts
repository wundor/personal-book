import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionsModule } from '../transactions/transactions.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      logging: 'all',
      username: 'personal_book',
      password: '3BYu5gQBybJ3PSh',
      database: 'personal_book',
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsRun: true,
      migrations: ['dist/apps/api/migrations/*{.js}'],
      migrationsTableName: 'migrations_typeorm',
      synchronize: true, // TODO: remove for prod
      dropSchema: true // TODO: remove for prod
    }),
    AccountsModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
