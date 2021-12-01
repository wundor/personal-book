import { IsNotEmpty, IsString } from 'class-validator';
import { IAccount } from 'src/interfaces/accounts.interface';

export class CreateAccountDto implements IAccount {
  @IsNotEmpty()
  @IsString()
  fullName!: string;
}
