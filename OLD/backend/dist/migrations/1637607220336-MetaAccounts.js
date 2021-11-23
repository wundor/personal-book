"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaAccounts1637607220336 = void 0;
class MetaAccounts1637607220336 {
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO accounts SET name = 'META:Starting-Balance'`);
    }
    async down(queryRunner) {
    }
}
exports.MetaAccounts1637607220336 = MetaAccounts1637607220336;
//# sourceMappingURL=1637607220336-MetaAccounts.js.map