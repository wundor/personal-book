import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { MikroORM } from '@mikro-orm/core';
import { Account } from './accounts/entities/account.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { JournalLine } from './transactions/entities/journal_line.entity';

async function bootstrap() {
  const orm = await MikroORM.init({
    entities: [Account, Transaction, JournalLine],
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    user: 'personal_book',
    password: '3BYu5gQBybJ3PSh',
    dbName: 'personal_book',
    migrations: {
      tableName: 'mikro_orm_migrations',
      path: './dist/src/migrations',
      pattern: /^[\w-]+\d+\.js$/,
      transactional: true,
      allOrNothing: true,
      safe: true,
    },
    debug: true,
  });

  // TODO: wrap it in 'develop' flag or something, this needs to not execute on production!
  // const generator = orm.getSchemaGenerator();
  // await generator.dropDatabase('personal_book');
  // await generator.createDatabase('personal_book');
  // await generator.dropSchema();
  // await generator.createSchema();

  const migrator = orm.getMigrator();
  await migrator.up();
  await orm.close(true);

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0', () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
