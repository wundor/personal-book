import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { IAccountUpdate } from 'src/interfaces/accounts.interface';

export class UpdateAccountDto implements IAccountUpdate {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsNotEmpty()
  @IsString()
  fullName!: string;
}
