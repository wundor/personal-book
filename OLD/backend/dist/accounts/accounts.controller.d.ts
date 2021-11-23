import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { SearchAccountDto } from './dto/search-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(createAccountDto: CreateAccountDto): Promise<import("./entities/accounts.entity").Accounts>;
    findAll(): Promise<import("./entities/accounts.entity").Accounts[]>;
    findOneByName(query: SearchAccountDto): Promise<import("./entities/accounts.entity").Accounts>;
    findOneById(id: string): Promise<import("./entities/accounts.entity").Accounts>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<import("./entities/accounts.entity").Accounts>;
    remove(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
}
