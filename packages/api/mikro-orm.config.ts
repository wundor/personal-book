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
};

export default config;
