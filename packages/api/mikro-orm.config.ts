import { Options } from '@mikro-orm/core';

const config: Options = {
  type: 'postgresql',
  host: 'localhost',
  port: 5433,
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
