export declare class JournalLineDto {
    account: number;
    amount: number;
}
export declare class CreateTransactionDto {
    info: string;
    lines: JournalLineDto[];
}
