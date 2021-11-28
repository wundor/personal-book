import { IsNotEmpty, IsString } from 'class-validator';
import { IAccount } from '@pb/lib/src';

export class CreateAccountDto implements IAccount {
  @IsNotEmpty()
  @IsString()
  fullName!: string;
}
