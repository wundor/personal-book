import { IsNotEmpty } from 'class-validator';

export class SearchAccountDto {
  @IsNotEmpty()
  name: string;
}
