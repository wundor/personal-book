import { Migration } from '@mikro-orm/migrations';

export class InitMetaAccounts20211127082031 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "INSERT INTO account SET name = 'ASSETS', full_name = 'ASSETS', created_at = '1970-01-01 03:00:00', updated_at = '1970-01-01 03:00:00';",
    );
    this.addSql(
      "INSERT INTO account SET name = 'EXPENSES', full_name = 'EXPENSES', created_at = '1970-01-01 03:00:00', updated_at = '1970-01-01 03:00:00';",
    );
    this.addSql(
      "INSERT INTO account SET name = 'LIABILITIES', full_name = 'LIABILITIES', created_at = '1970-01-01 03:00:00', updated_at = '1970-01-01 03:00:00';",
    );
    this.addSql(
      "INSERT INTO account SET name = 'INCOME', full_name = 'INCOME', created_at = '1970-01-01 03:00:00', updated_at = '1970-01-01 03:00:00';",
    );
    this.addSql(
      "INSERT INTO account SET name = 'EQUITY', full_name = 'EQUITY', created_at = '1970-01-01 03:00:00', updated_at = '1970-01-01 03:00:00';",
    );
    this.addSql(
      "INSERT INTO account SET name = 'Starting-Balance', full_name = 'EQUITY:Starting-Balance', created_at = '1970-01-01 03:00:00', updated_at = '1970-01-01 03:00:00';",
    );
  }
}
