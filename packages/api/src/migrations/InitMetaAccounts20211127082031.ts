import { Migration } from '@mikro-orm/migrations';

export class InitMetaAccounts20211127082031 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "INSERT INTO account SET name = 'Starting-Balance', full_name = 'META:Starting-Balance', created_at = '1970-01-01 03:00:00', updated_at = '1970-01-01 03:00:00';",
    );
  }
}
