import {MigrationInterface, QueryRunner} from "typeorm";

export class MetaAccounts1637607220336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO accounts SET name = 'META:Starting-Balance'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
