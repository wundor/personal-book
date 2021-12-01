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
import {
  IJournalLine,
  ITransaction,
} from 'src/interfaces/transactions.interface';

export class JournalLineDto implements IJournalLine {
  @IsNotEmpty()
  @IsString()
  account!: string;

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
}
