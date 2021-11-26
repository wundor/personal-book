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
    debug: true,
  });
  const generator = orm.getSchemaGenerator();
  await generator.dropSchema();
  await generator.createSchema();
  const migrator = orm.getMigrator();
  await migrator.createMigration();
  await migrator.up();
  await orm.close(true);

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
