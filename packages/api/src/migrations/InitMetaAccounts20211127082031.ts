import { Migration } from '@mikro-orm/migrations';

export class InitMetaAccounts20211127082031 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `INSERT INTO account (name, full_name, created_at, updated_at) 
      VALUES 
      ('ASSETS', 'ASSETS', '1970-01-01 03:00:00', '1970-01-01 03:00:00'),
      ('LIABILITIES', 'LIABILITIES', '1970-01-01 03:00:00', '1970-01-01 03:00:00'),
      ('INCOME', 'INCOME', '1970-01-01 03:00:00', '1970-01-01 03:00:00'),
      ('EQUITY', 'EQUITY', '1970-01-01 03:00:00', '1970-01-01 03:00:00'),
      ('Starting-Balance', 'EQUITY:Starting-Balance', '1970-01-01 03:00:00', '1970-01-01 03:00:00'),
      ('EXPENSES', 'EXPENSES', '1970-01-01 03:00:00', '1970-01-01 03:00:00')`,
    );
  }
}
