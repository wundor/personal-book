import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { MikroORM, TableExistsException } from '@mikro-orm/core';
import { Account } from './accounts/entities/account.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { JournalLine } from './transactions/entities/journal_line.entity';
import { exit } from 'process';

async function bootstrap() {
  const orm = await MikroORM.init({
    entities: [Account, Transaction, JournalLine],
    type: 'postgresql',
    host: 'localhost',
    port: 5433,
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

  try {
    // TODO: wrap it in 'develop' flag or something, this needs to not execute on production!
    const generator = orm.getSchemaGenerator();
    // await generator.dropDatabase('personal_book');
    // await generator.createDatabase('personal_book');
    // await generator.dropSchema();
    await generator.createSchema();
  } catch (e) {
    if (e instanceof TableExistsException) {
      Logger.log(`Entities schema initialized, moving on`);
    } else {
      Logger.error(e);
      exit(1);
    }
  }
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
