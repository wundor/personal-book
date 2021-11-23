"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const journal_lines_entity_1 = require("./entities/journal_lines.entity");
const transactions_entity_1 = require("./entities/transactions.entity");
let TransactionsService = class TransactionsService {
    constructor(transactions, journalLines) {
        this.transactions = transactions;
        this.journalLines = journalLines;
    }
    async create(transaction) {
        const newTransaction = this.transactions.create(transaction);
        const writtenTransaction = await this.transactions.save(newTransaction);
        transaction.lines.forEach((line) => {
            this.journalLines.save({
                account_id: line.account,
                amount: line.amount,
                transaction_id: writtenTransaction.id,
            });
        });
        return newTransaction;
    }
    async findAll() {
        return this.transactions.find();
    }
    async findOne(id) {
        try {
            const account = await this.transactions.findOneOrFail(id);
            return account;
        }
        catch (err) {
            throw new common_1.NotFoundException('Transaction not found');
        }
    }
    async update(id, transaction) {
        await this.transactions.update(id, transaction);
        return this.findOne(id);
    }
    async remove(id) {
        try {
            await this.transactions.delete(id);
            return { deleted: true };
        }
        catch (err) {
            return { deleted: false, message: err.message };
        }
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transactions_entity_1.Transactions)),
    __param(1, (0, typeorm_1.InjectRepository)(journal_lines_entity_1.JournalLines)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map