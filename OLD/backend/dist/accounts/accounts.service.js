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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transactions_service_1 = require("../transactions/transactions.service");
const typeorm_2 = require("typeorm");
const accounts_entity_1 = require("./entities/accounts.entity");
const START = 'META:Starting-Balance';
let AccountsService = class AccountsService {
    constructor(repo, transactions) {
        this.repo = repo;
        this.transactions = transactions;
    }
    async create(account) {
        var startingAccount;
        try {
            startingAccount = await this.findByName(START);
        }
        catch (NotFoundException) {
            throw new common_1.InternalServerErrorException(`${START} account was not found. Looks like something went wrong during initial db migration`);
        }
        const newAccount = this.repo.create(account);
        const writtenAccount = await this.repo.save(newAccount);
        this.transactions.create({
            info: `Starting balance for ${account.name}`,
            lines: [
                {
                    account: writtenAccount.id,
                    amount: account.startingBalance
                },
                {
                    account: startingAccount.id,
                    amount: -account.startingBalance,
                }
            ]
        });
        return newAccount;
    }
    async findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        try {
            const account = await this.repo.findOneOrFail(id);
            return account;
        }
        catch (err) {
            throw new common_1.NotFoundException('Account not found');
        }
    }
    async findByName(name) {
        try {
            const account = await this.repo.findOneOrFail({
                name: name,
            });
            return account;
        }
        catch (err) {
            throw new common_1.NotFoundException('Account with that name was not found');
        }
    }
    async update(id, updateAccountDto) {
        await this.repo.update(id, updateAccountDto);
        return this.findOne(id);
    }
    async remove(id) {
        try {
            await this.repo.delete(id);
            return { deleted: true };
        }
        catch (err) {
            return { deleted: false, message: err.message };
        }
    }
};
AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accounts_entity_1.Accounts)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        transactions_service_1.TransactionsService])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map