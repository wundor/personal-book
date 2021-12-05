import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';
import { IAccountUpdate } from 'src/interfaces/accounts.interface';
import {
  IJournalLineUpdate,
  ITransactionUpdate,
} from 'src/interfaces/transactions.interface';

export class UpdateJournalLineDto implements IJournalLineUpdate {
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @Type(() => Account)
  account!: IAccountUpdate;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 8,
  })
  amount!: number;
}

export class UpdateTransactionDto implements ITransactionUpdate {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsNumber()
  id!: number;

  @IsString()
  info!: string;

  @IsArray()
  @ArrayMinSize(2)
  @Type(() => UpdateJournalLineDto)
  @ValidateNested({ each: true })
  lines!: UpdateJournalLineDto[];
}
