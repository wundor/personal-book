import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JournalLines } from './entities/journal_lines.entity';
import { Transactions } from './entities/transactions.entity';
export declare class TransactionsService {
    private readonly transactions;
    private readonly journalLines;
    constructor(transactions: Repository<Transactions>, journalLines: Repository<JournalLines>);
    create(transaction: CreateTransactionDto): Promise<Transactions>;
    findAll(): Promise<Transactions[]>;
    findOne(id: string): Promise<Transactions>;
    update(id: string, transaction: UpdateTransactionDto): Promise<Transactions>;
    remove(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
}
