import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
export class JournalLineDto {
  account: number;
  amount: number;
}

export class CreateTransactionDto {
  info: string;

  @IsArray()
  @ArrayMinSize(2)
  @Type(() => JournalLineDto)
  @ValidateNested({ each: true })
  lines: JournalLineDto[]
}
