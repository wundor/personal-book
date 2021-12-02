import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';
import { IAccount } from 'src/interfaces/accounts.interface';
import {
  IJournalLine,
  ITransaction,
} from 'src/interfaces/transactions.interface';

export class JournalLineDto implements IJournalLine {
  @IsNotEmpty()
  @ValidateIf((o) => o.accountName == null)
  @Type(() => Account)
  account: IAccount;

  @IsOptional()
  @IsString()
  accountName: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 8,
  })
  amount!: number;
}

export class CreateTransactionDto implements ITransaction {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date!: Date;

  info!: string;

  @IsArray()
  @ArrayMinSize(2)
  @Type(() => JournalLineDto)
  @ValidateNested({ each: true })
  lines!: JournalLineDto[];

  // only to implement interface
  id: number;
}
