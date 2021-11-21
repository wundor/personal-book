import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
class JournalLine {
  account_id: number;
  debit: number;
  credit: number;
}

export class CreateTransactionDto {
  info: string;

  @IsArray()
  @ArrayMinSize(2)
  @Type(() => JournalLine)
  @ValidateNested({ each: true })
  lines: JournalLine[]
}
