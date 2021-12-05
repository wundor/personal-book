import { IsNotEmpty, IsString } from 'class-validator';
import { IAccountCreate } from 'src/interfaces/accounts.interface';

export class CreateAccountDto implements IAccountCreate {
  @IsNotEmpty()
  @IsString()
  fullName!: string;
}
