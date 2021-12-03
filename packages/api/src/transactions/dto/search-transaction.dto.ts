import { IsNotEmpty, IsString } from 'class-validator';
import { IQuery } from 'src/interfaces/requests.interface';

export class SearchTransactionDto implements IQuery {
  @IsNotEmpty()
  @IsString()
  period: string;
}
