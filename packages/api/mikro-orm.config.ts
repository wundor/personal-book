import { Options } from '@mikro-orm/core';

const config: Options = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  user: 'personal_book',
  password: '3BYu5gQBybJ3PSh',
  dbName: 'personal_book',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './dist/src/migrations',
    pattern: /^[\w-]+\d+\.js$/,
    transactional: true,
    allOrNothing: true,
    safe: true,
  },
};

export default config;
