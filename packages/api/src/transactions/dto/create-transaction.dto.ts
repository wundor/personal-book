import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';
import { IAccountUpdate } from 'src/interfaces/accounts.interface';
import {
  IJournalLineCreate,
  ITransactionCreate,
} from 'src/interfaces/transactions.interface';

export class CreateJournalLineDto implements IJournalLineCreate {
  @IsNotEmpty()
  @Type(() => Account)
  account!: IAccountUpdate;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 8,
  })
  amount!: number;
}

export class CreateTransactionDto implements ITransactionCreate {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date!: Date;

  info!: string;

  @IsArray()
  @ArrayMinSize(2)
  @Type(() => CreateJournalLineDto)
  @ValidateNested({ each: true })
  lines!: CreateJournalLineDto[];
}
