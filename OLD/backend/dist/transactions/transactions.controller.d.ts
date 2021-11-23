import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly service;
    constructor(service: TransactionsService);
    create(transaction: CreateTransactionDto): Promise<import("./entities/transactions.entity").Transactions>;
    findAll(): Promise<import("./entities/transactions.entity").Transactions[]>;
    findOne(id: string): Promise<import("./entities/transactions.entity").Transactions>;
    update(id: string, transaction: UpdateTransactionDto): Promise<import("./entities/transactions.entity").Transactions>;
    remove(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
}
