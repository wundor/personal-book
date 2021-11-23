import { TransactionsService } from 'src/transactions/transactions.service';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Accounts } from './entities/accounts.entity';
export declare class AccountsService {
    private readonly repo;
    private readonly transactions;
    constructor(repo: Repository<Accounts>, transactions: TransactionsService);
    create(account: CreateAccountDto): Promise<Accounts>;
    findAll(): Promise<Accounts[]>;
    findOne(id: string): Promise<Accounts>;
    findByName(name: string): Promise<Accounts>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<Accounts>;
    remove(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
}
