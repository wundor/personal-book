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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalLines = void 0;
const class_validator_1 = require("class-validator");
const accounts_entity_1 = require("../../accounts/entities/accounts.entity");
const typeorm_1 = require("typeorm");
const transactions_entity_1 = require("./transactions.entity");
let JournalLines = class JournalLines {
    constructor() {
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JournalLines.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, typeorm_1.ManyToOne)(() => transactions_entity_1.Transactions, transaction => transaction.id),
    (0, typeorm_1.JoinColumn)({ name: "transaction_id" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], JournalLines.prototype, "transaction_id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, typeorm_1.ManyToOne)(() => accounts_entity_1.Accounts, account => account.id),
    (0, typeorm_1.JoinColumn)({ name: "account_id" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], JournalLines.prototype, "account_id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, typeorm_1.Column)("decimal", { precision: 17, scale: 8 }),
    __metadata("design:type", Number)
], JournalLines.prototype, "amount", void 0);
JournalLines = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], JournalLines);
exports.JournalLines = JournalLines;
//# sourceMappingURL=journal_lines.entity.js.map